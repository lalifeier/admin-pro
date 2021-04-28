import {
  Loading,
  MessageBox,
  Message,
  Notification,
  Tabs,
  TabPane,
  Steps,
  Step,
  Form,
  FormItem,
  Input,
  InputNumber,
  Row,
  Col,
  Button,
  Checkbox,
  Backtop,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Drawer,
  Divider,
  Switch,
  Select,
  Option,
  Popover,
  Tooltip,
} from 'element-ui'

import { loadingText, messageDuration } from '@/config'

export default {
  install(Vue, options) {
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Steps)
    Vue.use(Step)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(InputNumber)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Checkbox)
    Vue.use(Backtop)

    Vue.use(Dropdown)
    Vue.use(DropdownItem)
    Vue.use(DropdownMenu)

    Vue.use(Drawer)
    Vue.use(Divider)
    Vue.use(Switch)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Popover)
    Vue.use(Tooltip)

    Vue.use(Loading.directive)

    // Vue.prototype.$loading = Loading.service
    // Vue.prototype.$msgbox = MessageBox
    // Vue.prototype.$alert = MessageBox.alert
    // Vue.prototype.$confirm = MessageBox.confirm
    // Vue.prototype.$prompt = MessageBox.prompt
    // Vue.prototype.$notify = Notification
    // Vue.prototype.$message = Message

    Vue.prototype.$loading = (text) => {
      return Loading.service({
        lock: true,
        text: text || loadingText,
        background: 'hsla(0,0%,100%,.8)',
      })
    }

    Vue.prototype.$message = (message, type) => {
      Message({
        offset: 60,
        showClose: true,
        message,
        type,
        dangerouslyUseHTMLString: true,
        duration: messageDuration,
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
        },
      })
    }

    Vue.prototype.$confirm = (content, title, callback1, callback2) => {
      MessageBox.confirm(content, title || '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning',
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
        title,
        message,
        position: position || 'top-right',
        type: type || 'success',
        duration: messageDuration,
      })
    }
  },
}
