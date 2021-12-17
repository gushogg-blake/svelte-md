const sveltePlugin = require("rollup-plugin-svelte");
const {marked} = require("marked");
const {dirname, join} = require("path");
const grayMatter = require("gray-matter");

marked.use({
	renderer: {
		code(code, info, escaped) {
			return `<pre><code class="language-${info}">` + code.replace(/[{}<>]/g, b => `{"${b}"}`) + "</code></pre>";
		},
	},
});

module.exports = function(params) {
	const prerenderClient = params.prerenderType === "client";
	const prerenderServer = params.prerenderType === "server";
	const style = prerenderServer ? "ssr" : "dom";
	
	const plugin = sveltePlugin({
		...params.sveltePluginOptions,
		
		extensions: [".svelte", ".md"],
		
		emitCss: !(prerenderClient || prerenderServer),
		
		compilerOptions: {
			generate: style,
			hydratable: prerenderClient,
		},
	});
	
	const writeTemplate = params.writeTemplate;
	
	let firstMeta;
	
	async function transform(code, id) {
		if (id.endsWith(".md")) {
			const {data: frontMatter, content} = grayMatter(code);
			const html = marked.parse(content);
			
			if (!firstMeta) {
				firstMeta = {id, frontMatter};
			}
			
			return plugin.transform(html, id);
		} else if (id.endsWith(".svelte")) {
			if (!firstMeta) {
				firstMeta = {id, frontMatter: {}};
			}
			
			return plugin.transform(code, id);
		}
	}

	return {
		...plugin,
		transform,
		
		async writeBundle({file}) {
			if (!firstMeta || !writeTemplate) {
				return;
			}
			
			const {id, frontMatter} = firstMeta;
			
			if (prerenderServer) {
				if (!file.startsWith("/")) {
					file = join(process.cwd(), file);
				}
				
				const App = require(file);
				
				try {
					const {head, html, css} = App.render();
					
					await writeTemplate({
						id,
						frontMatter,
						head,
						html,
						css,
					});
				} catch (e) {
					console.log(e);
				}
			} else {
				await writeTemplate({
					id,
					frontMatter,
					head: "",
					html: "",
				});
			}
		},
	};
}
