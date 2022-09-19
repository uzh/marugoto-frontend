process.env.VUE_APP_BUILD_IMAGE = process.env.BUILD_IMAGE || 'uzhli/marugoto-frontend'
process.env.VUE_APP_GIT_TAG = process.env.GIT_TAG || 'latest'
process.env.VUE_APP_GIT_BRANCH = process.env.GIT_BRANCH || ''
process.env.VUE_APP_GIT_REVISION = process.env.GIT_REVISION || ''


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
                filenameHashing: false,
                spriteFilename: 'src/assets/images/icons.svg', // or 'img/icons.svg' if filenameHashing == false
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
};
