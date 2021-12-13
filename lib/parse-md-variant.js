/** This function basically just categorizes the markdown in to js, css, markdown, and an array of component ids.
 * `assignIdToComponent` is a function that takes in the component's name given it when imported and the file from
 * whence it came.  It is expected to return a unique id for that component */
export function parseMdVariant(input, assignIdToComponent) {
	const jsLines = []
	const cssLines = []
	const markdownLines = []

	// component names -> their ids
	const componentNames = {}

	// component ids -> their props
	const components = {}

	const lines = input.split('\n')

	let inJS = false
	let inCSS = false

	// loop through each line and assign it to it's proper category
	for (const line of lines) {
		const trim = line.trim()

		// if we encounter an open script tag, skip it and put all future lines in the JS category
		if (trim === '<script>') {
			inJS = true
			continue
		}

		// if we encounter an open style tag, skip it and put all future lines in the CSS category
		if (trim === '<style>') {
			inCSS = true
			continue
		}

		// if we are inside the script tags...
		if (inJS) {
			// check if this line is a svelte import.
			// If it is, don't add it do the js and create an id for the component
			if (trim.startsWith('import')) {
				const res = parseDefaultImportLine(trim)
				if (res) {
					const { defaultImport, file } = res

					if (file.endsWith('.svelte')) {
						const id = assignIdToComponent(defaultImport, file)

						componentNames[defaultImport] = id
						continue
					}
				}

				jsLines.push(line)
			}
			// If we encounter a closing script tag, skip it and stop adding future lines to the JS category
			else if (trim === '</script>') inJS = false
			// This is nothing special, just plain JS
			else jsLines.push(line)
		}
		// We are between the style tags, add all lines to the css category until we get to the closing tag
		else if (inCSS) {
			if (trim === '</style>') inCSS = false
			else cssLines.push(line)
		}
		// This should be just plain markdown
		else {
			// check for self-closing html tags
			{
				const res = /<.+\/>/.exec(line)

				if (res) {
					const tag = res[0]
					const tagIndexInLine = res.index

					const { name, attributes } = parseTag(tag)

					const id = componentNames[name]
					if (id) {
						// phew!  we have a reference to a valid Svelte component here.
						// lets go ahead and remember it, along with it's attributes
						if (!components[id]) components[id] = [attributes]
						else components[id].push(attributes)

						// Rebuild the line to include a mount container for the svelte element
						const newLine =
							line.slice(0, tagIndexInLine) +
							`<span id="component-slot-${id}-${components[id].length}"></span>` +
							line.slice(tagIndexInLine + tag.length)

						// Register the new line
						markdownLines.push(newLine)
						continue
					}
				}
			}

			// Nothing exciting here... just plain markdown
			markdownLines.push(line)
		}
	}

	return {
		js: jsLines.join('\n'),
		css: cssLines.join('\n'),
		markdown: markdownLines.join('\n'),
		components,
	}
}

function parseDefaultImportLine(importLine) {
	const tokens = importLine.split(/\s+/)

	const name = tokens[1]
	if (!name) throw new Error(`invalid import statement: ${importLine}`)

	if (name === '{') return null

	const path = tokens[3]
	if (!path) throw new Error(`invalid import statement: ${importLine}`)

	const file = path.replaceAll(';', '').slice(1, -1)

	return { defaultImport: name, file }
}

function parseTag(tag) {
	const core = tag.slice(1, -2).trim()
	const sections = core.split(/\s+/)

	const name = sections[0]
	const attributesSections = sections.slice(1)
	const attributes = {}

	for (const section of attributesSections) {
		const [key, value] = section.split('=')

		attributes[key.trim()] = parseValue(value.trim())
	}

	return { name, attributes }
}

function parseValue(value) {
	if (value.startsWith('{') && value.endsWith('}')) {
		return value.slice(1, -1).trim()
	}

	return value
}
