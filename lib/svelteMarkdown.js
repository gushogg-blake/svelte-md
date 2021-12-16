let sveltePlugin  = require( "rollup-plugin-svelte");
let {marked}  = require( "marked");
let {dirname, join}  = require( "path");
let grayMatter  = require( "gray-matter");

module.exports = function(params) {
	let prerenderClient = params.prerenderType === "client";
	let prerenderServer = params.prerenderType === "server";
	let style = prerenderServer ? "ssr" : "dom";
	
	let plugin = sveltePlugin({
		...params.sveltePluginOptions,
		
		emitCss: !(prerenderClient || prerenderServer),
		
		compilerOptions: {
			generate: style,
			hydratable: prerenderClient,
		},
	});
	
	let writeTemplate = params.writeTemplate;
	let firstMeta;
	
	async function transform(code, id) {
		if (id.endsWith(".md")) {
			let {data, content} = grayMatter(code);
			let html = marked.parse(content);
			
			if (!firstMeta) {
				firstMeta = {id, data};
			}
			
			return plugin.transform(html, `${dirname(id)}.svelte`);
		} else if (id.endsWith(".svelte")) {
			if (!firstMeta) {
				firstMeta = {id, data: {}};
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
			
			let {id, data} = firstMeta;
			
			if (prerenderServer) {
				if (!file.startsWith("/")) {
					file = join(process.cwd(), file);
				}
				
				let App = require(file);
				
				try {
					let {head, html, css} = App.render();
					
					await writeTemplate({
						id,
						data,
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
					data,
					head: "",
					html: "",
				});
			}
		},
	};
}
