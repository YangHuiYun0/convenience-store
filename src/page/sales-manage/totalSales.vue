<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <el-table :data="totalData" v-loading="dataListLoading" ref="totalData">
        <el-table-column v-for="item in totalSalesTable"
            :label="getDataLabel(item)"
            :key="item" :prop="item"
            align="center">
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
      pageSize:12,
      dataListLoading:false,
      totalData:[],
      totalSalesTable:['index','goodsName','goodsType','supplierName','soldNum','sellPrice','totalPrice'],
    }
  },
  components: {
    HeadTop,
  },
  methods:{
    getDataLabel(type){
      const typeLabel = {
        index:'序号',
        goodsName:'商品名称',
        goodsType:'商品类别',
        supplierName:'供应商名称',
        soldNum:'售出数量',
        sellPrice:'售价',
        totalPrice:'总金额(元)',
      }
      return typeLabel[type] || '';
    },
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