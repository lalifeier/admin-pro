import ElementUI, {
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

import { loadingText, messageDuration } from '@/config'

export default {
  install (Vue, options) {
    Vue.use(ElementUI, {
      size: 'small'
    })

    Vue.prototype.$loading = (text) => {
      return Loading.service({
        lock: true,
        text: text || loadingText,
        background: 'hsla(0,0%,100%,.8)'
      })
    }

    Vue.prototype.$message = (message, type) => {
      Message({
        offset: 60,
        showClose: true,
        message: message,
        type: type,
        dangerouslyUseHTMLString: true,
        duration: messageDuration
      })
    }

    Vue.prototype.$alert = (content, title, callback) => {
      MessageBox.alert(content, title || '温馨提示', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        callback: () => {
          if (callback) {
            callback()
          }
        }
      })
    }

    Vue.prototype.$confirm = (content, title, callback1, callback2) => {
      MessageBox.confirm(content, title || '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      })
        .then(() => {
          if (callback1) {
            callback1()
          }
        })
        .catch(() => {
          if (callback2) {
            callback2()
          }
        })
    }

    Vue.prototype.$notify = (message, title, type, position) => {
      Notification({
        title: title,
        message: message,
        position: position || 'top-right',
        type: type || 'success',
        duration: messageDuration
      })
    }
  }
}
