<template>
  <div style="padding:20px">
    <HeadTop/>
    <h2>商品详情</h2>
    <el-form :model="dataForm" :rules="rules" ref="dataForm" label-width="140px">
      <el-card>
            <el-row>
              <el-col :span="10">
                <el-form-item label="商品名称" prop="goodsName">
                  <el-input v-model="dataForm.goodsName" placeholder="请输入商品名称" show-word-limit maxlength=12
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item >
                  <el-radio v-model="dataForm.goodsStatus" :label=1 >上架</el-radio>
                  <el-radio v-model="dataForm.goodsStatus" :label=0>下架</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="商品编号" prop="goodsCode">
              <el-input v-model="dataForm.goodsCode" placeholder="请输入商品编号" show-word-limit maxlength=12 style="width:300px"
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="商品类别" >
              <el-select v-model="dataForm.categoryName" clearable placeholder="商品类别">
                <el-option
                  v-for="item in goodsTypeList"
                  :key="item.id"
                  :label="item.categoryName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="商品图片" prop="goodsImgUrl">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :auto-upload='false'>
                <img v-if="dataForm.goodsImgUrl" :src="dataForm.goodsImgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item> -->
            <el-form-item label="单位" prop="goodsUnit">
              <el-input v-model="dataForm.goodsUnit" placeholder="请输入商品编号" show-word-limit maxlength=6 style="width:300px"
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="供应商" >
              <el-select v-model="dataForm.supplierName" clearable placeholder="请选择">
                <el-option
                  v-for="item in supplierTypeList"
                  :key="item.id"
                  :label="item.supplierName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="进价" prop="goodsBid">
              <el-input v-model="dataForm.goodsBid" placeholder="请输入商品进价" show-word-limit maxlength=6
                        clearable style="width:300px"></el-input><span class="tip">&nbsp;&nbsp;元</span>
            </el-form-item>
            <el-form-item label="售价" prop="goodsPrice">
              <el-input v-model="dataForm.goodsPrice" placeholder="请输入商品售价" show-word-limit maxlength=6
                        clearable style="width:300px"></el-input><span class="tip">&nbsp;&nbsp;元</span>
            </el-form-item>
            <el-form-item label="库存" prop="goodsStock">
              <el-input v-model="dataForm.goodsStock" placeholder="请输入商品库存" show-word-limit maxlength=6
                        clearable style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="所获积分" prop="goodsPoints">
              <el-input v-model="dataForm.goodsPoints" placeholder="请输入所获得的积分" show-word-limit maxlength=6
                        clearable style="width:300px"></el-input>
            </el-form-item>
      </el-card>
      <el-card style="margin-top:20px">
        <el-form-item>
          <el-button type="success" @click="submitForm" :loading="submitLoading">保存</el-button>
          <el-button type="warning" @click="cancelForm" :loading="submitLoading">取消</el-button>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import HeadTop from "../../components/headTop";
import { getGoods,addGoods,editGoods,getSupplierList,getChildrenType } from "@/api/goods";
export default {
  data(){
    const priceRequire = (rule, value, callback) => {
      if (!String(value).match(/^\+?[0-9]?(\.[0-9]{1,2})*$/)) {
        callback(new Error('请输入最多保留 2 位小数的数值'));
      } else {
        callback();
      }
    }
    const goodsStockRequire = (rule, value, callback) => {
      if (!String(this.dataForm.goodsStock).match(/^\+?[1-9]\d*$/)) {
        callback(new Error('请输入大于0的整数'));
      }else{
        callback();
      }
    }
    const goodsPointsRequire = (rule, value, callback) => {
      if (!String(this.dataForm.goodsPoints).match(/^\+?[1-9]\d*$/)) {
        callback(new Error('请输入大于0的整数'));
      }else{
        callback();
      }
    }
    const goodsCodeRequire =  (rule, value, callback) => {
      if (!String(this.dataForm.goodsCode).match(/^\+?[1-9]\d*$/)) {
        callback(new Error('请输入大于0的整数'));
      }else{
        callback();
      }
    }
    return{
      submitLoading:false,
      dataForm:{
        id:this.$route.query['id']||'',
        goodsName:'',
        goodsStatus:1,
        goodsCode:'',
        categoryName:'',//商品类别
        goodsUnit:'',
        supplierName:'',
        goodsBid:'',
        goodsPrice:'',
        goodsStock:'',
      },
      goodsTypeList:[],
      supplierTypeList:[],
      rules:{
        goodsName:[
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        goodsCode:[
          { required: true, message: '请输入商品编号', trigger: 'blur' },
          { required: true, trigger: 'change', validator: goodsCodeRequire }
        ],
        goodsImgUrl:[
          { required: true, message: '请选择商品图片', trigger: 'blur' },
        ],
        goodsUnit:[
          { required: true, message: '请输入商品单位', trigger: 'blur' },
        ],
        goodsBid:[
          { required: true, message: '请输入商品进价', trigger: 'blur' },
          { required: true, trigger: 'change', validator: priceRequire }
        ],
        goodsPrice:[
          { required: true, message: '请输入商品售价', trigger: 'blur' },
          { required: true, trigger: 'change', validator: priceRequire }
        ],
        goodsStock:[
          { required: true, message: '请输入库存量', trigger: 'blur' },
          { required: true, trigger: 'change', validator: goodsStockRequire }
        ],
        goodsPoints:[
          { required: true, message: '请输入获得的积分', trigger: 'blur' },
          { required: true, trigger: 'change', validator: goodsPointsRequire }
        ],
      }
    }
  },
  components: {
    HeadTop,
  },
  mounted(){
    this.getGoodsInfo();
    this.getSupplierInfo();
    this.getNodeTypeInfo();
  },
  methods: {
      getGoodsInfo(){
        const that = this;
        if(that.dataForm.id){
          getGoods(that.dataForm.id).then(res=>{
            if(res && res.code === 200){
              that.dataForm = res.data;
            }else{
              that.$message.error(res.msg)
            }
          }).catch(err=>{
            that.$message.error(err)
          })
        }
      },

      //保存修改
      submitForm(){
        const that = this;
        that.$refs.dataForm.validate(valid => {
          if (!valid) {
            this.$message.error('请填写完整再保存');
            return false;
          }
          that.submitLoading = true;
          const submitFun = that.dataForm.id ? editGoods : addGoods;
          submitFun(that.dataForm.id,that.dataForm).then(res=>{
            console.log('res:',res);
            if(res && res.code === 200){
              that.$router.push({
                path: '/goods-manage-goods',
              })
            }else{
              that.$message.error(res.msg)
            }
            that.submitLoading = false;
          }).catch(err=>{
            that.$message.error(err)
            that.submitLoading = false;
          })
        });
      },

      cancelForm(){
        this.$router.push({
          path: '/goods-manage-goods',
        });
      },

      getSupplierInfo(){
        const that = this;
        getSupplierList({
          page:0,
          size:100,
        }).then(res=>{
          if(res && res.code === 200){
            that.supplierTypeList = res.data.rows;
          }else{
            that.$message.error(res.msg)
          }
        },()=>{
        })
      },

      getNodeTypeInfo(){
        var _nodeId = this.$route.query['typeId']
        const that = this;
        getChildrenType(_nodeId).then(res=>{
          if(res && res.code === 200){
            that.goodsTypeList = res.data;
          }
        })
      },

      handleAvatarSuccess(res, file) {
        this.dataForm.goodsImgUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
}
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .tip {
    color: #999999;
    font-size: 12px;
  }
</style>
