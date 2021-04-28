<template>
  <error :config="config"></error>
</template>

<script>
import Error from '@/components/Error'
export default {
  components: { Error },
  data() {
    return {
      config: {
        img: '404.svg',
        title: '404',
        desc: '抱歉，你访问的页面不存在。',
      },
    }
  },
}
</script>

<style scoped lang="scss"></style>
