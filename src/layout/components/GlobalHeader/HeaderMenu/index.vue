<template>
  <div>
    <div class="side-menu side-menu-horizontal" style="height: 48px; overflow: hidden;">
      <el-menu :router="false" :default-active="activeMenu" mode="horizontal" style="">
        <side-menu
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></side-menu>
      </el-menu>
    </div>
  </div>
</template>

<script>

import SideMenu from '../../SideMenu/SideMenu'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  components: { SideMenu },
  computed: {
    ...mapGetters(['theme', 'sidebar', 'fixedSide', 'permission_routes', 'isMobile']),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {}
}
</script>
