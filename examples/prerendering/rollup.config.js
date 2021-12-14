import { svelteMarkdown, prerenderPages } from '../../index.js'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

const configs = prerenderPages({
	dir: 'src/pages',
	outDir: 'dist',
	format: 'iife',
	globalCss: 'src/global.css',
	makeClientBundleOptions: () => ({
		plugins: [
			svelteMarkdown({ prerenderType: 'client' }),

			resolve({ browser: true, dedupe: ['svelte'] }),
			commonjs(),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser(),
		],
		watch: {
			clearScreen: false,
		},
	}),
	makeServerBundleOptions: ({ writeTemplate }) => ({
		plugins: [
			svelteMarkdown({ writeTemplate, prerenderType: 'server' }),

			// NOTE: browser=true is not set on the resolve plugin
			resolve({ dedupe: ['svelte'] }),
			commonjs(),

			// We don't need to minify because this code bundled is never used anywhere.
			// It is just run once then disposed of
		],
		watch: {
			clearScreen: false,
		},
	}),
})

export default configs
