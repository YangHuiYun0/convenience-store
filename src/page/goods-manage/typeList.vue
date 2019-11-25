<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <div style="margin-bottom:10px;text-align: right">
        <el-button  type="success" class="el-icon-plus modify-btn right-btn" size="small"
                  @click="addType()">增加商品类别</el-button>
      </div>
      <el-table :data="typeData" v-loading="dataListLoading" ref="eltable" v-if="isShowList">
        <el-table-column v-for="(item,index) in typeTable"
            :label="getDataLabel(item)"
            :width="(index === 0 && 50)"
            :key="item" :prop="item"
            align="center">
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope"> 
            <!--编辑 删除 -->
            <i class="el-icon-edit"  @click="addType(scope.row.id);"></i> 
            <i class="el-icon-delete" @click="delHandle();"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page=page
        :total=totalList
        :page-size=pageSize
        @current-change="currentChangeHandle">
      </el-pagination>
    </div>
    <el-dialog :title="!addTypeForm.id ? '新增商品类别' : '商品类别编辑'"
            :before-close="beforeClose"
            :visible.sync="dialogVisible"
            :modal-append-to-body='false'
            width='500px'>
      <el-form :model="addTypeForm" ref="addTypeForm" :rules="rules">
        <el-form-item label="类别编码" prop="typeId">
          <el-input v-model="addTypeForm.typeId" show-word-limit maxlength=12
                    clearable style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="addTypeForm.name" show-word-limit maxlength=12
                    clearable style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="类别介绍" prop="commit">
          <el-input v-model="addTypeForm.commit" type="textarea" :rows="2"  style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
            <el-radio v-model="addTypeForm.status" label='true'>启用</el-radio>
            <el-radio v-model="addTypeForm.status" label='false'>禁用</el-radio>
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
      addTypeVisible:false,
      typeForm:[],
      typeTable:['index','typeId','name','commit','status'],
      typeData:[
        {index:'1',typeId:'1111222',name:'膨化食品',commit:'薯片、饼干等',status:'上架'},
        {index:'2',typeId:'3432553',name:'膨化食品',commit:'薯片、饼干等',status:'上架'},
        {index:'3',typeId:'4563456',name:'膨化食品',commit:'薯片、饼干等',status:'上架'},
      ],
      isShowDialog:false,
      // 弹窗
      submitLoading:false,
      dialogVisible:false,
      isShowList:true,
      addTypeForm:{
        id:null,
        name:'',
        typeId:'',
        commit:'', 
        status:'true',
      },
      rules:{
        name:[
          {required: true, message: '请输入类别名称', trigger: 'blur'}
        ],
        typeId:[
           {required: true, message: '请输入类别编号', trigger: 'blur'}
        ],
        commit:[
          {required: true, message: '请输入类别介绍', trigger: 'blur'}
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
        typeId:'类别编号',
        name:'类别名称',
        commit:'类别介绍',
        status:'状态'
      }
      return typeLabel[type] || '';
    },
    editHandle(){},
    delHandle(){},
    currentChangeHandle(val){
      this.page = val;
    },
     // 新增 / 修改 小贴士
    addType(id) {
      this.dialogVisible = true;
    },
    //新增一条数据后
    updateTypeData(argument){
       const res = argument[0];
        const that = this;
        if (res.type === 'modify') {
          this.typeData.forEach((item, index) => {
            if (item.id === res.data.id) {
              // 更新奖品数据
              that.$set(this.typeData, index, res.data);
            }
          });
        } else {
          that.typeData.push(res.data);
        }
    },
    // 弹窗
    beforeClose() {
      this.cancel();
    },
    cancel() {
      this.$refs.addTypeForm.resetFields();
      this.submitLoading = false;
      this.dialogVisible = false;
    },
    formSubmit(){
      const that = this;
      that.$refs.addTypeForm.validate(valid => {
        if (!valid) {
          this.$message.error('请填写完整再保存');
          return false;
        }
        var _index = this.typeData.length;
        this.addTypeForm['index'] = _index+1;
        this.typeData[_index] = this.addTypeForm;
        this.isShowList = false;
        this.$nextTick(()=>{
          this.isShowList = true;
        })
        this.dialogVisible = false;
        this.submitLoading = false;
        // 再去请求接口  渲染表格
      })
    },
  }
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
