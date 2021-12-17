const {join} = require("path");
const {readFileSync} = require("fs");
const recursiveReadDir = require("recursive-readdir-sync");
const write = require("write");

module.exports = function(options) {
	const dir = options.dir || "src/pages";
	const rootOutDir = options.outDir || "dist";
	const makeBundleOptions = options.makeBundleOptions || makeDefaultBundleOptions;
	const format = options.format;
	
	const files = recursiveReadDir(dir);
	const mdFiles = files.map(file => join(process.cwd(), file)).filter(file => file.endsWith(".md"));
	
	const rollupConfigs = mdFiles.map(file => {
		const localDir = file.slice(join(process.cwd(), dir).length);
		const pageDir = join(rootOutDir, localDir);
		const cssOutputPath = join(pageDir, "main.css");
		const jsOutputPath = join(pageDir, "main.js");
		const templatePath = join(pageDir, "index.html");
		
		async function writeTemplate({id, data, head, html, css}) {
			if (mdFiles.indexOf(id) === -1) {
				return;
			}

			const template = `
				<!doctype html>
				<html>
					<head>
						<meta charset="utf-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>${data.title}</title>
						<link rel="stylesheet" href="/global.css">
						<link rel="stylesheet" href="./main.css">
						<script src="./main.js"></script>
						${head}
					</head>
					<body>
						${html}
						<script>
							new RootSvelteComponent({
								target: document.body,
							});
						</script>
					</body>
				</html>
			`;

			await write(templatePath, template);

			if (css) {
				await write(cssOutputPath, css.code);
			}
		}

		const options = makeBundleOptions({
			outputDir: pageDir,
			cssOutputPath,
			jsOutputPath,
			templatePath,
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
				file: options.jsOutput || jsOutputPath,
				format: options.format || format || "iife",
				name: "RootSvelteComponent",
				...(options.extraOutputOptions || {}),
			},
			
			watch: options.watch,
		};
	});

	return rollupConfigs;
}
