export function assert(condition, message) {
	if (!condition) throw new Error(message || 'assertion failed')
}

let failures = 0
let passes = 0

export async function test(description, fn) {
	try {
		const startTime = Date.now()

		await fn()
		passes++

		console.log(`test ${description} ... ok (${Date.now() - startTime}ms)`)
	} catch (e) {
		console.log(`test ${description} ... failed`)
		console.error(e)
		failures++
	}
}

export function summarize() {
	console.log()
	if (failures) console.log(`not ok; ${failures} failed, ${passes} passed`)
	else console.log(`ok; ${passes} tests passed :)`)
}
