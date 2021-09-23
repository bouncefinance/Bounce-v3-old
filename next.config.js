// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require("next-images");

module.exports = {
	...withImages(),
	distDir: "dist",
	trailingSlash: true,
	// future: {
	// 	webpack5: true,
	// },
};
