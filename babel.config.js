const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = [
  // [
  //   'component',
  //   {
  //     libraryName: 'element-ui',
  //     styleLibraryName: 'theme-chalk'
  //   }
  // ],
  'lodash'
]

// 去掉 console.log
if (IS_PROD) {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins
}
