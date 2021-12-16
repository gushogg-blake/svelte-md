import {join} from "path";
import {readFileSync} from "fs";
import recursiveReadDir from "recursive-readdir-sync";
import write from "write";

export function resolvePages(options) {
	let dir = options.dir || "src/pages";
	let rootOutDir = options.outDir || "dist";
	let makeBundleOptions = options.makeBundleOptions || makeDefaultBundleOptions;
	let globalCss = options.globalCss;
	let globalJs = options.globalJs;
	let format = options.format;
	
	let globalCssPath = globalCss ? join(rootOutDir, "global.css") : null;
	let globalJsPath = join(rootOutDir, "global.js");
	
	if (globalCss) {
		write(globalCssPath, readFileSync(globalCss, "utf-8"));
	}
	
	write(globalJsPath, globalJs ? readFileSync(globalJs, "utf-8") : "new RootSvelteComponent({target: document.body})");
	
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

			let template = `<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>${data.title}</title>
				
					${globalCss ? `<link rel="stylesheet" href="/global.css" />` : ""}
					<link rel="stylesheet" href="${join("/", localDir, "bundle.css")}" />
				
					<script src="${join("/", localDir, "main.js")}" defer></script>
					<script src="/global.js" defer></script>
				
					${head}
				</head>
				<body>
					${html}
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
			globalCssPath,
			globalJsPath,
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
	})

	return rollupConfigs;
}
