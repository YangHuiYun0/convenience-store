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
                <span>{{ scope.row.category_name }}</span>
              </el-form-item>
              <el-form-item label="供应商名称:">
                <span>{{ scope.row.supplier_name }}</span>
              </el-form-item>
              <el-form-item label="会员名字:">
                <span>{{ scope.row.customer_name?scope.row.customer_name:'无' }}</span>
              </el-form-item>
              <el-form-item label="会员号码:">
                <span>{{ scope.row.phone ? scope.row.phone:'无' }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="出售时间" align="center" prop="create_time" >
          <template slot-scope="scope">
            {{long2DateStr(scope.row.create_time)}}
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
import { getSalesInfo } from "@/api/sales";
import moment from 'moment';
export default {
  data(){
    return{
      page:0,
      totalList:3,
      pageSize:12,
      dataListLoading:false,
      salesData:[],
      salesTable:['goods_name','sales_name','info_num','goods_price','amount'],
    }
  },
  components: {
    HeadTop,
  },
  mounted(){
    this.getDataList('init');
  },
  methods:{
    getDataLabel(type){
      const typeLabel = {
        index:'序号',
        create_time:'出售时间',
        goods_name:'商品名称',
        category_name:'商品类别',
        supplier_name:'供应商名称',
        sales_name:'操作人',
        info_num:'售出数量',
        goods_price:'售价',
        customer_name:'会员名字',
        phone:'会员号码',
        amount:'金额(元)',
      }
      return typeLabel[type] || '';
    },
    currentChangeHandle(val){
      this.page = val;
      this.getDataList();
    },
    long2DateStr(time) {
      time = `${time.substr(0,4)}年${time.substr(4,2)}月${time.substr(6,2)}日 ${time.substr(8,2)}:${time.substr(10,2)}`;
      return time;
    },
    getDataList(_type){
      if(_type){
        this.page = 0;
      }
      const that = this;
      that.dataListLoading = true;
      getSalesInfo({
        page:this.page,
        size:this.pageSize
      }).then(res=>{
        if(res && res.code === 200){
          that.salesData = res.data.rows;
          that.totalList = res.data.total;
        }else{
          this.$message.error(res.msg);
        }
        that.dataListLoading = false;
      }).catch(err =>{
        that.$message.error(err)
        that.dataListLoading = false;
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