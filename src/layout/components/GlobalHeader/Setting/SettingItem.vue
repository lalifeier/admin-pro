<template>
  <div class="setting-item">
    <h3 class="title">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SettingItem',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.setting-item {
  margin-bottom: 24px;

  .title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
