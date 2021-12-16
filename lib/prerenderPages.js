let resolvePages = require("./resolvePages");

module.exports = function(params) {
	let prerenderParams = {
		...params,
		
		makeBundleOptions(options) {
			let res = params.makeServerBundleOptions(options);
			
			return {
				...res,
				extraOutputOptions: {exports: "default"},
			};
		},
		
		format: "cjs",
	};
	
	let templates = resolvePages(prerenderParams);

	let resolveParams = {
		...params,
		makeBundleOptions: params.makeClientBundleOptions,
	};
	
	let clientJs = resolvePages(resolveParams);

	return [...templates, ...clientJs];
}
