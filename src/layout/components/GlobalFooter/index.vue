<template>
  <footer class="global-footer">
      <div class="links">
        <a target="_blank" :href="github">
          <svg-icon slot="prefix" icon-class="github" />
        </a>
      </div>
      <div class="copyright">
        Copyright
        <svg-icon slot="prefix" icon-class="copyright" />
        2021 后台管理系统
      </div>
  </footer>
</template>

<script>
import { github } from '@/config'

export default {
  data () {
    return {
      github
    }
  }
}
</script>
