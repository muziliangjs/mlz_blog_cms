<template>
  <el-container class="layout">
    <el-aside width="200px" style="background:#545c64">
      <nav-menu></nav-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- <breadcrumb></breadcrumb> -->
        <m-header style="padding:0;"></m-header>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <!-- <el-footer>
        <m-footer></m-footer>
      </el-footer> -->
    </el-container>
  </el-container>
</template>

<script>
// import Breadcrumb from "../components/Breadcrumb";
// import Footer from "../components/Footer";
import Header from "../components/Header";
import NavMenu from "../components/NavMenu";
export default {
  name: "default",
  components: {
    // Breadcrumb,
    // mFooter: Footer,
    mHeader: Header,
    NavMenu
  }
};
</script>

<style>
.layout {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.el-menu {
  border: none !important;
}
.el-header {
  padding: 0 !important;
}
</style>