<template>
   <el-dialog title="会员等级管理"
            :before-close="beforeClose"
            :visible.sync="levelVisible"
            :modal-append-to-body='false'
            width='500px'>
      <el-form :model="levelForm" ref="levelForm" :rules="rules" >
         <el-form-item label="普通会员" prop="ordinary">
          <el-input-number v-model="levelForm.ordinary.levelPoint"  placeholder="请输入积分范围" 
          :step="1" :min="0" :max=' Number(levelForm.silver.levelPoint)-1' style="width:250px"></el-input-number>
          <span>&nbsp;&nbsp;折扣：{{levelForm.ordinary.discount*10}}折</span>
        </el-form-item>
        <el-form-item label="白银会员" prop="silver">
          <el-input-number v-model="levelForm.silver.levelPoint"  placeholder="请输入积分范围" 
          :step="1" :min=" Number(levelForm.ordinary.levelPoint)" :max='Number(levelForm.gold.levelPoint)-1' style="width:250px"></el-input-number>
          <span>&nbsp;&nbsp;折扣：{{levelForm.silver.discount*10}}折</span>
        </el-form-item>
        <el-form-item label="黄金会员" prop="gold">
          <el-input-number v-model="levelForm.gold.levelPoint"  placeholder="请输入积分范围" 
          :step="1" :min=" Number(levelForm.silver.levelPoint)" :max='Number(levelForm.platinum.levelPoint)-1' style="width:250px"></el-input-number>
          <span>&nbsp;&nbsp;折扣：{{levelForm.gold.discount*10}}折</span>
        </el-form-item>
        <el-form-item label="白金会员" prop="platinum">
          <el-input-number v-model="levelForm.platinum.levelPoint"  placeholder="请输入积分范围" 
          :step="1" :min=" Number(levelForm.gold.levelPoint)" :max='Number(levelForm.jewel.levelPoint)-1' style="width:250px"></el-input-number>
          <span>&nbsp;&nbsp;折扣：{{levelForm.platinum.discount*10}}折</span>
        </el-form-item>
        <el-form-item label="钻石会员" prop="jewel">
          <el-input-number v-model="levelForm.jewel.levelPoint"  placeholder="请输入积分范围" 
          :step="1" :min=" Number(levelForm.platinum.levelPoint) " :max='Number(levelForm.super.levelPoint)-1' style="width:250px"></el-input-number>
          <span>&nbsp;&nbsp;折扣：{{levelForm.jewel.discount*10}}折</span>
        </el-form-item>
        <el-form-item label="超级会员" prop="super">
          <el-input-number v-model="levelForm.super.levelPoint"  placeholder="请输入积分范围" 
          :step="1" :min="Number(levelForm.jewel.levelPoint)" style="width:250px"></el-input-number>
          <span>&nbsp;&nbsp;折扣：{{levelForm.super.discount*10}}折</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="formSubmit" :loading="submitLoading">确定</el-button>
      </span>
    </el-dialog>
</template>

<script>
import { getLevelInfo,editLevel } from "../../api/user";
export default {
  data(){
    return{
      levelVisible:true,
      submitLoading:false,
      levelForm:{
        ordinary:{levelPoint:'',discount:''},
        silver:{levelPoint:'',discount:''},
        gold:{levelPoint:'',discount:''},
        platinum:{levelPoint:'',discount:''},
        jewel:{levelPoint:'',discount:''},
        super:{levelPoint:'',discount:''},
      },
      rules:{
        ordinary:[ {required: true, message: '请输入会员积分', trigger: 'blur'}],
        silver:[ {required: true, message: '请输入会员积分', trigger: 'blur'}],
        gold:[ {required: true, message: '请输入会员积分', trigger: 'blur'}],
        platinum:[ {required: true, message: '请输入会员积分', trigger: 'blur'}],
        jewel:[ {required: true, message: '请输入会员积分', trigger: 'blur'}],
        super:[ {required: true, message: '请输入会员积分', trigger: 'blur'}],
      }
    }
  },
  mounted(){
    const that = this;
    getLevelInfo().then((res)=>{
     if(res && res.code === 200){
       that.levelForm = res.data;
     }else{
       this.$message.error(res.msg)
     }
      
    })
  },
  methods:{
    beforeClose() {
      this.cancel();
    },
    cancel() {
      this.levelVisible = false;
      this.submitLoading = false;
      var status = false
      this.$emit('updateStatus',status);
    },
    formSubmit(){
      const that = this;
      that.$refs.levelForm.validate(valid => {
        if (!valid) {
          this.$message.error('请填写完整再保存');
          return false;
        }
        this.submitLoading = true;
        editLevel(that.levelForm).then(res=>{
          if(res&&res.code ===200){
            this.$message.success('修改成功');
          }else{
            this.$message.error(res.msg)
          }
          this.dialogVisible = false;
          this.submitLoading = false;
          var status = false
          that.$emit('updateStatus',status);
        })
      })
    },
  }
}
</script>

<style>

</style>
