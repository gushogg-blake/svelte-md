import recursiveReadDir from 'recursive-readdir-sync'
import { join } from 'path'
import write from 'write'
import { readFileSync } from 'fs'

export async function resolvePages(options) {
	const dir = options.dir || 'src/pages'
	const rootOutDir = options.outDir || 'dist'
	const makeBundleOptions = options.makeBundleOptions || makeDefaultBundleOptions
	const globalCss = options.globalCss
	const globalJs = options.globalJs
	const format = options.format

	const globalCssPath = globalCss ? join(rootOutDir, 'global.css') : null
	const globalJsPath = join(rootOutDir, 'global.js')

	console.log(globalCss)
	if (globalCss) write(globalCssPath, readFileSync(globalCss, 'utf-8'))
	write(globalJsPath, globalJs ? readFileSync(globalJs, 'utf-8') : 'new RootSvelteComponent({ target: document.body })')

	const files = recursiveReadDir(dir)
	const mdFiles = files.map(file => join(process.cwd(), file)).filter(file => file.endsWith('.md'))

	const rollupConfigs = mdFiles.map(file => {
		const localDir = file.slice(join(process.cwd(), dir).length)
		const pageDir = join(rootOutDir, localDir)
		const cssOutputPath = join(pageDir, 'main.css')
		const jsOutputPath = join(pageDir, 'main.js')
		const templatePath = join(pageDir, 'index.html')

		async function writeTemplate(id, data) {
			if (mdFiles.indexOf(id) === -1) return

			const html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${data.title}</title>

	${globalCss ? `<link rel="stylesheet" href="/global.css" />` : ''}
	<link rel="stylesheet" href="${join('/', localDir, 'bundle.css')}" />

	<script src="${join('/', localDir, 'main.js')}" defer></script>
	<script src="/global.js" defer></script>
</head>
<body></body>
</html>`

			await write(templatePath, html)
		}

		const options = makeBundleOptions({
			outputDir: pageDir,
			cssOutputPath,
			jsOutputPath,
			templatePath,
			writeTemplate,
			globalCssPath,
			globalJsPath,
		})

		return {
			plugins: options.plugins,
			external: options.external,
			input: options.inputFile || file,
			cache: options.cache,
			onwarn: options.onwarn,
			preserveEntrySignatures: options.preserveEntrySignatures,
			strictDeprecations: options.strictDeprecations,
			output: {
				file: options.jsOutput || jsOutputPath,
				format: options.format || format || 'iife',
				name: 'RootSvelteComponent',
			},
			watch: options.watch,
		}
	})

	return rollupConfigs
}
