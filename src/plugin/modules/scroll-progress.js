import NProgress from 'nprogress'

export default {
  install(Vue) {
    Vue.mixin({
      mounted: () => {
        window.addEventListener('scroll', () => {
          const windowScrollPixels = document.body.scrollTop || document.documentElement.scrollTop
          const windowScrollPercents =
            windowScrollPixels / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
          NProgress.set(windowScrollPercents)
        })
      },
    })
  },
}
