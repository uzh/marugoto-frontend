module.exports = {
    devServer: {
        port: 4020,
        open: true
    },
    pluginOptions: {
        svgSprite: {
            /*
            * The directory containing your SVG files.
            */
            dir: 'src/assets/icons',
            /*
            * The reqex that will be used for the Webpack rule.
            */
            test: /\.(svg)(\?.*)?$/,
            /*
            * @see https://github.com/kisenka/svg-sprite-loader#configuration
            */
            loaderOptions: {
                extract: true,
                spriteFilename: 'src/assets/images/icons.[hash:8].svg', // or 'img/icons.svg' if filenameHashing == false
                esModule: false // comment for dev
            },
            /*
            * @see https://github.com/kisenka/svg-sprite-loader#configuration
            */
            pluginOptions: {
                plainSprite: true
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('svg-sprite')
            .use('svgo-loader')
            .loader('svgo-loader');
    }, 
}