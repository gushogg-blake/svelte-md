import { summarize } from './test.js'

import parserTests from './parser.js'

async function main() {
	await parserTests()

	summarize()
}

main()
