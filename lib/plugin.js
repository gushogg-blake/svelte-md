import sveltePlugin from 'rollup-plugin-svelte'
import { marked } from 'marked'
import { dirname } from 'path'
import grayMatter from 'gray-matter'

export function svelteMarkdown(params) {
	const plugin = sveltePlugin({ ...params.sveltePluginOptions })

	async function transform(code, id) {
		if (id.endsWith('.md')) {
			const { data, content } = grayMatter(code)
			const html = marked.parse(content)

			if (params.writeTemplate) await params.writeTemplate(id, data)

			return plugin.transform(html, `${dirname(id)}.svelte`)
		}

		return plugin.transform(code, id)
	}

	return {
		...plugin,
		transform,
	}
}
