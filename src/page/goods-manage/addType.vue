<template>
 <el-dialog :title="!addTypeForm.id ? '新增商品类别' : '商品类别编辑'"
             :before-close="beforeClose"
             :visible.sync="visible">
    <el-form :model="addTypeForm" ref="addTypeForm" :rules="rules">
      <el-form-item label="商品类别" prop="goodsType">
        <el-input v-model="addTypeForm.name" show-word-limit maxlength=12
                  clearable style="width:300px"></el-input>
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
      submitLoading:false,
      visible:false,
      addTypeForm:{
        id:null,
        name:'',
      },
      rules:{
        name:[
          {required: true, message: '请输入奖品类别名称', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    init(id) {
       this.initForm();
      this.visible = true;
      if (!id) return false;
      this.addTypeForm.id = id;
      const that = this;
      // 请求数据
    },
    //对数据清空
    initForm(){

    },
    beforeClose() {
      this.cancel();
    },
    cancel() {
      this.$refs.addTypeForm.resetFields();
      this.submitLoading = false;
      this.visible = false;
    },

    formSubmit(){
      const that = this;
      this.$refs.addTypeForm.validate(valid => {
        if (!valid) {
          this.$message.error('请填写完整再保存');
          return false;
        }
        that.submitLoading = true;
        // 判断是增加还是编辑
        const submitFun = this.addTypeForm.id ? modifyTips : addTips;
        submitFun(this.addTypeForm).then(res => {
          if (res && res.code === 200) {
            that.$message.success(`${that.addTypeForm.id ? '修改' : '新增'}小贴士成功！`);
            that.$refs.addTypeForm.resetFields();
            that.visible = false;
            that.$emit('updateTipsData', {
              type: that.addTypeForm.id ? 'modify' : 'new',
              data: res.body
            });
          }else {
            that.$message.error(res.msg);
          }
          that.submitLoading = false;
        }, () => {
          that.submitLoading = false;
        });
      })
    }

  }
}
</script>

<style>

</style>
