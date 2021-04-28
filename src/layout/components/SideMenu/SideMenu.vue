<template>
  <div v-if="!item.hidden">
    <template v-if="showChildren(item)">
      <el-submenu :index="resolvePath(item.path)" popper-append-to-body>
        <template slot="title">
          <side-menu-item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title"></side-menu-item>
        </template>
        <side-menu
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(item.path)"
        ></side-menu>
      </el-submenu>
    </template>
    <template v-else>
      <side-menu-link v-if="children.meta" :to="resolvePath(children.path)">
        <el-menu-item :index="resolvePath(children.path)">
          <side-menu-item v-if="children.meta" :icon="children.meta.icon" :title="children.meta.title"></side-menu-item>
        </el-menu-item>
      </side-menu-link>
    </template>
  </div>
</template>

<script>
import path from 'path'
import { validateURL } from '@/utils/validate'
import SideMenuItem from './SideMenuItem'
import SideMenuLink from './SideMenuLink'
export default {
  name: 'SideMenu',
  components: { SideMenuItem, SideMenuLink },
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      children: null,
    }
  },
  methods: {
    showChildren(item) {
      if (item.meta && item.meta.showAlways) {
        return true
      }
      const children = item.children || []
      const _children = children.filter((item) => !item.hidden)
      if (_children.length === 0) {
        this.children = item
      }
      if (_children.length === 1) {
        this.children = _children[0]
      }
      if (_children.length === 0 || (_children.length === 1 && !_children[0].children)) {
        return false
      }
      return true
    },
    resolvePath(routePath) {
      if (validateURL(routePath)) {
        return routePath
      }
      if (validateURL(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
  },
}
</script>
