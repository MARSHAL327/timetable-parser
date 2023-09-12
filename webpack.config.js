const path = require('path')

module.exports = {
    target: "node",
    entry: {
        timetable_parser: "./main.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: '/\.tgs$/',
                use: ['file-loader']
            },
            {
                test: /\.(ts|tsx)?$/,
                use: ['awesome-typescript-loader']
            }
        ]
    }
}