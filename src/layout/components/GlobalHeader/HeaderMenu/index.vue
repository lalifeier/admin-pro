<template>
  <div>
    <div class="side-menu side-menu-horizontal" style="height: 48px; overflow: hidden">
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
import { mapGetters } from 'vuex'
import SideMenu from '../../SideMenu/SideMenu'

export default {
  components: { SideMenu },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['theme', 'sidebar', 'fixedSide', 'permission_routes', 'isMobile']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
  },
  methods: {},
}
</script>
