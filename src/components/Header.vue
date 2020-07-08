<template>
  <div class="header">
    <div class="login-state" @click="signout">退出</div>
  </div>
</template>

<script>
import { removeToken } from "@/utils/auth";
export default {
  name: "mheader",
  methods: {
    signout() {
      removeToken();
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  text-align: right;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #f1f1f1;
  .login-state {
    line-height: 60px;
    height: 100%;
    font-size: 15px;
    color: #666666;
    padding-right: 20px;
    cursor: pointer; 
  }
}
</style>