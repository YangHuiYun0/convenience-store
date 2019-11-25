<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <div style="margin-bottom:10px;text-align: right">
        <el-button  type="success" class="el-icon-plus modify-btn right-btn" size="small"
                  @click="addSupplier()">增加供应商</el-button>
      </div>
        <el-table :data="supplierData" v-loading="dataListLoading" ref="eltable" v-if="isShowList">
          <el-table-column v-for="(item,index) in supplierTable"
              :label="getDataLabel(item)"
              :width="(index === 0 && 50)"
              :key="item" :prop="item"
              align="center">
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope"> 
              <!--编辑 删除 -->
              <i class="el-icon-edit"  @click="addSupplier(scope.row.id);"></i> 
              <i class="el-icon-delete" @click="delHandle();"></i>
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
          <el-form-item label="供应商编号" prop="supplierId">
            <el-input v-model="addSupplierForm.supplierId" show-word-limit maxlength=12
                      clearable style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" prop="supplierName">
            <el-input v-model="addSupplierForm.supplierName" show-word-limit maxlength=12
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
export default {
  data(){
    return{
      page:0,
      totalList:3,
      pageSize:10,
      dataListLoading:false,
      isShowList:true,
      submitLoading:false,
      dialogVisible:false,
      supplierTable:['index','supplierId','supplierName'],
      supplierData:[
        {index:'1',supplierId:'1111222',supplierName:'有机农场'},
        {index:'1',supplierId:'1111222',supplierName:'永辉农场'},
        {index:'1',supplierId:'1111222',supplierName:'达利园企业'}],
      addSupplierForm:{
        supplierId:'',
        supplierName:'',
      },
      rules:{
        supplierName:[
          {required: true, message: '请输入供应商名称', trigger: 'blur'}
        ],
        supplierId:[
          {required: true, message: '请输入供应商编号', trigger: 'blur'}
        ],
      }
    }
  },
  components: {
    HeadTop,
  },
  methods:{
    getDataLabel(type){
      const typeLabel = {
        index:'序号',
        supplierId:'供应商编号',
        supplierName:'供应商名称',
      }
      return typeLabel[type] || '';
    },
    addSupplier(){

    },
    currentChangeHandle(val){
      this.page = val;
    },
    addSupplier(id) {
      this.dialogVisible = true;
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
        var _index = this.supplierData.length;
        this.addSupplierForm['index'] = _index+1;
        this.typeData[_index] = this.addSupplierForm;
        this.isShowList = false;
        this.$nextTick(()=>{
          this.isShowList = true;
        })
        this.dialogVisible = false;
        this.submitLoading = false;
        // 再去请求接口  渲染表格
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
