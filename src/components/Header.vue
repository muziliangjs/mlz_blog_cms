<template>
  <div class="header">
    <div class="login-state">
      退出
    </div>
  </div>
</template>

<script>
export default {
  name: "mheader"
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
  }
}
</style>