const esbuild = require("esbuild");

esbuild
	.build({
		entryPoints: ["src/main.ts"],
		outfile: "build/main.js",
		bundle: true,
		platform: "node",
		target: "node20",
		format: "esm",
		packages: "external",
		sourcemap: true,
		alias: {
			"@": "./src",
		},
	})
	.catch(() => process.exit(1));
