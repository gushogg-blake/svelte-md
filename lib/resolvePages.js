let {join} = require("path");
let {readFileSync} = require("fs");
let recursiveReadDir = require("recursive-readdir-sync");
let write = require("write");

module.exports = function(options) {
	let dir = options.dir || "src/pages";
	let rootOutDir = options.outDir || "dist";
	let makeBundleOptions = options.makeBundleOptions || makeDefaultBundleOptions;
	let format = options.format;
	
	let files = recursiveReadDir(dir);
	let mdFiles = files.map(file => join(process.cwd(), file)).filter(file => file.endsWith(".md"));
	
	let rollupConfigs = mdFiles.map(file => {
		let localDir = file.slice(join(process.cwd(), dir).length);
		let pageDir = join(rootOutDir, localDir);
		let cssOutputPath = join(pageDir, "main.css");
		let jsOutputPath = join(pageDir, "main.js");
		let templatePath = join(pageDir, "index.html");
		
		async function writeTemplate({ id, data, head, html, css }) {
			if (mdFiles.indexOf(id) === -1) {
				return;
			}

			let template = `
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

		let options = makeBundleOptions({
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
