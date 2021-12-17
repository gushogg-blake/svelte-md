const {join} = require("path");
const {readFileSync} = require("fs");
const fs = require("flowfs");
const recursiveReadDir = require("recursive-readdir-sync");
const write = require("write");

module.exports = function(options) {
	const templatePath = fs(options.template).path;
	const dir = fs(options.dir);
	const rootOutDir = fs(options.outDir);
	const makeBundleOptions = options.makeBundleOptions || makeDefaultBundleOptions;
	const format = options.format;
	
	const mdFiles = recursiveReadDir(dir.path).filter(file => file.endsWith(".md"));
	
	const rollupConfigs = mdFiles.map(file => {
		const localDir = fs(file).parent.pathFrom(dir);
		const name = fs(file).basename;
		const outDir = fs(join(rootOutDir.path, localDir));
		const cssOutputPath = outDir.child(name + ".css").path;
		const jsOutputPath = outDir.child(name + ".js").path;
		const htmlOutputPath = outDir.child(name + ".html").path;
		
		async function writeTemplate({id, frontMatter, head, html, css}) {
			if (mdFiles.indexOf(id) === -1) {
				return;
			}
			
			head = `
				<link rel="stylesheet" href="${name}.css">
				<script src="${name}.js"></script>
				${head}
			`;
			
			const body = `
				${html}
				<script>
					new RootSvelteComponent({
						target: document.body,
						hydrate: true,
					});
				</script>
			`;
			
			const placeholders = {
				...frontMatter,
				head,
				body,
			};
			
			const template = readFileSync(templatePath, {
				encoding: "utf-8",
			}).replace(/\$\{(\w+)\}/g, (_, p) => placeholders[p]);
			
			await write(htmlOutputPath, template);
			
			if (css) {
				await write(cssOutputPath, css.code);
			}
		}

		const options = makeBundleOptions({
			writeTemplate,
		});
		
		return {
			plugins: options.plugins,
			external: options.external,
			input: options.inputFile || file,
			cache: options.cache,
			onwarn: options.onwarn,
			preserveEntrySignatures: options.preserveEntrySignatures,
			strictDeprecations: options.strictDeprecations,
			
			output: {
				file: jsOutputPath,
				format: options.format || format || "iife",
				name: "RootSvelteComponent",
				...(options.extraOutputOptions || {}),
			},
			
			watch: options.watch,
		};
	});
	
	return rollupConfigs;
}
