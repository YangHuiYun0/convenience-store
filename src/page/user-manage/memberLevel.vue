<template>
   <el-dialog title="会员等级管理"
            :before-close="beforeClose"
            :visible.sync="levelVisible"
            :modal-append-to-body='false'
            width='500px'>
      <el-form :model="levelForm" ref="levelForm" :rules="rules" >
         <el-form-item label="普通会员" prop="ordinary">
          <!-- <el-input v-model="levelForm.ordinary" placeholder="请输入积分范围" 
                    clearable style="width:300px"></el-input> -->
          <el-input-number v-model="levelForm.ordinary"  placeholder="请输入积分范围" 
          :step="1" :min="0" :max='levelForm.silver' style="width:300px"></el-input-number>
        </el-form-item>

        <el-form-item label="白银会员" prop="silver">
          <!-- <el-input v-model="levelForm.silver" placeholder="请输入积分范围" 
                    clearable style="width:300px"></el-input> -->
          <el-input-number v-model="levelForm.silver"  placeholder="请输入积分范围" 
          :step="1" :min="levelForm.ordinary" :max='levelForm.gold' style="width:300px"></el-input-number>
        </el-form-item>
        <el-form-item label="黄金会员" prop="gold">
          <!-- <el-input v-model="levelForm.gold" placeholder="请输入积分范围" 
                    clearable style="width:300px"></el-input> -->
          <el-input-number v-model="levelForm.gold"  placeholder="请输入积分范围" 
          :step="1" :min="levelForm.silver" :max='levelForm.platinum' style="width:300px"></el-input-number>
        </el-form-item>
        <el-form-item label="白金会员" prop="platinum">
          <!-- <el-input v-model="levelForm.platinum" placeholder="请输入积分范围"
                    clearable style="width:300px"></el-input> -->
          <el-input-number v-model="levelForm.platinum"  placeholder="请输入积分范围" 
          :step="1" :min="levelForm.gold" :max='levelForm.jewel' style="width:300px"></el-input-number>
        </el-form-item>
        <el-form-item label="钻石会员" prop="jewel">
          <!-- <el-input v-model="levelForm.jewel" placeholder="请输入积分范围" 
                    clearable style="width:300px"></el-input> -->
          <el-input-number v-model="levelForm.jewel"  placeholder="请输入积分范围" 
          :step="1" :min="levelForm.platinum" :max='levelForm.super' style="width:300px"></el-input-number>
        </el-form-item>
        <el-form-item label="超级会员" prop="super">
          <!-- <el-input v-model="levelForm.super" placeholder="请输入积分范围"
                    clearable style="width:300px"></el-input> -->
          <el-input-number v-model="levelForm.super"  placeholder="请输入积分范围" 
          :step="1" :min="levelForm.jewel" style="width:300px"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="formSubmit" :loading="submitLoading">确定</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
  data(){
    return{
      levelVisible:true,
      submitLoading:false,
      levelForm:{
        ordinary:'10',
        silver:'40',
        gold:'100',
        platinum:'200',
        jewel:'400',
        super:'800',
      },
    }
  },
  methods:{
    beforeClose() {
      this.cancel();
    },
    cancel() {
      this.levelVisible = false;
      this.submitLoading = false;
    },
    formSubmit(){
      const that = this;
      that.$refs.levelForm.validate(valid => {
        if (!valid) {
          this.$message.error('请填写完整再保存');
          return false;
        }
        addLevel(that.levelForm).then(res=>{
          console.log('res',res);
          if(res&&res.code ===200){
            this.$message.success('修改成功')
          }else{
            this.$message.error(res.msg)
          }
          this.dialogVisible = false;
          this.submitLoading = false;
        })
      })
    },
  }
}
</script>

<style>

</style>
