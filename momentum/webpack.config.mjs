import path from 'path';
export default {   
    entry: './src/app.js',
        output: {
        filename: 'bundle.js',
        path: path.resolve(path.dirname('./'), 'bundle'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            // {
            //     test: /\.s?css$/i,
            //     use: [
            //         mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            //         'css-loader',
            //         'postcss-loader',
            //         'sass-loader',
            //     ],
            // },
            // {
            //     test: /\.(png|jpe?g|gif|svg)$/i,
            //     type: 'asset',
            //     parser: {
            //         dataUrlCondition: {
            //             maxSize: 4 * 1024,
            //         },
            //     },
            // },
        ],
    },
    // devtool: 'source-map',
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        //port: 3000,
        static: './build'
      },
}