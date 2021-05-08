<template>
  <div class="container">
    <div class="center">
      <div class="title">
        <span>管理系统</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="账号:" prop="user" class="whiteItem">
          <el-input
            type="username"
            v-model="ruleForm.user"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="pass" class="whiteItem">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码:" prop="code" class="whiteItem">
          <div style="display:flex">
            <el-input
              type="code"
              v-model="ruleForm.code"
              autocomplete="off"
              style="width: 220px"
            ></el-input>
            <div @click="changecode()" v-html="imgcode"></div>
          </div>
        </el-form-item>
        <!-- <el-form-item label="确认密码:" prop="checkPass" class="whiteItem">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login, getCode } from "../api/api";
import { mapMutations } from "vuex";
export default {
  data() {
    var validateuser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      ruleForm: {
        pass: "",
        // checkPass: "",
        user: "",
        code: "",
      },
      imgcode: "",
      rules: {
        user: [{ validator: validateuser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
    this.changecode();
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          let params = {
            username: this.ruleForm.user,
            password: this.ruleForm.pass,
            code:this.ruleForm.code
          };
          login(params)
            .then((res) => {
              console.log(res);
              if (res.success) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                let userToken = "Bearer " + res.token;
                this.changeLogin({ Authorization: userToken });
                this.$router.push("/home-page");
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => console.log(err));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changecode() {
      getCode().then((res) => {
        console.log(res);
        if (res.success) {
          console.log(res);
          this.imgcode = res.img;
        }
      });
    },
  },
};
</script>

<style lang="less">
.container {
  width: 100%;
  height: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
  background: url(../../public/1.jpeg) 50% center / 100% no-repeat
    rgb(240, 242, 245);
  .center {
    width: 400px;
    height: 360px;
    border: 1px solid #eee;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      color: #ffffff;
      font-size: 27px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .demo-ruleForm {
      width: 100%;
      .whiteItem {
        .el-form-item__label {
          color: #ffffff;
        }
      }
    }
  }
}
</style>