const path = require('path');

module.exports = {
    entry: {
        app: './src/main.ts'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },

    devtool: 'inline-source-map',
    devServer:{
        static: path.resolve(__dirname, 'src'),
        port:9000
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [ 
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_moudles/
            }
        ]
    }
}