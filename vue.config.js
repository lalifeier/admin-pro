// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')

const StyleLintPlugin = require('stylelint-webpack-plugin')

const resolve = (dir) => path.join(__dirname, dir)

const setting = require('./src/config/index')
const name = setting.title

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const externals = {
  vue: 'Vue',
  vuex: 'Vuex',
  'vue-router': 'VueRouter',
  'element-ui': 'ELEMENT',
  axios: 'axios',
  lodash: '_',
  jquery: '$',
  echarts: 'echarts',
  nprogress: 'NProgress'
}

const cdn = {
  css: ['//cdn.jsdelivr.net/npm/element-ui@2.15.1/lib/theme-chalk/index.css'],
  js: [
    '//polyfill.alicdn.com/polyfill.min.js',
    '//cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/element-ui@2.15.1/lib/index.js',
    '//cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
    '//cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js',
    '//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
    '//cdn.jsdelivr.net/npm/echarts@5.0.2/dist/echarts.min.js'
  ]
}

module.exports = {
  // 基本路径
  publicPath: IS_PROD ? `${process.env.VUE_APP_PUBLIC_PATH}` : './',
  // 输出文件目录
  outputDir: 'dist',
  // 静态资源目录
  assetsDir: 'static',
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: !IS_PROD,
  // 生产环境的 source map
  productionSourceMap: false,
  devServer: {
    // 让浏览器同时显示警告和错误
    overlay: {
      warnings: true,
      errors: true
    },
    // 是否打开浏览器
    open: false,
    host: 'localhost',
    port: '8080',
    https: false,
    // 热更新
    hotOnly: false,
    // proxy: {
    //   '/api': {
    //     target: 'https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets',
    //     secure: false,
    //     changeOrigin: true,
    //     // ws: true,
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   }
    // },
    before: require('./mock/mock-server.js')
  },
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      // 为 sass 提供全局样式，以及全局变量
      scss: {
        additionalData: `
        @import "@/styles/variables.scss";
        @import "@/styles/mixins.scss";
        @import "@/styles/function.scss";
        $src: "${process.env.VUE_APP_OSS_SRC}";
        `
      }
    }
  },
  configureWebpack: (config) => {
    config.name = name
    const plugins = []

    // https://github.com/hzsrc/webpack-theme-color-replacer
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        matchColors: [
          ...forElementUI.getElementUISeries('#1890ff')
        ],
        changeSelector: forElementUI.changeSelector,
        injectCss: false,
        isJsUgly: IS_PROD
      })
    )

    config.plugins.push(
      new StyleLintPlugin({
        files: ['**/*.{html,vue,css,sass,scss,less}'],
        fix: false,
        cache: true,
        emitErrors: true,
        failOnError: false
      })
    )

    if (IS_PROD) {
      // 配置 externals 引入 cdn 资源
      config.externals = externals
      // 开启 gzip 压缩
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      )
      // 利用 splitChunks 单独打包第三方模块
      config.optimization = {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'),
              minChunks: 3,
              maxInitialRequests: 5,
              priority: 1,
              reuseExistingChunk: true
            },
            vendors: {
              name: 'chunk-vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial',
              priority: 2,
              reuseExistingChunk: true
            },
            elementUI: {
              name: 'chunk-elementUI',
              test: /[\\/]node_modules[\\/]element-ui[\\/]/,
              priority: 3,
              reuseExistingChunk: true
            },
            echarts: {
              name: 'chunk-echarts',
              test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
              priority: 4,
              reuseExistingChunk: true,
              enforce: true
            }
          }
        }
      }
    }
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true)
    config.when(!IS_PROD, (config) => config.devtool('cheap-module-eval-source-map'))
    if (process.env.IS_ANALYZE) {
      // 速度分析
      config
        .plugin('speed-measure-webpack-plugin')
        .use(SpeedMeasurePlugin)
        .end()
      // 体积分析
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static', // static disabled
          generateStatsFile: true
        }
      ])
    }
    // 添加别名
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js').set('@', resolve('src')).set('moment', 'dayjs')

    // 删除 moment 除 zh-cn 中文包外的其它语言包
    // config
    //   .plugin('ignore')
    //   .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))

    // 按需加载lodash
    config.plugin('lodash-replace-webpack-plugin').use(new LodashModuleReplacementPlugin())

    // 打包缓存
    // config.plugin('hard-source-webpack-plugin').use(new HardSourceWebpackPlugin())

    // 清除svg默认配置对./src/icons文件夹的处理
    config.module
      .rule('svg')
      .exclude.add(resolve('./src/icons'))
      .end()

    // 添加新的rule处理./src/icons文件夹的svg文件
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      .before('svg-sprite-loader')
      .use('svgo-loader')
      .loader('svgo-loader')
      .options({
        plugins: [
          { removeAttrs: { attrs: 'path:fill' } }
        ]
      })
      .end()

    config.plugin('provide').use(webpack.ProvidePlugin, [{
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }])

    if (IS_PROD) {
      config.optimization.delete('splitChunks')
      // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
      config.plugin('html').tap((args) => {
        // html中添加cdn
        args[0].cdn = cdn
        return args
      })
      // 压缩图片
      // config.module
      //   .rule('images')
      //   .use('image-webpack-loader')
      //   .loader('image-webpack-loader')
      //   .options({
      //     mozjpeg: { progressive: true, quality: 65 },
      //     optipng: { enabled: false },
      //     pngquant: { quality: [0.65, 0.9], speed: 4 },
      //     gifsicle: { interlaced: false },
      //     webp: { quality: 75 },
      //   });
    } else {
      // config.plugin('vendorDll').use(webpack.DllReferencePlugin, [
      //   {
      //     context: __dirname,
      //     manifest: require.resolve('./public/vendor/vendor.manifest.json')
      //   }
      // ])
      // config
      //   .plugin('addAssetHtml')
      //   .use(AddAssetHtmlPlugin, [
      //     [
      //       {
      //         filepath: path.resolve(__dirname, 'public/vendor/vendor.dll.js'),
      //         outputPath: 'vendor',
      //         publicPath: 'vendor'
      //       }
      //     ]
      //   ])
      //   .after('html')
    }
  }
}
