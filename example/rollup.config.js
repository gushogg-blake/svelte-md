import { resolvePages, svelteMarkdown } from '../index.js'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'

const production = !process.env.ROLLUP_WATCH

const configs = resolvePages({
	dir: 'src/pages',
	outDir: 'dist',
	globalCss: 'src/global.css',
	format: 'iife',
	makeBundleOptions: ({ writeTemplate }) => ({
		plugins: [
			svelteMarkdown({ writeTemplate }),

			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({ output: 'bundle.css' }),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration -
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: ['svelte'],
			}),
			commonjs(),

			// In dev mode, call `npm run start` once
			// the bundle has been generated
			// !production && serve(),

			// Watch the `public` directory and refresh the
			// browser on changes when not in production
			// !production && livereload('public'),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser(),
		],
		watch: {
			clearScreen: false,
		},
	}),
})

export default configs
