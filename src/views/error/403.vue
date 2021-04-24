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
        img: '403.svg',
        title: '403',
        desc: '抱歉，登录超时啦！'
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
