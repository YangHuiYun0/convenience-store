<template>
  <div>
    <HeadTop/>
    <div class="tables" style="padding:30px">
        <el-card>
          <el-form label-width="100px">
            <el-form-item >
              <el-select v-model="goodsType" clearable placeholder="商品类别">
                <el-option
                  v-for="item in goodsTypeList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="supplierType" clearable placeholder="供应商列表">
                <el-option
                  v-for="item in supplierTypeList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
        <el-table :data="typeForm" v-loading="dataListLoading" ref="eltable">
          <el-table-column v-for="(item,index) in typeTable"
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
      supplierType:'',//供应商
      goodsTypeList:[{id:'',label:'请选择'},{id:'1',label:'饮料汽水'},{id:'2',label:'膨化零食'}],
      supplierTypeList:[{id:'',label:'请选择'},{id:'1',label:'平板农场'},{id:'2',label:'沃尔玛场'}],
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
