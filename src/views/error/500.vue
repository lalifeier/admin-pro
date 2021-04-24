<template>
  <error :config="config"></error>
</template>

<script>
import Error from '@/components/Error'
export default {
  components: { Error },
  data () {
    return {
      config: {
        img: '500.svg',
        title: '500',
        desc: '抱歉，服务器出错了。'
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
