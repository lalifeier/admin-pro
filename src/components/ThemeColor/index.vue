
<template>
  <el-color-picker
    v-model="themeColor"
    :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script>
import { mapGetters } from 'vuex'

import { changeColor } from '@/utils/themeColorClient'

export default {
  computed: {
    ...mapGetters(['theme'])
  },
  data () {
    return {
      themeColor: ''
    }
  },
  created () {
    this.themeColor = this.theme.color
  },
  watch: {
    themeColor (val) {
      changeColor(val)
    }
  }
}
</script>

<style>
  .theme-message,
  .theme-picker-dropdown {
    z-index: 99999 !important;
  }

  .theme-picker .el-color-picker__trigger {
    width: 26px !important;
    height: 26px !important;
    padding: 2px;
  }

  .theme-picker-dropdown .el-color-dropdown__link-btn {
    display: none;
  }
</style>
