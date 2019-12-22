<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <el-card>
        <div slot="header" class="el-card-title">
          <!-- 新增链接 -->
          <el-button type="success" class="modify-btn right-btn" size="small"
                    @click.native="updatePasswordHandle()">修改密码</el-button>
          <div class="msg-box">
            <p >
              <b>用户名：</b>
              <span>admin</span>
            </p>
            <p >
              <b>手机号码：</b>
              <span>158920888999</span>
            </p>
            <p >
              <b>创建时间：</b>
              <span>3222333</span>
            </p>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <el-form :model="dataForm" :rules="rules" ref="dataForm" label-width="80px">
        <el-form-item label="账号">
          <span>{{ userName }}</span>
        </el-form-item>
        <el-form-item label="原密码" prop="password">
          <el-input type="password" v-model="dataForm.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="dataForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="dataForm.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HeadTop from "../../components/headTop";

export default {
  data(){
    const validateComfirmPassword = (rule, value, callback) => {
      const msg = (!/\S/.test(value) && '确认密码不能为空') ||
        ((this.dataForm.newPassword !== value) && '确认密码与密码输入不一致');
      if (msg) return callback(new Error(msg));
      callback();
    };
    return{
      dialogVisible:false,
      userName:'admin',
      dataForm:{
        password:'',
        newPassword:'',
        confirmPassword:''
      },
      rules:{
        password: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
        newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
        confirmPassword: [{ validator: validateComfirmPassword, trigger: 'blur' }]
      },
    }
  },
  components: {
    HeadTop,
  },
  methods:{
    updatePasswordHandle(){
      this.dialogVisible = true;
    },
     // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          this.$message.error('请填写完整再保存');
          return false;
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .msg-box {
    b {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
    span {
      margin-left: 20px;
    }
  }
  .right-btn{
    float: right;
    margin-left: 10px;
  }
</style>