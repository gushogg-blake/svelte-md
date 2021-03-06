const resolvePages = require("./resolvePages");

module.exports = function(params) {
	const prerenderParams = {
		...params,
		
		makeBundleOptions(options) {
			const res = params.makeServerBundleOptions(options);
			
			return {
				...res,
				extraOutputOptions: {exports: "default"},
			};
		},
		
		format: "cjs",
	};
	
	const templates = resolvePages(prerenderParams);

	const resolveParams = {
		...params,
		makeBundleOptions: params.makeClientBundleOptions,
	};
	
	const clientJs = resolvePages(resolveParams);

	return [...templates, ...clientJs];
}
