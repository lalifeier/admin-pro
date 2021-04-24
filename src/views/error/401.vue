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
        img: '401.svg',
        title: '401',
        desc: '抱歉，你无权访问该页面。'
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
