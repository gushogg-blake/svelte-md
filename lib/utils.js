import {readFile} from "fs";

export function read(file) {
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
