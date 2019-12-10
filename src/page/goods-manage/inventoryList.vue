<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <div style="text-align: right; padding-right:80px">
          <el-input v-model="name" style="width:200px" placeholder="请输入商品名称"></el-input>
          <el-button type="info" @click="getDataList('init')">查询</el-button>
      </div>
      <el-table :data="inventoryData" v-loading="dataListLoading" ref="eltable" v-if="isShowList">
        <el-table-column v-for="(item,index) in inventoryTable"
            :label="getDataLabel(item)"
            :type="index === 0 ? 'index' : ''"
            :width="(index === 0 && 50)"
            :key="item" :prop="item"
            align="center">
        </el-table-column>
        <!-- 'totalAmount', -->
        <el-table-column label="库存量" align="center" min-width="110px">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row.totalAmount" class="edit-input" size="small" style="width:100px" />
              <el-button  class="cancel-btn" size="small" icon="el-icon-refresh" type="warning"  @click="cancelEdit(scope.row)">
                取消
              </el-button>
            </template>
            <span v-else>{{ scope.row.totalAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope"> 
            <!--编辑 删除 -->
            <el-button  v-if="scope.row.edit" :loading="submitLoading" type="primary"  size="small"  
              @click="confirmEdit(scope.row)">完成</el-button>
            <el-button v-else type="success" size="small"
             @click="scope.row.edit=!scope.row.edit">编辑</el-button>
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
      totalList:0,
      pageSize:10,
      dataListLoading:false,
      isShowList:true,
      submitLoading:false,
      name:'',
      inventoryData:[{index:1,goodsId:'11',goodsType:'饮料',name:'可乐',supplier:'万达',editTime:'2019-11-11',totalAmount:'34',originalAmount:'34',edit:false}],
      inventoryTable:['index','goodsId','goodsType','name','supplier','editTime'],
    }
  },
  components: {
    HeadTop,
  },
  mounted(){
    this.getDataList('init');
  },
  methods:{
    // 商品名称、编号、类别、库存量、编辑时间
    getDataLabel(type){
      const typeLabel = {
        index:'序号',
        goodsId:'商品编号',
        goodsType:'商品类别',
        name:'商品名称',
        supplier:'供应商',
        totalAmount:'库存量',
        editTime:'编辑时间',
      }
      return typeLabel[type] || '';
    },
    getDataList(_type){
      if(_type === 'init'){
        this.page = 0;
      }
      this.dataListLoading = true;
      const that = this;
      getInventoryList({
        page:this.page,
        pageSize:this.pageSize,
        name:this.name
      }).then(res => {
        if(res && res.code === 200){
          that.inventoryData = res.data.rows;
          that.totalList = res.data.total;
        }else{
          that.$message.error(res.msg)
        }
        this.dataListLoading = false;
      }).catch(err=>{
        this.dataListLoading = false;
      })
    },
    cancelEdit(row) {
      row.totalAmount = row.originalAmount;
      row.edit = false
      this.$message({
        message: '已恢复到原来的值',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalAmount = row.totalAmount;
      this.submitLoading = true;
      editInventory({
        id:row.id,
        totalAmount:row.totalAmount,
      }).then(res=>{
        if(res && res.code === 200){
          that.$message.success('修改成功')
        }else{
          that.$message.error(res.msg)
        }
        that.submitLoading = false;
      }).catch(err=>{
        that.$message.error(err);
        that.submitLoading = false;
      })
    },
    currentChangeHandle(val){
      this.page = val;
    },
    indexMethod(index) {
      const page = this.page > 0 ? this.page - 1 : this.page;
      return this.totalList - page * this.pageSize - index;
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