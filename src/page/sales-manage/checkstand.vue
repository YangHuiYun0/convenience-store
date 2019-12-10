<template>
<!-- 收银台 -->
  <div>
    <HeadTop/>
    <div class="tables" style="padding:10px">
      <div class="goods-img">
        <el-card >
         <div class="title mb_5">
          <i class="el-icon-s-goods title-icon"></i>
          <span> 购买商品</span>
         </div>
         <div class="upload">
          <el-upload
            class="upload-demo"
            action=""
            :file-list="stockFileList"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :auto-upload="false">
            <el-button size="small" type="primary">上传券码</el-button>
          </el-upload>
         </div>
          <div class="title">
          <i class="el-icon-s-goods title-icon"></i>
          <span> 商品价格</span>
         </div>
         <div class="table">
          <el-table size='mini' :data="sellGoodsData" height="350" v-loading="dataListLoading" ref="totalData">
            <el-table-column v-for="item in sellGoodsTable"
                :label="getDataLabel(item)"
                :key="item" :prop="item"
                align="center">
            </el-table-column>
            <el-table-column :label="getDataLabel('soldNum')" align="center" min-width="110px">
              <template slot-scope="scope">
                  <el-input v-model="scope.row.soldNum" class="edit-input" size="small" style="width:100px" />
              </template>
            </el-table-column>
            <el-table-column :label="getDataLabel('totalPrice')" prop="totalPrice" align="center">
              <template slot-scope="scope">
                {{settlementTotal(scope.row)}}
              </template>
            </el-table-column>
          </el-table>
         </div>
        </el-card>
      </div>
    </div>
    <div class="footer">
        <div class="ft-sell">
          <div class="ft-mobile">
            <span>会员手机号：</span>
            <el-input v-model="mobile" placeholder="请输入手机号码" show-word-limit maxlength=11
                      clearable style="width:300px"></el-input>
          </div>
          <div class="ft-price">
            <div>
              <p style="text-decoration:line-through">原价：100</p>
              <p>折扣：5</p>
              <p>应付：95</p>
            </div>
            <div class="btn">
                <el-button type="success">付款</el-button>
            </div>
          </div>

        </div>
    </div>

  </div>
</template>

<script>
import HeadTop from "../../components/headTop";
import { addBuyGoods } from "@/api/sales";
export default {
  data(){
    return{
      stockFileList:[],
      mobile:'',
      dataListLoading:false,
      dialogImageUrl: '',
      dialogVisible: false,
      sellGoodsData:[{index:1,goodsName:'矿泉水',goodsBarcode:'112233344',isActivities:'否',sellPrice:'10',soldNum:'1'},
      {},{},{},{},{},{},{},{},{},{}],
      sellGoodsTable:['index','goodsName','goodsBarcode','isActivities','sellPrice'],
    }
  },
  components: {
    HeadTop,
  },
  methods: {
    getDataLabel(type){
      const typeLabel = {
        index:'序号',
        goodsName:'商品名称',
        goodsBarcode:'商品条码',
        isActivities:'是否活动期',
        sellPrice:'单价',
        soldNum:'数量',
        totalPrice:'金额',
      }
      return typeLabel[type] || '';
    },

    // 结算单个商品的总价
    settlementTotal(_item){
      return Number(_item.sellPrice) *Number(_item.soldNum)
    },
    // 选择文件
    handleChange(file, fileList) {
      console.log(file);
      const spl = file.name.split('.');
      if (spl[spl.length - 1] !== 'png') {
        this.$message.error('文件格式不符，请上传png格式的文件');
        this.stockFileList = [];
        return false;
      }
      this.stockFileList = fileList.slice(-1);
      // 选择一个商品后 请求服务端  获取商品的数据  渲染列表
      const that = this;
      that.dataListLoading = true;
      addBuyGoods().then(res=>{
        if(res && res.code === 200){
          that.sellGoodsData.push(res.data.rows);
        }else {
          that.$message.error(res.msg);
        }
        that.dataListLoading = false;
      }).catch(err=>{
        that.$message.error(err);
        that.dataListLoading = false;
      });
    },
    beforeUpload(file) {
      const spl = file.name.split('.');
      if (spl[spl.length - 1] !== 'png') {
        this.$message.error('文件格式不符，请上传 csv 格式的文件');
        this.stockFileList = [];
        return false;
      }
    },
    handleRemove(file, fileList) {
      this.stockFileList = fileList;
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
  .goods-img{
    
  }
  .upload{
    margin-bottom: 30px;
  }
  .mb_5{
    margin-bottom: 5px;
  }
  .title{
    font-size: 22px;
    font-weight: 600;
    border-bottom: 2px solid #76b852;
    .title-icon{
      color: #76b852;
      font-size: 38px;
      margin-bottom: 10px;
    }
    span{
      position: relative;
      top: -4px;
      font-family: '楷体'
    }
  }
  .ft-sell{
    display: flex;
    justify-content: space-between;
    .ft-mobile{
      margin : 50px 0 0 50px;
      span{
        font-size: 24px;
        font-family: '楷体';
      }
    }
    .ft-price{
      display: flex;
      font-family: '楷体';
      margin-right: 300px;
      font-size: 20px;
      font-weight: 600;
      .btn{
        margin: 80px 0 0  60px ;
      }
    }
    
  }
</style>