<template>
  <div></div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn'
// dayjs.locale('zh-cn')

export default {
  created() {
    console.log(this.dayjs().format('YYYY-MM-DD'))

    console.log(moment().format('YYYY-MM-DD'))
  },
}
</script>

<style></style>
