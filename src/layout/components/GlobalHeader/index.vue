<template>
  <header class="layout-header" :class="{ 'fixed-header': fixedHeader }" :style="fixedHeaderStyle">
    <div v-if="isSide || isMobile" class="global-header">
      <span v-if="isMobile" class="logo">
        <img src="@/assets/img/logo.svg" alt="logo" />
      </span>
      <div class="global-header-trigger" @click="handleCollapse">
        <svg-icon :icon-class="sidebar ? 'menu-fold' : 'menu-unfold'" />
      </div>
      <div style="flex: 1 1 0%">
        <breadcrumb v-if="!isMobile"></breadcrumb>
      </div>
      <div class="global-header-right">
        <screenfull class="dropdown-trigger" />
        <setting class="dropdown-trigger" />
        <span class="dropdown-trigger">
          <svg-icon icon-class="refresh-line" @click.native="handleRefresh()" />
        </span>
        <header-avatar class="dropdown-trigger" />
      </div>
    </div>

    <div v-else class="global-header-nav">
      <div class="global-header-nav-main" :class="{ wide: isWide }">
        <div class="global-header-left">
          <div class="logo">
            <img src="@/assets/img/logo.svg" alt="logo" />
            <h1>{{ title }}</h1>
          </div>
        </div>
        <div style="flex: 1 1 0%">
          <header-menu />
        </div>
        <div class="global-header-right">
          <screenfull class="dropdown-trigger" />
          <setting class="dropdown-trigger" />
          <span class="dropdown-trigger">
            <svg-icon icon-class="refresh-line" @click.native="handleRefresh()" />
          </span>
          <header-avatar class="dropdown-trigger" />
        </div>
      </div>
    </div>

    <tags-view v-if="showTagsView" />
  </header>
</template>

<script>
import { title } from '@/config'

import Screenfull from '@/components/Screenfull'
import { mapGetters } from 'vuex'
import Setting from './Setting'
import HeaderAvatar from './HeaderAvatar'
import HeaderMenu from './HeaderMenu'

import Breadcrumb from './Breadcrumb'
import TagsView from './TagsView'

export default {
  components: { Screenfull, Setting, HeaderAvatar, Breadcrumb, TagsView, HeaderMenu },
  data() {
    return {
      title,
    }
  },
  computed: {
    ...mapGetters(['menuType', 'sidebar', 'tagsView', 'wideType', 'fixedHeader', 'isMobile']),
    isSide() {
      return this.menuType === 'side'
    },
    isWide() {
      return this.menuType === 'head' && this.wideType === 'wide'
    },
    sideMenuWidth() {
      return this.sidebar ? '208px' : '48px'
    },
    fixedHeaderStyle() {
      return {
        padding: 0,
        width: this.isSide && this.fixedHeader && !this.isMobile ? `calc(100% - ${this.sideMenuWidth})` : '100%',
        height: this.showTagsView ? '96px' : null,
        zIndex: 9,
        right: this.fixedHeader ? 0 : null,
      }
    },
    showTagsView() {
      return this.isSide && this.tagsView
    },
  },
  created() {},
  methods: {
    handleRefresh() {
      // localStorage.clear()
      // sessionStorage.clear()
    },
    handleCollapse() {
      if (this.isMobile) {
        this.$emit('onShowSideMenuDrawer')
      } else {
        this.$store.dispatch('setting/setSideBar')
      }
    },
  },
}
</script>
