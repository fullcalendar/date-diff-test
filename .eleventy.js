const sass = require("sass");
const qrcode = require("qrcode-terminal");
const devIp = require("dev-ip");

module.exports = function (eleventyConfig) {
	eleventyConfig.setQuietMode(true);
	eleventyConfig.addPassthroughCopy("js/lib");
	eleventyConfig.addWatchTarget(".");

	eleventyConfig.setServerOptions({
		port: 5555,
		showAllHosts: true,

		// https: {
		// 	key: "./localhost.key",
		// 	cert: "./localhost.cert",
		// },

		// Change the name of the special folder name used for injected scripts
		// folder: ".11ty",
	});
	let devip = "http://" + devIp()[0] + ":5555";
	if (devIp()[0]) { qrcode.generate(devip, { small: true }) }

	eleventyConfig.addFilter("sass", code => {
		return sass.compileString(code).css.toString();
	});

	return {
		dir: {
			output: "dist"
		}
	};
}