<template>
  <div id="register-page">
    <el-form
      :model="registerForm"
      status-icon
      :rules="rules"
      ref="registerForm"
      label-position="left"
      label-width="80px"
      class="register-container"
    >
    <h1 class="register_title">注&nbsp;&nbsp;&nbsp;&nbsp;册</h1>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="registerForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="registerForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="pass">
        <el-input
          type="password"
          v-model="registerForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          type="text"
          v-model="registerForm.email"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="btnGroup">
          <el-button
            class="btn_items"
            type="primary"
            @click="submitForm('registerForm')"
            v-loading="loading"
            >提交</el-button
          >
          <el-button
            class="btn_items"
            type="danger"
            @click="resetForm('registerForm')"
            >重置</el-button
          >
          <el-button class="btn_items" @click="goBack">返回</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from "@/api/register.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPassword !== "") {
          this.$refs.registerForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        userName: "",
        password: "",
        pass: "",
        email: "",
      },
      rules: {
        userName: [
          { required: true, message: "用户名不能为空！", trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        pass: [{ required: true, validator: validatePass2, trigger: "blur" }],
        email: [{ required: true, message: "邮箱不能为空！", trigger: "blur" }],
      },
      loading: false,
    };
  },
  methods: {
    submitForm(registerForm) {
      let _this = this;
      this.$refs[registerForm].validate((valid) => {
        this.loading = true; // 提交按钮显示加载动画
        if (valid) {
          register({
            username: _this.registerForm.userName,
            password: _this.registerForm.password,
            email: _this.registerForm.email,
          }).then((res) => {
            // 当收到后端的响应时执行该括号内的代码，res 为响应信息，也就是后端返回的信息
            if (res.data.code === "0") {
              // 当响应的编码为 0 时，说明注册成功
              // 显示后端响应的成功信息
              this.$message({
                message: res.data.msg,
                type: "success",
              });
              setTimeout(() => {
                _this.$router.push("/login");
              }, 2000);
            } else if (res.data.code === "401") {
              this.$message({
                message: res.data.msg,
                type: "success",
              });
              setTimeout(() => {
                _this.$router.push("/login");
              }, 2000);
            } else {
              // 当响应的编码不为 0 时，说明注册失败
              // 显示后端响应的失败信息
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
            // 不管响应成功还是失败，收到后端响应的消息后就不再让登录按钮显示加载动画了
            _this.loading = false;
            console.log(res);
          });
        } else {
          // 如果账号或密码有一个没填，就直接提示必填，不向后端请求
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    resetForm(registerForm) {
      this.$refs[registerForm].resetFields();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
#register-page {
  background: url("../assets/bg2.jpeg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  display: flex;
  align-items: center;
  color: #eaeaea;
}
.register-container {
  border-radius: 15px;
  background-clip: padding-box;
  /* margin-top: 15%; */
  margin-left: 65%;
  width: 18%;
  min-width: 300px;
  padding: 35px 35px 15px 35px;
  background: rgba(0, 18, 37, 0.6);
}

.register_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #eaeaea;
}

.btnGroup {
  display: flex;
  justify-content: space-between;
}

.btn_items {
  width: 30%;
}
</style>

<style>
.el-form-item__label {
  color: #eaeaea !important;
}
</style>