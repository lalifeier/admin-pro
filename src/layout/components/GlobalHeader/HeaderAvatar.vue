<template>
  <el-dropdown>
    <span class="header-avatar">
      <img
        class="avatar"
        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        alt="avatar"
      />
      <span class="name"> lalifeier</span>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item> <svg-icon icon-class="user" />&nbsp; 个人中心 </el-dropdown-item>
      <el-dropdown-item> <svg-icon icon-class="setting" />&nbsp;个人设置 </el-dropdown-item>
      <el-dropdown-item divided @click.native="handleLogout()">
        <svg-icon icon-class="logout" />&nbsp;退出登录
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'HeaderAvatar',
  methods: {
    handleLogout() {
      this.$confirm('确认退出登录吗？', '注销', () => {
        this.$store.dispatch('user/logout')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.header-avatar {
  display: flex;
  align-items: center;

  .avatar {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    line-height: 24px;
    border-radius: 50%;
  }

  .name {
    font-weight: 500;
  }
}
</style>
