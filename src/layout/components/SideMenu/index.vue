<template>
  <aside class="layout-side" :class="{ 'fixed-side': fixedSide }" :style="sideStyle">
    <div class="layout-side-children">
      <div class="logo" :class="{ 'aside-logo-collapsed': !sidebar }">
        <img src="@/assets/img/logo.svg" alt="logo" />
        <transition name="zoom-in">
          <h1 v-show="sidebar">{{ title }}</h1>
        </transition>
      </div>
      <div class="side-menu side-menu-vertical">
        <el-menu
          :router="false"
          :default-active="activeMenu"
          :collapse="!sidebar"
          mode="vertical"
          :unique-opened="false"
          :collapse-transition="false"
        >
          <side-menu
            v-for="route in permission_routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          ></side-menu>
        </el-menu>
      </div>
      <div v-if="!isMobile" class="side-links">
        <svg-icon :icon-class="sidebar ? 'menu-fold' : 'menu-unfold'" @click="handleCollapse" />
      </div>
    </div>
  </aside>
</template>

<script>
// import variables from '@/styles/variables.scss'

import { title } from '@/config'

import { mapGetters } from 'vuex'
import SideMenu from './SideMenu'

export default {
  components: { SideMenu },
  data() {
    return {
      isCollapse: true,
      title,
    }
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
    sideStyle() {
      const width = this.sidebar ? 208 : 48
      return {
        flex: `0 0 ${width}px`,
        maxWidth: `${width}px`,
        minWidth: `${width}px`,
        width: `${width}px`,
      }
    },
  },
  methods: {
    handleCollapse() {
      this.$store.dispatch('setting/setSideBar')
    },
  },
}
</script>
