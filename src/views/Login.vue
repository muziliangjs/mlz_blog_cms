<template>
  <div class="login">
    <div class="login-content">
      <div class="login-title">木子亮</div>

      <el-form :rules="rules" label-width="0" :model="ruleForm" ref="ruleForm">
        <el-form-item prop="username">
          <el-input type="text" placeholder="账号" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="submitLoading"
            type="info"
            class="submit-btn"
            @click="submitForm('ruleForm')"
          >立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import service from "@/utils/request";
import { setToken } from "@/utils/auth";
export default {
  data() {
    return {
      submitLoading: false,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleLogin();
        } else {
          return false;
        }
      });
    },
    handleLogin() {
      this.submitLoading = true;
      service.post("/api/user/login", { ...this.ruleForm }).then(res => { 
        this.submitLoading = false;
        if (res.code == 200) {
          setToken(res.data.token);
          this.$router.push({ path: "/" });
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>

<style  scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgb(84, 92, 100);
}
.login-content {
  width: 400px;
  margin: 0 auto;
}
.login-title {
  width: 100%;
  text-align: center;
  padding-bottom: 30px;
  font-size: 30px;
  color: aliceblue;
}
.submit-btn {
  display: block;
  margin: 0 auto;
}
</style>