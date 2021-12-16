let {readFile} = require("fs");

module.exports = function(file) {
	return new Promise((resolve, reject) => {
		readFile(file, "utf-8", (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}
