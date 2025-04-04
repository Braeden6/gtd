module.exports = function(api) {
    api.cache(true);

    // console.log("APP_VARIANT in babel config:", process.env.APP_VARIANT);
    return {
        presets: [["babel-preset-expo", {
            jsxImportSource: "nativewind"
        }], "nativewind/babel"],

        plugins: [["module-resolver", {
            root: ["./"],

            alias: {
                "@": "./",
                "tailwind.config": "./tailwind.config.js"
            }
        }],
        ["module:react-native-dotenv", {
            "moduleName": "@env",
            "path": `.env.${process.env.APP_VARIANT || 'production'}`,
            "safe": false,
            "allowUndefined": true,
            "allowlist": null, 
            "blocklist": null,
            "verbose": true
        }]
    ]
    };
};