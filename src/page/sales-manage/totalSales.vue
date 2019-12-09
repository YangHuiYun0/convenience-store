<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <el-table :data="totalData" v-loading="dataListLoading" ref="totalData"  show-summary>
        <el-table-column v-for="item in totalSalesTable"
            :label="getDataLabel(item)"
            :key="item" :prop="item"
            align="center">
        </el-table-column>
      </el-table>
        <el-pagination
          background
          layout="total, prev, pager, next"
          :type="index === 0 ?'index':''"
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
import { getTotalSalesList } from "@/api/sales";
export default {
  data(){
    return{
      page:0,
      totalList:3,
      pageSize:12,
      dataListLoading:false,
      totalData:[{index:1,goodsName:'可口可乐',goodsType:'汽水饮料',supplierName:'万达物业',soldNum:'4',sellPrice:'10元',totalPrice:'40'},
      {index:2,goodsName:'苹果',goodsType:'水果',supplierName:'晚安农场',soldNum:'5',sellPrice:'5元',totalPrice:'25'}],
      totalSalesTable:['index','goodsName','goodsType','supplierName','sellPrice','soldNum','totalPrice'],
    }
  },
  components: {
    HeadTop,
  },
  mounted(){
    this.getDataList('init')
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
      this.getDataList();
    },
    getDataList(type){
      if(type === 'init'){
        this.page = 0;
      }
      this.dataListLoading = true;
      const that = this;
      getTotalSalesList({
        page:this.page,
        pageSize:this.pageSize
      }).then(res =>{
        if(res && res.code === 200){
          that.totalData = res.data.rows;
          that.totalList = res.data.total;
        }else{
          that.$message.error(res.msg)
        }
        that.dataListLoading = false;
      }).catch(err=>{
        that.$message.error(err)
        that.dataListLoading = false;
      });
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