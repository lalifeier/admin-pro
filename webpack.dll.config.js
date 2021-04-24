const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const dllPath = './public/vendor'

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['vue/dist/vue.runtime.esm.js', 'vuex', 'vue-router', 'element-ui', 'axios', 'lodash', 'jquery', 'moment', 'echarts']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, dllPath),
    library: '_dll_[name]'
  },
  optimization: {
    minimizer: [new TerserPlugin({
      parallel: true,
      cache: true
    })]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, dllPath, '[name].manifest.json'),
      context: process.cwd()
    })
  ]
}
