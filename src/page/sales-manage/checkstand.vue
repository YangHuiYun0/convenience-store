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
            <el-button size="small" type="primary">上传商品条码</el-button>
          </el-upload>
         </div>
          <div class="title">
            <i class="el-icon-s-goods title-icon"></i>
            <span> 商品价格</span>
          </div>
          <div style="text-align: right;margin-top: -33px">
            <el-button size="small" type="danger" @click="closeAllInfo()">取消付款</el-button>
          </div>
         <div class="table">
          <el-table size='mini' :data="sellGoodsData" height="270" v-loading="dataListLoading" 
          ref="totalData">
            <el-table-column v-for="(item,index) in sellGoodsTable"
                :type="index === 0 ? 'index' : ''"
                :label="getDataLabel(item)"
                :key="index" :prop="item"
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
            <el-button type="success" @click="handlePhone" :loading="submitLoading">提交</el-button>
          </div>
          <div class="ft-price">
            <div>
              <p>原价：{{totalPrice}} 元</p>
              <p>折扣：{{getDiscount()}} 元  <span class="tip" v-text="getDataLabel(memberLevel)"></span></p>
              <p>应付：{{getEndPrice()}} 元</p>
            </div>
            <div class="btn">
                <el-button type="success" @click="endSettlement()" :loading="submitLoadings">付款</el-button>
            </div>
          </div>

        </div>
    </div>

  </div>
</template>

<script>
import HeadTop from "../../components/headTop";
import { getBuyGoods,getMemberInfo,setPayment } from "@/api/sales";
export default {
  data(){
    return{
      stockFileList:[],
      memberLevel:'',
      memberId:null,
      goods:[],
      discountTotal:'0',//折扣值
      mobile:'',
      dataListLoading:false,
      submitLoading:false,
      submitLoadings:false,
      dialogImageUrl: '',
      dialogVisible: false,
      totalPrice:0,
      totalDiscount:1,
      sellGoodsData:[],
      sellGoodsTable:['index','goodsName','goodsCode','goodsPrice'],
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
        goodsCode:'商品条码',
        goodsPrice:'单价',
        soldNum:'数量',
        totalPrice:'金额',
        ordinary:'普通会员',
        silver:'白银会员',
        gold:'黄金会员',
        platinum:'白金会员',
        jewel:'钻石会员',
        super:'超级会员',
      }
      return typeLabel[type] || '';
    },



    // 结算单个商品的总价
    settlementTotal(_item){
      this.totalPrice = this.settleTotalPrice();
      return Number(_item.goodsPrice) *Number(_item.soldNum)   
    },
    //计算全部的总价
    settleTotalPrice(){
      let _totalPrice = 0;
      for (let i = 0; i < this.sellGoodsData.length; i++) {
        let _item = this.sellGoodsData[i];
        let _sum = Number(_item.goodsPrice) *Number(_item.soldNum)
        _totalPrice += _sum; 
      }
      return _totalPrice
    },
    // 选择文件
    handleChange(file, fileList) {
      console.log(file);
      const spl = file.name.split('.');
      var _fileSuffix = spl[spl.length - 1];
      if ( _fileSuffix !== 'png' &&  _fileSuffix !== 'jpg' ) {
        this.$message.error('文件格式不符，请上传png/jpg格式的文件');
        this.stockFileList = [];
        return false;
      }
      this.stockFileList = fileList.slice(-1);
      // 选择一个商品后 请求服务端  获取商品的数据  渲染列表
      const that = this;
      var uploadBody = new FormData();
      uploadBody.append('file',file.raw)
      that.dataListLoading = true;
      getBuyGoods(uploadBody).then(res=>{
        if(res && res.code === 200){
          that.sellGoodsData.push(res.data);
          that.totalPrice = that.settleTotalPrice();
          that.stockFileList = [];  
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
    //获取对应的折扣
    getDiscount(){
      this.discountTotal = this.formatNum((1-Number(this.totalDiscount))* Number(this.totalPrice),1);
      return this.discountTotal;
    },
    // 获取折扣后的总价格
    getEndPrice(){
      return this.formatNum(this.totalPrice - this.getDiscount(),1) ;
    },
    formatNum(f, digit) { 
      var m = Math.pow(10, digit); 
      return parseInt(f * m, 10) / m; 
    },
    // 提交手机号码
    handlePhone(){
      const that = this;
      this.submitLoading = true;
      getMemberInfo(that.mobile).then(res =>{
        if(res && res.code === 200){
          that.totalDiscount = res.data.discount;
          that.memberId = res.data.id;
          that.memberLevel = res.data.levelName;
        }else{
          that.$message.error(res.msg)
        }
        that.submitLoading = false;
      }).catch()
    },
    //付款时所提交的列表
    setPaymentList(){
      var _arr = [];
      this.sellGoodsData.forEach((item,index) => {
        _arr[index]={goodsId:item.id,soldNum:item.soldNum}
      });
      return _arr;
    },
    //付款
    endSettlement(){
      this.goods = this.setPaymentList();
      const that = this;
      this.submitLoadings = true;
      setPayment({
        goods:this.goods,
        id:this.memberId,
        discountTotal:this.discountTotal+'',
      }).then(res =>{
        if(res && res.code=== 200){
          that.$message.success('付款成功');
          setTimeout(() => {
            that.closeAllInfo();
          }, 500);
        }else{
          that.$message.error(res.msg);
        }
        that.submitLoadings = false;
      })
    },
    closeAllInfo(){
      this.sellGoodsData = [];
      this.mobile = '';
      this.memberLevel = '';
      this.memberId = null;
      this.discountTotal = '0';
      this.totalPrice = 0;
      this.totalDiscount = 1;
    },
  }
}
</script>

<style lang="scss" scoped>

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
      font-family: '楷体';
      
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
      .tip{
        font-size: 14px;
        font-weight: 400;
        color: red
      }
      .btn{
        margin: 80px 0 0  60px ;
      }
    }
  }

</style>