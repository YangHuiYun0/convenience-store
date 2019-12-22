<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <div style="margin-bottom:20px;text-align: right">
        <el-button  type="success" class="el-icon-plus modify-btn right-btn" size="small"
                  @click="addSupplierInfo()">增加供应商</el-button>
      </div>
       <div style="text-align: right; padding-right:80px">
          <el-input v-model="supplierName" style="width:200px" placeholder="请输入供应商名字"></el-input>
          <el-button type="info" @click="getInfo" >查询</el-button>
      </div>
        <el-table :data="supplierData" v-loading="dataListLoading" ref="eltable" >
          <el-table-column v-for="(item,index) in supplierTable"
              :type="index === 0?'index':''"
              :label="getDataLabel(item)"
              :width="(index === 0 && 50)"
              :key="item" :prop="item"
              align="center">
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope"> 
              <!--编辑 删除 -->
              <i class="el-icon-edit"  @click="addSupplierInfo(scope.row.id);"></i> 
              <i class="el-icon-delete" @click="delHandle(scope.row.id,scope.row.supplierName,scope.$index);"></i>
            </template>
          </el-table-column>
        </el-table>
         <!-- 分页 -->
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page=page
          :total=totalList
          :page-size=pageSize
          @current-change="currentChangeHandle">
        </el-pagination>
      </div>
      <el-dialog :title="!addSupplierForm.id ? '新增供应商' : '供应商修改'"
             :before-close="beforeClose"
             :visible.sync="dialogVisible"
             :modal-append-to-body='false'
             width='500px'>
        <el-form :model="addSupplierForm" ref="addSupplierForm" :rules="rules">
          <el-form-item label="供应商编号" prop="supplierNum">
            <el-input v-model="addSupplierForm.supplierNum" show-word-limit maxlength=6
                      clearable style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" prop="supplierName">
            <el-input v-model="addSupplierForm.supplierName" show-word-limit maxlength=12
                      clearable style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="supplierLinkname">
            <el-input v-model="addSupplierForm.supplierLinkname" show-word-limit maxlength=12
                      clearable style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="supplierLinktel">
            <el-input v-model="addSupplierForm.supplierLinktel" show-word-limit maxlength=11
                      clearable style="width:300px"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="formSubmit" :loading="submitLoading">确定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import HeadTop from "../../components/headTop";
import {getSupplierList,addSupplier,editSupplier,
      getSupplier,
      delSupplier,  } from "../../api/goods";
export default {
  data(){
    const mobileRequire = (rule, value, callback) => {
      if (!String(this.addSupplierForm.supplierLinktel).match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/)) {
        callback(new Error('手机号码格式不正确'));
      } else {
        callback();
      }
    }
    return{
      page:0,
      totalList:0,
      pageSize:8,
      dataListLoading:false,
      isShowList:true,
      submitLoading:false,
      dialogVisible:false,
      supplierName:'',
      supplierTable:['index','supplierNum','supplierName','supplierLinkname','supplierLinktel'],
      supplierData:[],
      addSupplierForm:{
        id: '',
        supplierNum:'',
        supplierName:'',
        supplierLinkname:'',
        supplierLinktel:'',
      },
      rules:{
        supplierName:[
          {required: true, message: '请输入供应商名称', trigger: 'blur'}
        ],
        supplierNum:[
          {required: true, message: '请输入供应商编号', trigger: 'blur'}
        ],
        supplierLinkname:[
          {required: true, message: '请输入联系人名字', trigger: 'blur'}
        ],
        supplierLinktel:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { required: true, trigger: 'change', validator: mobileRequire }
        ]
      }
    }
  },
  components: {
    HeadTop,
  },
  mounted(){
    this.getInfo('init');
  },
  methods:{
    getDataLabel(type){
      const typeLabel = {
        index:'序号',
        supplierNum:'供应商编号',
        supplierName:'供应商名称',
        supplierLinkname:'联系人',
        supplierLinktel:'联系方式',
      }
      return typeLabel[type] || '';
    },
    getInfo(type){
      if(type==='init'){
        this.page = 0
      }
      const that = this;
      this.dataListLoading = true;
      getSupplierList({
        page:this.page,
        size:this.pageSize,
        supplierName:this.supplierName,
      }).then(res=>{
        if(res && res.code === 200){
          that.supplierData = res.data.rows;
          that.totalList = res.data.total;
        }else{
          that.$message.error(res.msg)
        }
        that.dataListLoading = false;
      },()=>{
        that.dataListLoading = false;
      })
    },

    currentChangeHandle(val){
      this.page = val;
      this.getInfo();
    },
    addSupplierInfo(id) {
      this.dialogVisible = true;
      const that = this;
      if(id){
        getSupplier(id).then(res=>{
          if(res && res.code === 200){
            that.addSupplierForm = res.data;
          }else{
            this.$message.error(res.msg)
          }
        }).catch((err)=>{
          this.$message.error(err)
        })
      }
    },
    delHandle(id,name,index){
      const that = this;
      this.$confirm(`确定对「 ${name} 」进行「 删除 」操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSupplier(id).then(res=>{
          if(res && res.code === 200){
            that.$message.success(`删除供应商 ${name} 成功`);
            that.supplierData.splice(index, 1);
          }else{
            that.$message.error(res.msg)
          }
        })
      }).catch(()=>{});
    },
    // 弹窗
    beforeClose() {
      this.cancel();
    },
    cancel() {
      this.$refs.addSupplierForm.resetFields();
      this.submitLoading = false;
      this.dialogVisible = false;
    },
    formSubmit(){
      const that = this;
      this.submitLoading = true;
      that.$refs.addSupplierForm.validate(valid => {
        if (!valid) {
          this.$message.error('请填写完整再保存');
          return false;
        }
        const submitFun = that.addSupplierForm.id ?editSupplier:addSupplier;
        submitFun(that.addSupplierForm.id,that.addSupplierForm).then(res=>{
          console.log('res',res);
          if(res&&res.code ===200){
            this.$message({
              type: 'success',
              message: `${that.addSupplierForm.id?'修改':'增加'}成功`
            });
             that.$refs.addSupplierForm.resetFields();
            // that.addSupplierForm.id = res.data.id;
            that.getInfo();
          }else{
            this.$message.error(res.msg)
          }
          this.dialogVisible = false;
          this.submitLoading = false;
        })

      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #76b852;
    color: #FFF;
  }
  .el-table__header-wrapper thead div {
    background-color: 	#3CB371;
  }
  .el-table th {
    background-color: #3CB371;
  }
  .el-table thead{
    color: #363636;
    
  }
</style>
