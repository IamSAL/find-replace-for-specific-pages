module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "./dist/bundle.js"
    },
    module: {

        rules: [

            {
                test: /.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [["env", "react"]],
                    plugins: ["transform-class-properties"]
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
};