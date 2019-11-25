<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:20px">
       <div style="margin-bottom:10px;text-align: right">
          <el-button type="danger" class="el-icon-delete" >删除选中</el-button>
          <el-button type="success" class="el-icon-plus" @click="addGoods" >增加商品</el-button>
        </div>
        <el-card>
          <el-form label-width="100px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="商品类别" >
                  <el-select v-model="goodsType" clearable placeholder="商品类别">
                    <el-option
                      v-for="item in goodsTypeList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供应商列表">
                  <el-select v-model="supplier" clearable placeholder="供应商列表">
                    <el-option
                      v-for="item in supplierTypeList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!-- <el-form-item label="商品名称" label-width="100px"> -->
                  <el-input v-model="name" style="width:200px" placeholder="请输入商品名称"></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="4" style="">
                <el-button type="info" style="text-align: right;">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
           <el-table :data="goodsData" v-loading="dataListLoading"
           :row-key="row => row.index" ref="eltable"
           @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column v-for="(item,index) in goodsTable"
                :label="getDataLabel(item)"
                :width="(index === 0 && 50)"
                :index="indexMethod"
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
        </el-card>
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
      goodsType:'',//商品类别
      supplier:'',//供应商
      name:'',//商品名称
      goodsTypeList:[{id:'',label:'请选择'},{id:'1',label:'饮料汽水'},{id:'2',label:'膨化零食'}],
      supplierTypeList:[{id:'',label:'请选择'},{id:'1',label:'平板农场'},{id:'2',label:'沃尔玛场'}],
      goodsTable:['index','goodsId','goodsType','name','unit','supplier','purchasePrice','sellPrice','inventory'],
      goodsData:[],
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
        unit:'单位',
        supplier:'供应商',
        purchasePrice:'进价',
        sellPrice:'售价',
        inventory:'库存'
      }
      return typeLabel[type] || '';
    },
    addGoods(){
      this.$router.push({
        path: '/goods-manage-goodsDetails'
      });
    },
    editHandle(){},
    delHandle(){},
    currentChangeHandle(val){
      this.page = val;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    indexMethod(index) {
      const _page = this.page > 0 ? this.page - 1 : this.page;
      return this.totalList - _page * this.pageSize - index;
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
    background-color: 	#67C23A;
  }
  .el-table th {
    background-color: #67C23A;
  }
  .el-table thead{
    color: #363636;
  }
</style>
