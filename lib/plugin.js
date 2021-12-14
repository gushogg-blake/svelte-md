import sveltePlugin from 'rollup-plugin-svelte'
import { marked } from 'marked'
import { dirname, join } from 'path'
import grayMatter from 'gray-matter'

export function svelteMarkdown(params) {
	const prerenderClient = params.prerenderType === 'client'
	const prerenderServer = params.prerenderType === 'server'
	const style = prerenderServer ? 'ssr' : 'dom'

	const plugin = sveltePlugin({
		...params.sveltePluginOptions,
		emitCss: !(prerenderClient || prerenderServer),
		compilerOptions: { generate: style, hydratable: prerenderClient },
	})

	const writeTemplate = params.writeTemplate

	let firstMeta

	async function transform(code, id) {
		if (id.endsWith('.md')) {
			const { data, content } = grayMatter(code)
			const html = marked.parse(content)

			if (!firstMeta) firstMeta = { id, data }

			return plugin.transform(html, `${dirname(id)}.svelte`)
		} else if (id.endsWith('.svelte')) {
			if (!firstMeta) firstMeta = { id, data: {} }

			return plugin.transform(code, id)
		}
	}

	return {
		...plugin,
		transform,
		async writeBundle({ file }) {
			if (!firstMeta || !writeTemplate) return

			const { id, data } = firstMeta

			if (prerenderServer) {
				if (!file.startsWith('/')) file = join(process.cwd(), file)
				const App = require(file)

				try {
					const { head, html, css } = App.render()

					await writeTemplate({ id, data, head, html, css })
				} catch (e) {
					console.log(e)
				}
			} else {
				await writeTemplate({ id, data, head: '', html: '' })
			}
		},
	}
}
