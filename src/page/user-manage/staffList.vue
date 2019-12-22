<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <div style="margin-bottom:10px;text-align: right">
        <el-button  type="success" class="el-icon-plus modify-btn right-btn" size="small"
                  @click="addStaffInfo()">增加店员</el-button>
      </div>
       <div style="text-align: right; padding-right:80px">
          <el-input v-model="name" style="width:200px" placeholder="请输入店员名字"></el-input>
          <el-button type="info" @click="getInfo" >查询</el-button>
      </div>
      <el-table :data="staffData" v-loading="dataListLoading" ref="eltable">
        <el-table-column v-for="(item,index) in staffTable"
            :type="index === 0 ? 'index' : ''"
            :label="getDataLabel(item)"
            :width="(index === 0 && 50)"
            :key="item" :prop="item"
            align="center">
        </el-table-column>
        <el-table-column label="性别" align="center" prop="sex" >
          <template slot-scope="scope">
            {{scope.row.sex=== '1'?'男':'女'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope"> 
            <!--编辑 删除 -->
            <i class="el-icon-edit"  @click="addStaffInfo(scope.row.id);"></i> 
            <i class="el-icon-delete" @click="delHandle(scope.row.id,scope.row.name,scope.$index);"></i>
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
            width='500px'
            v-if="dialogVisible">
      <el-form :model="staffForm" ref="staffForm" label-width="100px" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="staffForm.userName"  placeholder="请输入店员登录用户名"  show-word-limit maxlength=12
                    clearable style="width:300px" :disabled="staffForm.id!==null"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password" v-if="!staffForm.id">
          <el-input v-model="staffForm.password"  placeholder="请输入店员登录密码"  show-word-limit minlength=6 maxlength=8
                    clearable style="width:300px" ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="staffForm.sex" label='1'>男</el-radio>
          <el-radio v-model="staffForm.sex" label='2'>女</el-radio>
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
import { editStaff,addStaff,delStaff,getStaff,getStaffList } from '../../api/user';
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

    const userNameRequire = (rule,value,callback)=>{
      if(!String(this.staffForm.userName).match(/^[0-9a-zA-Z]+$/)){
        callback(new Error ('用户名只能由英文和数字组成'))
      }else{
        callback();
      }
    }
    return{
      page:0,
      totalList:0,
      pageSize:5,
      dataListLoading:false,
      isShowList:true,
      submitLoading:false,
      workNumber:'',
      name:'',
      staffData:[],
      staffTable:['index','name','userName','phone'],
      // 增加弹窗
      dialogVisible:false,
      staffForm:{
        id:null,
        name:'',
        userName:'',
        phone:'',
        password:'123456',
        sex:'2',
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
          { required: true, message: '请输入店员登录用户名', trigger: 'blur'},
          { required: true, trigger: 'change', validator: userNameRequire }
        ],
        password:[
          { required: true, message: '请输入店员登录密码', trigger: 'blur'},
          // { required: true, trigger: 'change', validator: passwordRequire }
        ],
        phone:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { required: true, trigger: 'change', validator: phoneRequire }
        ],
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
  mounted(){
    this.getInfo('init');
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
    getInfo(type){
      if(type==='init'){
        this.page = 0
      }
      const that = this;
      this.dataListLoading = true;
      getStaffList({
        page:this.page,
        size:this.pageSize,
        name:this.name
      }).then(res=>{
        if(res && res.code === 200){
          that.staffData = res.data.rows;
          that.totalList = res.data.total;
        }else{
          that.$message.error(res.msg)
        }
        that.dataListLoading = false;
      },()=>{
        that.dataListLoading = false;
      })
    },
    // 删除店员
    delHandle(id,name,index){
      const that = this;
      this.$confirm(`确定对「 ${name} 」进行「 删除 」操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delStaff(id).then(res=>{
          if(res && res.code === 200){
            that.$message.success(`删除店员 ${name} 成功`);
            that.staffData.splice(index, 1);
            that.totalList--;
          }else{
            that.$message.error(res.msg)
          }
        })
      }).catch(()=>{});
    },
    currentChangeHandle(val){
      this.page = val;
      this.getInfo();
    },
    addStaffInfo(id){
      this.dialogVisible = true;
      const that = this;
      // 如果有店员的情况
      if(id){
        getStaff(id).then(res=>{
          if(res&& res.code === 200){
            that.staffForm = res.data;
          }else{
             this.$message.error(res&&res.msg)
          }
        }).catch((err)=>{
          this.$message.error(err)
        });
      }else{
        this.closeForm();
      }
    },
     // 弹窗
    closeForm(){
      this.staffForm.name = '';
      this.staffForm.userName = '';
      this.staffForm.phone = '';
      this.staffForm.password = '';
    },
    beforeClose(id) {
      this.cancel();
    },
    cancel() {
      this.$refs.staffForm.resetFields();
      this.closeForm();
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
            that.getInfo();
          }else{
            this.$message.error(res.msg)
          }
          this.dialogVisible = false;
          this.submitLoading = false;
        })
      })
    },
        // 第几条
    indexMethod(index) {
      const page = this.page > 0 ? this.page - 1 : this.page;
      return this.totalList - page * this.pageSize - index;
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