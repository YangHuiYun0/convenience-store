<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
       <div style="text-align: right; padding-right:80px">
          <el-input v-model="workNumber" style="width:200px" placeholder="请输入店员工号"></el-input>
          <el-input v-model="name" style="width:200px" placeholder="请输入店员名字"></el-input>
          <el-button type="info" >查询</el-button>
      </div>
      <el-table :data="staffData" v-loading="dataListLoading" ref="eltable" v-if="isShowList">
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
      workNumber:'',
      name:'',
      staffData:{},
      staffTable:['index','workNumber','name','loginName','mobile','password','entryTime','leaveTime']
    }
  },
  components: {
    HeadTop,
  },
  methods:{
    getDataLabel(type){
      const typeLabel = {
        index:'序号',
        workNumber:'工号',
        name:'店员名字',
        loginName:'用户名',
        mobile:'联系方式',
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