<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <div style="margin-bottom:10px;text-align: right">
        <el-button type="success" class="el-icon-plus" @click="addMemberInfo" >增加会员</el-button>
        <el-button type="success" class="el-icon-user" @click="levelManage" >会员等级管理</el-button>
      </div>
       <el-card>
          <el-form label-width="100px" style="margin-bottom:10px">
            <el-input v-model="memberName" style="width:200px" placeholder="请输入姓名"></el-input>
            <el-input v-model="mobile" style="width:200px" placeholder="请输入手机号码"></el-input>
            <el-button type="info" style="text-align: right;"  @click="getInfo" >查询</el-button>
          </el-form>
          <el-table :data="memberData" v-loading="dataListLoading" ref="eltable" v-if="isShowList">
            <el-table-column v-for="(item,index) in memberTable"
                :type="index === 0 ? 'index' : ''"
                :label="getDataLabel(item)"
                :width="(index === 0 && 50)"
                :key="item" :prop="item"
                :index="indexMethod"
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
      <el-form :model="memberForm" ref="memberForm" :rules="rules">
        <el-form-item label="会员ID" prop="memberId">
          <el-input v-model="memberForm.memberId" placeholder="请输入会员ID" show-word-limit maxlength=6
                    clearable style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="memberName">
          <el-input v-model="memberForm.memberName" placeholder="请输入姓名" show-word-limit maxlength=6
                    clearable style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="memberForm.sex" label='男'>男</el-radio>
          <el-radio v-model="memberForm.sex" label='女'>女</el-radio>
        </el-form-item>
        <el-form-item label="是否冻结" prop="status">
            <el-radio v-model="memberForm.status" label="1">正常</el-radio>
            <el-radio v-model="memberForm.status" label='0'>冻结</el-radio>
        </el-form-item>
        <el-form-item label="积分" prop="integral">
          <el-input v-model="memberForm.integral" :disabled='isChange' style="width:150px"></el-input>
          <span class="tip">&nbsp;&nbsp;新用户默认10积分</span>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="memberForm.mobile" placeholder="请输入手机号" show-word-limit maxlength=11
                    clearable style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="formSubmit" :loading="submitLoading">确定</el-button>
      </span>
    </el-dialog>

    <MemberLevel v-if="levelVisible"></MemberLevel>
  </div>
</template>

<script>
import HeadTop from "../../components/headTop";
import MemberLevel from "./memberLevel";
import { addStaff,delStaff,getStaff,editStaff } from "../../api/user";
export default {
  data(){
    const mobileRequire = (rule, value, callback) => {
      if (!String(this.memberForm.mobile).match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/)) {
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
      memberName:'',
      mobile:'',
      memberData:[
        {index:'1',memberId:'1',memberName:'杨先生',sex:'男',level:'普通会员',integral:'32',joinTime:'2019.11.25',mobile:'15892089899',status:1},
        {index:'2',memberId:'2',memberName:'陈女士',sex:'女',level:'黄金会员',integral:'333',joinTime:'2019.11.05',mobile:'15892089899',status:0},
      ],
      memberTable:['index','memberName','sex','level','integral','joinTime','mobile','status'],
      memberForm:{
        memberId:'',
        memberName:'',
        sex:'男',
        integral:'10',
        mobile:'',
        status:'1'
      },
      rules:{
        memberId:[
          { required: true, message: '请输入会员ID', trigger: 'blur' },
        ],
        memberName:[
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        mobile:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { required: true, trigger: 'change', validator: mobileRequire }
        ],
      }
    }
  },
  components: {
    HeadTop,
    MemberLevel
  },
  methods:{
    getDataLabel(type){
      const typeLabel = {
        index:'序号',
        memberId:'会员ID',
        memberName:'姓名',
        sex:'性别',
        integral:'积分',
        level:'会员等级',
        joinTime:'注册时间',
        mobile:'手机号',
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
      getSupplierList({
        page:this.page,
        size:this.pageSize,
        memberName:this.memberName,
        mobile:this.mobile
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
    addMemberInfo(id){
      this.dialogVisible = true;
      const that = this;
      if(id){
        getMember(id).then(res=>{
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
        delSupplier(id).then(res=>{
          if(res && res.code === 200){
            that.$message.success(`删除店员 ${name} 成功`);
            that.memberData.splice(index, 1);
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
        const submitFun = that.memberForm.id ?editMember:addMember;
        submitFun(that.memberForm.id,that.memberForm).then(res=>{
          console.log('res',res);
          if(res&&res.code ===200){
            this.$message({
              type: 'success',
              message: `${that.memberForm.id?'修改':'增加'}成功`
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
  .tip {
    color: #999999;
    font-size: 12px;
  }
</style>