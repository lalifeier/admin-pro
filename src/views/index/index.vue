<template>
  <div class="sys-color primary">
    <p>Hello world</p>
    <section>
      <p>Hello world</p>
    </section>
    <section class="theme-dark">
      <p>Hello world</p>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/styles/themes/theme/inject.scss';

p {
  color: var(--primary);
  text-align: center;
}

section {
  margin: 10px;
  border: 1px solid var(--border-color);
}
</style>
