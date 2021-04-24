<template>
  <el-breadcrumb class="breadcrumb-container" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span
        v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
        class="no-redirect"
        >{{ item.meta.title }}</span
      >
      <router-link v-else class="redirect" :to="item.path">{{ item.meta.title }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>

export default {
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      this.levelList = []
      if (this.$route.path === '/index') return
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
      matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
      this.levelList = matched
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb-container.el-breadcrumb {
  .redirect {
    font-weight: normal;
  }
}
</style>
