<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <el-table :data="inventoryData" v-loading="dataListLoading" ref="eltable" v-if="isShowList">
        <el-table-column v-for="(item,index) in inventoryTable"
            :label="getDataLabel(item)"
            :width="(index === 0 && 50)"
            :key="item" :prop="item"
            align="center">
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope"> 
            <!--编辑 删除 -->
            <i class="el-icon-edit"  @click="addinventory(scope.row.id);"></i> 
            <i class="el-icon-delete" @click="delHandle();"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import HeadTop from "../../components/headTop";
export default {
  data(){
    return{
      inventoryData:[],
    }
  },
  components: {
    HeadTop,
  },
  methods:{
    getDataLabel(type){
      const typeLabel = {
        index:'序号',
        goodsId:'商品编号',
        goodsType:'商品类别',
        name:'商品名称',
        supplier:'供应商',
        remaintInventory:'剩余库存',
        newInventory:'新增库存',
      }
      return typeLabel[type] || '';
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