<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:30px">

        <el-table :data="typeData" v-loading="dataListLoading" ref="eltable">
          <el-table-column v-for="(item,index) in typeTable"
              :label="getDataLabel(item)"
              :width="(index === 0 && 50)"
              :key="item" :prop="item"
              align="center">
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope"> 
              <!--编辑 删除 -->
              <i class="el-icon-edit"  @click="editHandle(scope.row.id);"></i> 
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
         <el-dialog title='增加商品分类' v-if="isShowDialog">
         </el-dialog>
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
      typeForm:[],
      typeTable:['index','id','name','commit','status'],
      typeData:[
        {index:'1',id:'1111222',name:'膨化食品',commit:'薯片、饼干等',status:'上架'},
        {index:'2',id:'3432553',name:'膨化食品',commit:'薯片、饼干等',status:'上架'},
        {index:'3',id:'4563456',name:'膨化食品',commit:'薯片、饼干等',status:'上架'},
      ],
      isShowDialog:false,
      goodsForm:{

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
        id:'类别编号',
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
  }
}
</script >

<style lang="scss">
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
