<template>
  <div class="tags-view-container tags-view-container-smart">
    <el-tabs
      v-model="activeTag"
      closable
      @tab-click="handleClickTag"
      @tab-remove="handleRemoveTag"
      @contextmenu.prevent.native="openContextMenu($event)"
    >
      <el-tab-pane v-for="item in visitedViews" :key="item.path" :label="item.title" :name="item.path"> </el-tab-pane>
    </el-tabs>

    <ul v-show="contextMenuVisible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag">刷新</li>
      <li @click="closeSelectedTag">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import path from 'path'
import { mapGetters } from 'vuex'

export default {
  name: 'TagsView',
  data() {
    return {
      selectedTag: {},
      affixTags: [],
      activeTag: '',
      contextMenuVisible: false,
      top: 0,
      left: 0,
    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'visitedViews']),
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    contextMenuVisible(value) {
      if (this.contextMenuVisible) {
        document.body.addEventListener('click', this.closeContextMenu)
      } else {
        document.body.removeEventListener('click', this.closeContextMenu)
      }
    },
  },
  mounted() {
    this.initTags()
    this.addTags()
    this.moveToCurrentTag()
  },
  methods: {
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, path.resolve(basePath, route.path))
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      this.affixTags = this.filterAffixTags(this.permission_routes)
      for (const tag of this.affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { path } = this.$route
      if (path) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
    },
    moveToCurrentTag() {
      const { path } = this.$route
      this.$nextTick(() => {
        this.activeTag = path
      })
    },
    handleClickTag(tag) {
      this.$router.push({ path: tag.name })
    },
    openContextMenu(e) {
      this.selectedTag = this.visitedViews.filter((item) => item.path === this.activeTag)[0]
      this.left = e.clientX
      this.top = e.clientY
      this.contextMenuVisible = true
    },
    closeContextMenu() {
      this.contextMenuVisible = false
    },
    handleRemoveTag(tag) {
      const view = this.visitedViews.filter((item) => item.path === tag)[0]
      this.$store.dispatch('tagsView/delView', view)
    },
    closeSelectedTag() {
      this.$store.dispatch('tagsView/delView', this.selectedTag)
    },
    refreshSelectedTag() {
      this.$store.dispatch('tagsView/delCachedView', this.selectedTag).then(() => {
        this.$router.push('/refresh')
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag)
    },
    closeAllTags() {
      this.$store.dispatch('tagsView/delAllViews')
      this.$router.push({ name: 'index' })
    },
  },
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 48px;
  padding: 0 20px;
  background: #fff;

  .contextmenu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3000;
    padding: 5px 0;
    color: rgba(0, 0, 0, 0.65);
    font-weight: 400;
    font-size: 14px;
    list-style-type: none;
    background: #fff;
    border: 1px solid #cfd7e5;
    border-radius: 2px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

    li {
      margin: 0;
      padding: 9px 16px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 1.2em;
      cursor: pointer;

      &:hover {
        color: #1089ff;
        background: #e7f3ff;
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view-container {
  &-smooth {
    .el-tabs__item {
      height: 38px;
      margin-top: 6px;
      margin-right: -18px;
      padding: 0 30px 0 30px;
      line-height: 38px;
      mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      mask-size: 100% 100%;

      .el-icon-close {
        display: none;
      }

      &.is-active {
        color: #1890ff;
        background: #e8f4ff;

        &:hover {
          color: #1890ff;
          background: #e8f4ff;
        }

        .el-icon-close {
          display: inline-block;
        }
      }

      &:hover {
        color: #515a6e;
        background: #dee1e6;

        .el-icon-close {
          display: inline-block;
        }
      }
    }

    .el-tabs--top .el-tabs__item.is-top:nth-child(2),
    .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
    .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
    .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2) {
      padding-left: 30px;
    }

    .el-tabs--top .el-tabs__item.is-top:last-child,
    .el-tabs--top .el-tabs__item.is-bottom:last-child,
    .el-tabs--bottom .el-tabs__item.is-top:last-child,
    .el-tabs--bottom .el-tabs__item.is-bottom:last-child {
      padding-right: 30px;
    }
  }

  &-smart {
    .el-tabs__item {
      height: 34px;
      margin-right: 5px;
      line-height: 34px;

      .el-icon-close {
        display: none;
      }

      &.is-active {
        color: #1890ff;
        background: #e8f4ff;

        .el-icon-close {
          display: inline-block;
        }

        &::after {
          width: 100%;
        }
      }

      &:hover {
        color: #1890ff;
        background: #e8f4ff;
        cursor: pointer;

        .el-icon-close {
          display: inline-block;
        }
      }

      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #1890ff;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s, color 0.1s, font-size 0s;
        content: '';
      }

      &:hover::after {
        width: 100%;
      }
    }

    .el-tabs--top .el-tabs__item.is-top:nth-child(2),
    .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
    .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
    .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2) {
      padding-left: 20px;
    }

    .el-tabs--top .el-tabs__item.is-top:last-child,
    .el-tabs--top .el-tabs__item.is-bottom:last-child,
    .el-tabs--bottom .el-tabs__item.is-top:last-child,
    .el-tabs--bottom .el-tabs__item.is-bottom:last-child {
      padding-right: 20px;
    }
  }

  .el-tabs__active-bar {
    background-color: transparent;
  }

  .el-tabs__nav-wrap::after {
    background-color: transparent;
  }
}
</style>
