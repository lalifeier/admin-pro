<template>
  <div>
    <global-transition :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </global-transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import GlobalTransition from '@/components/transition'

export default {
  components: { GlobalTransition },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['animate']),
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.path
    }
  },
  methods: {}
}
</script>

<style></style>
