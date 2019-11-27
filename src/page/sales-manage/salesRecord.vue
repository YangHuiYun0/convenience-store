<template>
<!-- 销售记录 -->
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <el-table :data="salesData" v-loading="dataListLoading" ref="salesData">
         <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品类别:">
                <span>{{ scope.row.goodsType }}</span>
              </el-form-item>
              <el-form-item label="供应商名称:">
                <span>{{ scope.row.supplierName }}</span>
              </el-form-item>
              <el-form-item label="会员名字:">
                <span>{{ scope.row.memberName }}</span>
              </el-form-item>
              <el-form-item label="会员号码:">
                <span>{{ scope.row.memberMobile }}</span>
              </el-form-item>
              <el-form-item label="折扣:">
                <span>{{ scope.row.discount }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column v-for="item in salesTable"
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
      salesData:[{
        index:'1',
        soldTime:'1',
        goodsName:'1',
        goodsType:'1',
        supplierName:'1',
        staffName:'1',
        soldNum:'1',
        sellPrice:'1',
        isMember:'1',
        memberName:'1',
        memberMobile:'1',
        discount:'1',
        totalPrice:'1',
      }],
      salesTable:['soldTime','goodsName','staffName','soldNum','sellPrice','isMember','totalPrice'],
    }
  },
  components: {
    HeadTop,
  },
  methods:{
    getDataLabel(type){
      const typeLabel = {
        index:'序号',
        soldTime:'出售时间',
        goodsName:'商品名称',
        goodsType:'商品类别',
        supplierName:'供应商名称',
        staffName:'店员名字',
        soldNum:'售出数量',
        sellPrice:'售价',
        isMember:'是否会员',
        memberName:'会员名字',
        memberMobile:'会员号码',
        discount:'折扣',
        totalPrice:'金额(元)',
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
   .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>