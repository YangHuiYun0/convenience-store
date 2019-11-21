<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:30px">
      <el-button class="el-icon-plus modify-btn right-btn" size="small"
                  @click="addType()">增加商品类别</el-button>
        <el-table :data="typeForm" v-loading="dataListLoading" ref="eltable">
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
    </div>
    <AddType
      v-if="addTypeVisible"
      ref="AddType"
      @updateTypeData="updateTypeData(arguments)"
    />
  </div>
</template>

<script>
import HeadTop from "../../components/headTop";
import AddType from "./addType";
export default {
  data(){
    return{
      page:0,
      totalList:3,
      pageSize:10,
      dataListLoading:false,
      addTypeVisible:false,
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
    AddType,
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
     // 新增 / 修改 小贴士
    addType(id) {
      this.addTypeVisible = true;
      this.$nextTick(() => {
        this.$refs.AddType.init(id);
      });
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
