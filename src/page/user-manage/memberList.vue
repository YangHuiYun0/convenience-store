<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <div style="margin-bottom:10px;text-align: right">
        <el-button type="success" class="el-icon-plus" @click="addMemberInfo()" >增加会员</el-button>
        <el-button type="success" class="el-icon-user" @click="levelManage()" >会员等级管理</el-button>
      </div>
       <el-card>
          <el-form label-width="100px" style="margin-bottom:10px">
            <el-input v-model="name" style="width:200px" placeholder="请输入姓名"></el-input>
            <el-input v-model="phone" style="width:200px" placeholder="请输入手机号码"></el-input>
            <el-button type="info" style="text-align: right;"  @click="getInfo" >查询</el-button>
          </el-form>
          <el-table :data="memberData" v-loading="dataListLoading" ref="eltable" v-if="isShowList">
            <el-table-column v-for="(item,index) in memberTable"
                :type="index === 0 ? 'index' : ''"
                :label="getDataLabel(item)"
                :width="(index === 0 && 50)"
                :key="item" :prop="item"
                align="center">
            </el-table-column>
            <el-table-column label="用户状态" prop="status" width="80" align="center">
              <template slot-scope="scope">
                <el-tag
                  :key="scope.row.id"
                  class="el-tag el-tag--dark"
                  :class="[{
                    'el-tag--danger': scope.row.status === 0,
                    'el-tag--success': scope.row.status === 1,
                  }]"
                  effect="plain">
                  {{ scope.row.status ?'正常':'冻结' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope"> 
                <!--编辑 删除 -->
                <i class="el-icon-edit"  @click="addMemberInfo(scope.row.id);"></i> 
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
       </el-card>
    </div>
    <el-dialog :title="!memberForm.id ? '新增会员' : '会员编辑'"
            :before-close="beforeClose"
            :visible.sync="dialogVisible"
            :modal-append-to-body='false'
            width='500px'>
      <el-form :model="memberForm" ref="memberForm" label-width="100px" :rules="rules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="memberForm.name" placeholder="请输入姓名" show-word-limit maxlength=6
                    clearable style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="memberForm.sex" label='1'>男</el-radio>
          <el-radio v-model="memberForm.sex" label='2'>女</el-radio>
        </el-form-item>
        <el-form-item label="是否冻结" prop="status">
            <el-radio v-model="memberForm.status" label="1">正常</el-radio>
            <el-radio v-model="memberForm.status" label='0'>冻结</el-radio>
        </el-form-item>
        <el-form-item label="积分" prop="shoppingPoints">
          <el-input v-model="memberForm.shoppingPoints" :disabled='isChange' style="width:150px"></el-input>
          <span class="tip">&nbsp;&nbsp;新用户默认10积分</span>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="memberForm.phone" placeholder="请输入手机号" show-word-limit maxlength=11
                    clearable style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="formSubmit" :loading="submitLoading">确定</el-button>
      </span>
    </el-dialog>

    <MemberLevel v-if="levelVisible" @updateStatus='updateStatus'></MemberLevel>
  </div>
</template>

<script>
import HeadTop from "../../components/headTop";
import MemberLevel from "./memberLevel";
import moment from 'moment';
import { addStaff,delMember,getStaff,editStaff,getMemberList } from "../../api/user";
export default {
  data(){
    const phoneRequire = (rule, value, callback) => {
      if (!String(this.memberForm.phone).match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/)) {
        callback(new Error('手机号码格式不正确'));
      } else {
        callback();
      }
    }
    return{
      page:0,
      totalList:3,
      pageSize:10,
      isChange:true,
      dataListLoading:false,
      isShowList:true,
      dialogVisible:false,
      levelVisible:false,
      submitLoading:false,
      name:'',
      phone:'',
      memberData:[],
      memberTable:['index','name','sex','levelName','shoppingPoints','createTime','phone','status'],
      memberForm:{
        id:null,
        name:'',
        sex:'1',
        shoppingPoints:'10',
        phone:'',
        status:'1',
        userType:2
      },
      rules:{
        name:[
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        phone:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { required: true, trigger: 'change', validator: phoneRequire }
        ],
      }
    }
  },
  components: {
    HeadTop,
    MemberLevel
  },
  mounted(){
    this.getInfo('init');
  },
  methods:{
    getDataLabel(type){
      const typeLabel = {
        index:'序号',
        id:'会员ID',
        name:'姓名',
        sex:'性别',
        shoppingPoints:'积分',
        levelName:'会员等级',
        createTime:'注册时间',
        phone:'手机号',
        status:'是否冻结'
      }
      return typeLabel[type] || '';
    },
    getInfo(type){
      if(type==='init'){
        this.page = 0
      }
      const that = this;
      this.dataListLoading = true;
      getMemberList({
        page:this.page,
        size:this.pageSize,
        name:this.name,
        phone:this.phone
      }).then(res=>{
        if(res && res.code === 200){
          that.memberData = res.data.rows;
          that.totalList = res.data.total;
        }else{
          that.$message.error(res.msg)
        }
        that.dataListLoading = false;
      },()=>{
        that.dataListLoading = false;
      })
    },
    addMemberInfo(id){
      this.dialogVisible = true;
      const that = this;
      if(id){
        getStaff(id).then(res=>{
          if(res && res.code === 200){
            that.memberForm = res.data;
          }else{
            this.$message.error(res&&res.msg)
          }
        }).catch((err)=>{
          this.$message.error(err)
        });
      }
    },
    // 删除会员
    delHandle(id,name,index){
      const that = this;
      this.$confirm(`确定对「 ${name} 」进行「 删除 」操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMember(id).then(res=>{
          if(res && res.code === 200){
            that.$message.success(`删除店员 ${name} 成功`);
            that.memberData.splice(index, 1);
            that.totalList--;
          }else{
            that.$message.error(res.msg)
          }
        })
      }).catch(()=>{});
    },
    // 第几条
    indexMethod(index) {
      const page = this.page > 0 ? this.page - 1 : this.page;
      return this.listTotal - page * this.pageSize - index;
    },
    levelManage(){
      this.levelVisible = true;
    },
    // 由子组件传值过来  关闭弹窗的标志
    updateStatus(status){
      this.levelVisible = status;
    },
    beforeClose() {
      this.cancel();
    },
    cancel() {
      // this.$refs.memberForm.resetFields();
      // this.$refs.levelForm.resetFields();
      this.submitLoading = false;
      this.dialogVisible = false;
    },
    currentChangeHandle(val){
      this.page = val;
      this.getInfo();
    },
    formSubmit(){
      const that = this;
      that.$refs.memberForm.validate(valid => {
        if (!valid) {
          this.$message.error('请填写完整再保存');
          return false;
        }
        const submitFun = that.memberForm.id ?editStaff:addStaff;
        submitFun(that.memberForm.id,that.memberForm).then(res=>{
          console.log('res',res);
          if(res&&res.code ===200){
            this.$message({
              type: 'success',
              message: `${that.memberForm.id?'修改':'增加'}成功`
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
    long2DateStr(time) {
      var s = moment(new Date(time)).format('YYYY-MM-DD HH:mm');
      return s;
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
  .tip {
    color: #999999;
    font-size: 12px;
  }
</style>