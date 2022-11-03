<template>
  <div id="login-page">
    <el-form
      :model="loginForm"
      class="login-container demo-ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="0px"
    >
      <h1 class="login_title">欢迎登录</h1>
      <el-form-item prop="userName">
        <el-input
          type="text"
          v-model="loginForm.userName"
          auto-complete="off"
          placeholder="账号"
          prefix-icon="el-icon-user"
          style="fontsize: 18px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          prefix-icon="el-icon-lock"
          show-password
          placeholder="密码"
          style="fontsize: 18px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div
          style="
            width: 100%;
            display: flex;
            justifyContent: space-between;
          "
        >
          <el-button
            type="primary"
            style="width: 55%; height: 50px; fontsize: 18px; border: none"
            @click="userLogin('ruleForm')"
            v-loading="loading"
            >登录</el-button
          >
          <router-link
            to="/register"
            style="
              display: inline-block;
              width: 35%;
              height: 50px;
              fontsize: 18px;
              border: none;
            "
          >
            <el-button type="warning" style="width:100%;height: 50px;" @click="userRegister">注册</el-button>
          </router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/login.js";
export default {
  name: "Login",
  data() {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        callback(new Error("用户名不能为空"));
      } else {
        if (!/^[a-zA-Z]\w{4,9}$/.test(value)) {
          callback(new Error("请输入5-10个字符"));
        } else {
          callback();
        }
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        if (!/^[0-9]\d{5,9}$/.test(value)) {
          callback(new Error("请输入6-10个数字"));
        } else {
          callback();
        }
      }
    };
    return {
      loginForm: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [{ validator: checkUser, trigger: "blur" }],
        password: [{ validator: checkPass, trigger: "blur" }],
      },
      responseResult: [],
      loading: false,
    };
  },
  methods: {
    userLogin(ruleForm) {
      let _this = this;
      this.$refs[ruleForm].validate((valid) => {
        _this.loading = true;
        if (valid) {
          login({
            username: _this.loginForm.userName,
            password: _this.loginForm.password,
          }).then((res) => {
            if (res.data.code === "0") {
              let data = res.data.data;
              let token = data.token;
              let user = data.user;
              //存储token
              _this.$store.commit("SET_TOKENN", token);
              //存储user，优雅一点的做法是token和user分开获取
              _this.$store.commit("SET_USER", user);
              this.$router.push("/home");
              // var path = this.$route.query.redirect;
              // _this.$router.push({
              //   path: path === "/home" || path === undefined ? "/home" : path,
              // });
              _this.$message({
                message: res.data.msg,
                type: "success",
              });
            } else {
              _this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
            _this.loading = false;
          });
        } else {
          this.loading = false;
          return false;
        }
      });
    },
    userRegister() {},
  },
};
</script>

<style scoped>
#login-page {
  /* background-color: aquamarine; */
  background: url("../assets/bg2.jpeg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  display: flex;
  align-items: center;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  /* margin-top: 15%; */
  margin-left: 65%;
  width: 18%;
  min-width:200px;
  padding: 35px 35px 15px 35px;
  background: rgba(0, 18, 37, 0.6);
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #eaeaea;
}
</style>

<style>
.el-input__inner {
  height: 50px !important;
}
</style>