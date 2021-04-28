<template>
  <div class="theme-color" :style="{ backgroundColor: value }" @click="toggle">
    <svg-icon v-if="isChecked" icon-class="check-mark"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'ColorCheckbox',
  inject: ['groupContext'],
  props: {
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
        color: this.color,
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
.theme-color {
  float: left;
  width: 20px;
  height: 20px;
  margin-top: 8px;
  margin-right: 8px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
}
</style>
