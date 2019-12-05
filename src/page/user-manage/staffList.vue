<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <div style="margin-bottom:10px;text-align: right">
        <el-button  type="success" class="el-icon-plus modify-btn right-btn" size="small"
                  @click="addStaff()">增加店员</el-button>
      </div>
       <div style="text-align: right; padding-right:80px">
          <el-input v-model="workNumber" style="width:200px" placeholder="请输入店员工号"></el-input>
          <el-input v-model="name" style="width:200px" placeholder="请输入店员名字"></el-input>
          <el-button type="info" >查询</el-button>
      </div>
      <el-table :data="staffData" v-loading="dataListLoading" ref="eltable">
        <el-table-column v-for="(item,index) in staffTable"
            :label="getDataLabel(item)"
            :width="(index === 0 && 50)"
            :key="item" :prop="item"
            align="center">
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope"> 
            <!--编辑 删除 -->
            <i class="el-icon-edit"  @click="editHandle();"></i> 
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
    <el-dialog :title="!staffForm.id ? '新增店员' : '店员修改'"
            :before-close="beforeClose"
            :visible.sync="dialogVisible"
            :modal-append-to-body='false'
            width='500px'>
      <el-form :model="staffForm" ref="staffForm" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="staffForm.userName"  placeholder="请输入店员登录用户名"  show-word-limit maxlength=12
                    clearable style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="staffForm.password"  placeholder="请输入店员登录密码"  show-word-limit minlength=6 maxlength=8
                    clearable style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="staffForm.sex" label='男'>男</el-radio>
          <el-radio v-model="staffForm.sex" label='女'>女</el-radio>
        </el-form-item>
        <el-form-item label="店员名字" prop="name">
          <el-input v-model="staffForm.name"  placeholder="请输入店员名字"  show-word-limit maxlength=6
                    clearable style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="staffForm.phone"  placeholder="请输入店员联系方式"  show-word-limit maxlength=11
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
import { editStaff,addStaff,delStaff,getStaff } from '../../api/user';
export default {
  data(){
    const phoneRequire = (rule, value, callback) => {
      if (!String(this.staffForm.phone).match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/)) {
        callback(new Error('手机号码格式不正确'));
      } else {
        callback();
      }
    }

    const passwordRequire = (rule, value, callback) => {
      if(String(this.staffForm.phone).length<6){
        callback(new Error ('登录密码在6-8位之间'))
      }else{
        callback();
      }
    }
    return{
      page:0,
      totalList:3,
      pageSize:10,
      dataListLoading:false,
      isShowList:true,
      submitLoading:false,
      workNumber:'',
      name:'',
      staffData:[],
      staffTable:['index','name','userName','password','sex','phone','entryTime','leaveTime'],
      // 增加弹窗
      dialogVisible:false,
      staffForm:{
        id:'',
        name:'',
        userName:'',
        phone:'',
        password:'',
        sex:'',
        userType:1,
      },
      rules:{
        workNumber:[
          { required: true, message: '请输入店员工号', trigger: 'blur'}
        ],
        name:[
          { required: true, message: '请输入店员名字', trigger: 'blur'}
        ],
        userName:[
          { required: true, message: '请输入店员登录用户名', trigger: 'blur'}
        ],
        password:[
          { required: true, message: '请输入店员登录密码', trigger: 'blur'},
          // { required: true, trigger: 'change', validator: passwordRequire }
        ],
        phone:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { required: true, trigger: 'change', validator: phoneRequire }
        ],
        entryTime:[
          {required: true, message: '请选择入职日期', trigger: 'blur'},
          // {required: true, trigger: 'change', validator: entryTimeRequire}
        ],
        leaveTime:[
          {required: true, message: '请选择离职日期', trigger: 'blur'},
          // {required: true, trigger: 'change', validator: leaveTimeRequire}
        ]
      },
      startPickerOptions: {
        disabledDate: (time) => {
          if (this.staffForm.leaveTime != "") {
              return time.getTime() > this.staffForm.leaveTime;
          }
        }
      },
      endPickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < this.staffForm.entryTime;
        }
      },
    }
  },
  components: {
    HeadTop,
  },
  methods:{
    getDataLabel(type){
      const typeLabel = {
        index:'序号',
        name:'店员名字',
        userName:'用户名',
        phone:'联系方式',
        sex:'性别',
        password:'登录密码',
        entryTime:'入职日期',
        leaveTime:'离职日期',
      }
      return typeLabel[type] || '';
    },
    editHandle(){},
    delHandle(){},
    currentChangeHandle(val){
      this.page = val;
    },
    addStaff(){
      this.dialogVisible = true;
    },
     // 弹窗
    beforeClose() {
      this.cancel();
    },
    cancel() {
      this.$refs.staffForm.resetFields();
      this.submitLoading = false;
      this.dialogVisible = false;
    },
    formSubmit(){
      const that = this;
      that.$refs.staffForm.validate(valid => {
        if (!valid) {
          this.$message.error('请填写完整再保存');
          return false;
        }
         const submitFun = that.staffForm.id ?editStaff:addStaff;
        submitFun(that.staffForm.id,that.staffForm).then(res=>{
          console.log('res',res);
          if(res&&res.code ===200){
            this.$message({
              type: 'success',
              message: `${that.staffForm.id?'修改':'增加'}成功`
            });
            // that.getInfo();
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