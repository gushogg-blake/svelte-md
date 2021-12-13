import write from 'write'
import { join } from 'path'

export async function writeOutput(params) {
	const js = params.js
	const css = params.css
	const globalJs = params.globalJs
	const globalCss = params.globalCss
	const html = params.html
	const path = params.path

	await write(join(path, 'main.js'), js)
	await write(join(path, 'main.css'), css)
	await write(join(path, 'global.js'), globalJs)
	await write(join(path, 'global.css'), globalCss)
	await write(join(path, 'index.html'), html)
}
