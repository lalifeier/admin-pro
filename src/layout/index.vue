<template>
  <div class="layout" :class="isMobile ? '' : 'layout-has-side'">
    <el-drawer
      v-if="isMobile"
      :visible.sync="showSideMenuDrawer"
      direction="ltr"
      :modal-append-to-body="true"
      :show-close="false"
      size="208px"
    >
      <side-menu></side-menu>
    </el-drawer>
    <template v-else>
      <side-menu v-if="isSide"></side-menu>
    </template>

    <section class="layout">
      <section class="layout" :style="rightStyle">
        <header class="layout-header" :style="fixedHeaderStyle" v-if="fixedHeader"></header>
        <global-header @onShowSideMenuDrawer="handleShowSideMenuDrawer"></global-header>
        <main class="layout-main">
          <app-main></app-main>
        </main>
        <footer class="layout-footer">
          <global-footer></global-footer>
        </footer>
      </section>
    </section>
    <el-backtop />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import GlobalHeader from './components/GlobalHeader'
import GlobalFooter from './components/GlobalFooter'
import SideMenu from './components/SideMenu'
import AppMain from './components/AppMain'
export default {
  components: { GlobalHeader, GlobalFooter, SideMenu, AppMain },
  computed: {
    ...mapGetters([
      'isMobile',
      'menuType',
      'sidebar',
      'tagsView',
      'wideType',
      'fixedHeader',
      'fixedSide'
    ]),
    isSide () {
      return this.menuType === 'side'
    },
    isWide () {
      return this.menuType === 'head' && this.wideType === 'wide'
    },
    sideMenuWidth () {
      return this.sidebar ? '208px' : '48px'
    },
    rightStyle () {
      return {
        position: 'relative',
        paddingLeft: (this.isSide && this.fixedSide && !this.isMobile) ? this.sideMenuWidth : null
      }
    },
    fixedHeaderStyle () {
      return {
        padding: 0,
        width: (this.isSide && this.fixedHeader && !this.isMobile) ? `calc(100% - ${this.sideMenuWidth})` : '100%',
        height: this.showTagsView ? '96px' : null,
        zIndex: 9,
        right: this.fixedHeader ? 0 : null
      }
    },
    showTagsView () {
      return this.isSide && this.tagsView
    }
  },
  watch: {
    isMobile () {
      if (this.isMobile) {
        this.showSideMenuDrawer = false
      }
    }
  },
  data () {
    return {
      showSideMenuDrawer: false
    }
  },
  methods: {
    handleShowSideMenuDrawer () {
      if (!this.sidebar) {
        this.$store.dispatch('setting/setSideBar')
      }
      if (this.isMobile) {
        this.showSideMenuDrawer = !this.showSideMenuDrawer
      }
    }
  }
}
</script>
