<template>
  <div @click="showSettingDrawer = true">
    <svg-icon icon-class="palette" />
    <el-drawer
      title="主题设置"
      size="300px"
      direction="rtl"
      :visible.sync="showSettingDrawer"
      append-to-body
      :show-close="true"
    >
      <div class="setting-container">
        <setting-item title="整体风格设置">
          <img-checkbox-group
            :default-values="[theme.mode]"
            @change="values => handleTheme({ ...theme, mode: values[0] })"
          >
            <img-checkbox
              title="暗色菜单风格"
              :img="require('../../../../assets/img/dark.svg')"
              value="dark"
            />
            <img-checkbox
              title="亮色菜单风格"
              :img="require('../../../../assets/img/light.svg')"
              value="light"
            />
            <!-- <img-checkbox title="深夜风格" :img="require('../../../../assets/img/night.svg')" value="night" /> -->
          </img-checkbox-group>
        </setting-item>
        <setting-item title="主题色">
          <color-checkbox-group :defaultValues="[theme.color]" @change="handleChangeThemeColor">
            <color-checkbox v-for="(color, index) in palettes" :key="index" :value="color" />
          </color-checkbox-group>
        </setting-item>
        <el-divider></el-divider>
        <setting-item title="导航栏模式">
          <div class="setting-checkbox">
            <img-checkbox-group
              :default-values="[menuType]"
              @change="values => handleMenuType(values[0])"
            >
              <img-checkbox
                title="侧边导航"
                :img="require('../../../../assets/img/side.svg')"
                value="side"
              />
              <img-checkbox
                title="顶部导航"
                :img="require('../../../../assets/img/head.svg')"
                value="head"
              />
              <!-- <img-checkbox title="混合导航" :img="require('../../../../assets/img/mix.svg')" value="mix" /> -->
            </img-checkbox-group>
          </div>
        </setting-item>
        <el-divider></el-divider>
        <div class="setting-list">
          <div class="setting-list-item">
            <span>内容区域宽度</span>
            <el-select :value="wideType" style="width: 100px;" size="mini" @change="changeWideType">
              <el-option value="wide" label="固定" v-if="menuType === 'head'"></el-option>
              <el-option value="flow" label="流式"></el-option>
            </el-select>
          </div>
          <div class="setting-list-item">
            <span>是否开启多页签</span>
            <el-switch
              :value="tagsView"
              :disabled="menuType === 'head'"
              @change="changeTagsView"
            ></el-switch>
          </div>
          <div class="setting-list-item">
            <span>固定Header</span>
            <el-switch :value="fixedHeader" @change="changeFixedHeader"></el-switch>
          </div>
          <div class="setting-list-item">
            <span>固定侧边栏</span>
            <el-switch
              :value="fixedSide"
              :disabled="menuType === 'head'"
              @change="changeFixedSide"
            ></el-switch>
          </div>
        </div>
        <el-divider></el-divider>
        <setting-item title="页面切换动画">
          <div class="setting-list">
            <div class="setting-list-item">
              <span>禁用动画</span>
              <el-switch
                :value="animate.disabled"
              @change="val => handleChangeAnimate({...animate, disabled: val})"
              ></el-switch>
            </div>
            <div class="setting-list-item">
              <span>动画效果</span>
              <el-select :value="animate.name" style="width: 100px;" size="mini"   @change="val => handleChangeAnimate({...animate, name: val})">
                <el-option v-for="(item,index) in animates" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
             <div class="setting-list-item">
              <span>动画方向</span>
              <el-select :value="animate.direction" style="width: 100px;" size="mini" @change="val => handleChangeAnimate({...animate, direction: val})">
                <el-option v-for="(item,index) in directions" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </div>
        </setting-item>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  ImgCheckbox,
  ImgCheckboxGroup,
  ColorCheckbox,
  ColorCheckboxGroup
} from '@/components/checkbox'
import SettingItem from './SettingItem'
import { mapGetters } from 'vuex'

import { PALETTES, ANIMATES } from '@/utils/constants'

import { changeColor } from '@/utils/themeColorClient'

export default {
  components: { SettingItem, ImgCheckbox, ImgCheckboxGroup, ColorCheckbox, ColorCheckboxGroup },
  data () {
    return {
      showSettingDrawer: false,
      palettes: PALETTES,
      animates: ANIMATES
    }
  },
  computed: {
    ...mapGetters([
      'theme',
      'menuType',
      'tagsView',
      'wideType',
      'fixedHeader',
      'fixedSide',
      'animate'
    ]),
    isAside () {
      return this.menuType === 'side'
    },
    directions () {
      return this.animates.find(item => item.value === this.animate.name).directions
    }
  },
  methods: {
    handleTheme (val) {
      this.$store.dispatch('setting/setTheme', val)
    },
    handleMenuType (type) {
      this.$store.dispatch('setting/setMenuType', type)
      this.changeWideType(this.isAside ? 'flow' : 'wide')
      // if (type === 'header') {}
    },
    changeWideType (type) {
      this.$store.dispatch('setting/setWideType', type)
    },
    changeTagsView (val) {
      this.$store.dispatch('setting/setTagsView')
    },
    changeFixedHeader (val) {
      this.$store.dispatch('setting/setFixedHeader', val)
    },
    changeFixedSide (val) {
      this.$store.dispatch('setting/setFixedSide', val)
    },
    handleChangeThemeColor (values) {
      const color = values[0]
      changeColor(color)
      this.handleTheme({ ...this.theme, color })
    },
    handleChangeAnimate (val) {
      this.$store.dispatch('app/setAnimate', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-container {
  padding: 0 24px;

  .setting-list {
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 1.5715;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
    }
  }
}
</style>
