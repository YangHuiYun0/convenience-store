<template>
  <div class="body">
    <div class="title">
       新一家便利店销售系统
    </div>
    <div class="form">
       	<el-form :model="loginForm" :rules="rules" ref="loginForm">
			 <el-form-item prop="username">
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="password">
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                    autoComplete="on" placeholder="password"></el-input>
        </el-form-item>
         <el-button type="primary" @click.native.prevent="handleLogin" 
        style=" backgroundColor: #76b852; borderColor: #76b852;width:450px">登录</el-button>
				</el-form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loginForm:{
        username:'',
        password:'',
      },
      rules:{
        username: [{ required: true, trigger: 'blur', message: '请输入平台账号' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      }
    }
  },
  methods:{
    handleLogin(){
       this.$refs.loginForm.validate(valid => {
        if (!valid) return false;
        this.$message({
          type: 'success',
          message: '登录成功'
        });
				this.$router.push('main')
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.body {
	background: #76b852;
  background: -webkit-linear-gradient(right, #76b852, #8DC26F);
	background: -moz-linear-gradient(right, #76b852, #8DC26F);
	background: -o-linear-gradient(right, #76b852, #8DC26F);
	background: linear-gradient(to left, #76b852, #8DC26F);
  width: 100%;
  height: 100vh
}
.title{
  text-align: center;
  margin: 150px auto 15px;
  Font-family: '楷体',Arial;
  position: absolute;
  font-size: 34px;
  width: 400px;
  top: 10px;
  left: 52%;
  margin-left: -200px;
}
.login-page{
  margin: 0 auto;
}
.form{
  	position: absolute;
    z-index: 1;
    background: #FFFFFF;
    width: 460px;
    top: 250px;
    left: 50%;
    margin-left: -230px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    border-radius: 45px 0px 35px 0px;
}
</style>
