<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
      <div style="text-align: right; padding-right:80px;margin-bottom:10px;">
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
        <el-table-column label="编辑时间" align="center" prop="updateTime"  width="200">
          <template slot-scope="scope">
            {{long2DateStr(scope.row.updateTime)}}
          </template>
        </el-table-column>
        <el-table-column label="库存量" align="center" min-width="110px">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row.goodsStock" class="edit-input" size="small" style="width:100px" />
              <el-button  class="cancel-btn" size="small" icon="el-icon-refresh" type="warning"  @click="cancelEdit(scope.row)">
                取消
              </el-button>
            </template>
            <span v-else>{{ scope.row.goodsStock }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope"> 
            <!--编辑 删除 -->
            <el-button  v-if="scope.row.edit" :loading="submitLoading" type="primary"  size="small"  
              @click="confirmEdit(scope.row)">完成</el-button>
            <el-button v-else type="success" size="small"
             @click="scope.row.edit = !scope.row.edit">编辑</el-button>
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
import { getGoodsList,editGoodsStock } from "../../api/goods";
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
      inventoryData:[],
      inventoryTable:['index','goodsCode','categoryName','goodsName','supplierName'],
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
        goodsCode:'商品编号',
        categoryName:'商品类别',
        goodsName:'商品名称',
        supplierName:'供应商',
        goodsStock:'库存量',
        updateTime:'编辑时间',
      }
      return typeLabel[type] || '';
    },
    edit(_row,_index){
      this.inventoryData.forEach((item,index) => {
        if(index === _index){
          item['edit'] = true;
        }
      });
      this.$set(this,'inventoryData',this.inventoryData)
    },
    getDataList(_type){
      if(_type === 'init'){
        this.page = 0;
      }
      this.dataListLoading = true;
      const that = this;
      getGoodsList({
        page:this.page,
        size:this.pageSize,
        goodsName:this.name
      }).then(res => {
        if(res && res.code === 200){
          that.inventoryData = res.data.rows;
          that.inventoryData.forEach(item => {
            item['edit'] = false;
            item['originalAmount'] = item.goodsStock;
          });
          that.totalList = res.data.total;
        }else{
          that.$message.error(res.msg)
        }
        this.dataListLoading = false;
      }).catch(err=>{
        this.dataListLoading = false;
      })
    },
    long2DateStr(time) {
      time = `${time.substr(0,4)}年${time.substr(4,2)}月${time.substr(6,2)}日 ${time.substr(8,2)}:${time.substr(10,2)}`;
      return time;
    },
    cancelEdit(row) {
      row.goodsStock = row.originalAmount;
      row.edit = false
      this.$message({
        message: '已恢复到原来的值',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalAmount = row.goodsStock;
      this.submitLoading = true;
      const that = this;
      editGoodsStock(row.id,{stock:row.goodsStock}).then(res=>{
        if(res && res.code === 200){
          that.$message.success('修改成功')
        }else{
          that.$message.error(res.msg)
        }
        that.submitLoading = false;
      },()=>{
        that.submitLoading = false;
      });
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

</style>