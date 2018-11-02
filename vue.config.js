module.exports = {
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.transpileOptions = {
                    objectAssign: 'Object.assign'
                }
                console.log(options)
                return options
            })
    }
}
