<template>
  <div>
    <div class="logo">木子亮</div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <router-link to="/">
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">控制台</span>
        </el-menu-item>
      </router-link>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span>管理</span>
        </template>
        <router-link to="/article">
          <el-menu-item index="1-2">文章</el-menu-item>
        </router-link>
        <router-link to="/label">
          <el-menu-item index="1-1">标签</el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navmenu",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.logo {
  width: 100%;
  font-size: 24px;
  line-height: 60px;
  text-align: center;
  color: #ffd04b;
}
</style>