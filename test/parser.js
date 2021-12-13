import { parseMdVariant } from '../lib/parse-md-variant.js'
import { assert, test } from './test.js'

export default async function () {
	await test('should parse files', () => {
		const input = `<script>
	import Widget from './Widget.svelte'

	console.log('hi')
</script>

- Markdown *here*

<style>
	h1
</style>

<Widget prop1={true} />`

		const { components, css, js, markdown } = parseMdVariant(input, (name, file) => {
			return name
		})

		assert(components['Widget'][0]['prop1'] === 'true')
		assert(css === '\th1')
		assert(js === `\n\tconsole.log('hi')`)
		assert(markdown === `\n- Markdown *here*\n\n\n<span id="component-slot-Widget-1"></span>`)
	})
}
