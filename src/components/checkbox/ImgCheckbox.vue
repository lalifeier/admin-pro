<template>
  <el-tooltip :content="title" effect="dark" placement="top">
    <div class="img-checkbox-item" @click="toggle">
      <img :src="img" />
      <svg-icon v-if="isChecked" class="img-checkbox-selectIcon" icon-class="check-mark"></svg-icon>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  name: 'ImgCheckbox',
  inject: ['groupContext'],
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    img: {
      type: String,
      required: true,
      default: '',
    },
    value: {
      type: String,
      required: true,
      default: '',
    },
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isChecked: this.initChecked(),
    }
  },
  watch: {
    isChecked() {
      const option = {
        value: this.value,
        checked: this.isChecked,
      }
      this.$emit('change', option)
      const groupContext = this.groupContext
      if (groupContext) {
        groupContext.handleChange(option)
      }
    },
  },
  created() {
    const groupContext = this.groupContext
    if (groupContext) {
      this.isChecked =
        groupContext.defaultValues.length > 0 ? groupContext.defaultValues.includes(this.value) : this.isChecked
      groupContext.options.push(this)
    }
  },
  methods: {
    toggle() {
      if (this.groupContext.multiple || !this.isChecked) {
        this.isChecked = !this.isChecked
      }
    },
    initChecked() {
      const groupContext = this.groupContext
      if (!groupContext) {
        return this.checked
      } else if (groupContext.multiple) {
        return groupContext.defaultValues.includes(this.value)
      } else {
        return groupContext.defaultValues[0] === this.value
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.img-checkbox-item {
  position: relative;
  margin-right: 16px;
  border-radius: 4px;
  cursor: pointer;

  .img-checkbox-selectIcon {
    position: absolute;
    right: 10px;
    bottom: 15px;
    color: #1890ff;
    font-weight: 700;
    font-size: 14px;
  }
}
</style>
