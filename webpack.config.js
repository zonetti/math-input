const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app',
        deps: [
            'react',
            'react-dom',
            'react-redux',
            'redux',
            'aphrodite',
            'mathquill-commonjs',
            // TODO(kevinb) create a build config for test code
            //'mathquill',
        ],
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'deps',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ]
};
