<template>
  <div style="display: flex">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ImgCheckboxGroup',
  provide() {
    return {
      groupContext: this,
    }
  },
  props: {
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    defaultValues: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      options: [],
      values: [],
    }
  },
  watch: {
    values(value) {
      this.$emit('change', value)
    },
  },
  methods: {
    handleChange(option) {
      if (option.checked) {
        if (this.multiple) {
          this.values.push(option.value)
        } else {
          this.values = [option.value]
          this.options.forEach((item) => {
            if (item.value !== option.value) {
              item.isChecked = false
            }
          })
        }
      } else if (this.values.includes(option.value)) {
        this.values = this.values.filter((item) => item !== option.value)
      }
    },
  },
}
</script>

<style></style>
