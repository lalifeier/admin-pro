<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { enquireScreen } from '@/utils/enquire'

import { title } from '@/config'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isMobile']),
  },
  watch: {
    $route() {
      this.setHtmlTitle()
    },
  },
  created() {
    this.setHtmlTitle()
    enquireScreen((isMobile) => this.$store.dispatch('app/setDevice', isMobile))
  },
  methods: {
    setHtmlTitle() {
      const meta_title = this.$route.meta.title
      document.title = meta_title ? `${meta_title} - ${title}` : title
    },
  },
}
</script>
