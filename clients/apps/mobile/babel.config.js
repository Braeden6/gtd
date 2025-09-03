module.exports = function(api) {
    api.cache(true);
    return {
        presets: [["babel-preset-expo", {
            jsxImportSource: "nativewind"
        }], "nativewind/babel"],

        plugins: [
            ["module-resolver", {
                root: ["./"],
                alias: {
                    "@": "./",
                    "@gtd/shared": "../../shared",
                    "tailwind.config": "./tailwind.config.js"
                }
            }]
        ]
    };
};