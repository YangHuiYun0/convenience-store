<template>
  <div style="padding:20px">
    <HeadTop/>
    <h2>商品详情</h2>
    <el-form :model="dataForm" :rules="rules" ref="dataForm" label-width="140px">
      <el-card>
            <el-row>
              <el-col :span="10">
                <el-form-item label="商品名称" prop="name">
                  <el-input v-model="dataForm.name" placeholder="请输入商品名称" show-word-limit maxlength=12
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item >
                  <el-radio v-model="dataForm.status" :label=1 >上架</el-radio>
                  <el-radio v-model="dataForm.status" :label=0>下架</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="商品编号" prop="goodsId">
              <el-input v-model="dataForm.goodsId" placeholder="请输入商品编号" show-word-limit maxlength=6 style="width:300px"
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="商品类别" >
              <el-select v-model="dataForm.goodsType" clearable placeholder="商品类别">
                <el-option
                  v-for="item in goodsTypeList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品图片" prop="goodsImgUrl">
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
            </el-form-item>
            <el-form-item label="单位" prop="goodsUnit">
              <el-input v-model="dataForm.goodsUnit" placeholder="请输入商品编号" show-word-limit maxlength=6 style="width:300px"
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="供应商" >
              <el-select v-model="dataForm.supplier" clearable placeholder="请选择">
                <el-option
                  v-for="item in supplierTypeList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="进价" prop="purchasePrice">
              <el-input v-model="dataForm.purchasePrice" placeholder="请输入商品进价" show-word-limit maxlength=6
                        clearable style="width:300px"></el-input><span class="tip">&nbsp;&nbsp;元</span>
            </el-form-item>
            <el-form-item label="售价" prop="sellPrice">
              <el-input v-model="dataForm.sellPrice" placeholder="请输入商品售价" show-word-limit maxlength=6
                        clearable style="width:300px"></el-input><span class="tip">&nbsp;&nbsp;元</span>
            </el-form-item>
            <el-form-item label="库存" prop="inventory">
              <el-input v-model="dataForm.inventory" placeholder="请输入商品库存" show-word-limit maxlength=6
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
export default {
  data(){
    const priceRequire = (rule, value, callback) => {
      if (!String(value).match(/^\+?[0-9]{1,2}?(\.[0-9]{1,2})*$/)) {
        callback(new Error('请输入最多保留 2 位小数的数值'));
      } else {
        callback();
      }
    }
    const inventoryRequire = (rule, value, callback) => {
      if (!String(this.dataForm.inventory).match(/^\+?[1-9]\d*$/)) {
        callback(new Error('请输入大于0的整数'));
      }else{
        callback();
      }
    }
    return{
      dataForm:{
        name:'',
        status:1,
        goodsId:'',
        goodsType:'',//商品类别
        goodsImgUrl:'',
        goodsUnit:'',
        supplier:'',
        purchasePrice:'',
        sellPrice:'',
        inventory:'',
      },
      goodsTypeList:[{id:'',label:'请选择'},{id:'1',label:'饮料汽水'},{id:'2',label:'膨化零食'}],
      supplierTypeList:[{id:'',label:'请选择'},{id:'1',label:'平板农场'},{id:'2',label:'沃尔玛场'}],
      rules:{
        name:[
           { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        goodsId:[
          { required: true, message: '请输入商品编号', trigger: 'blur' },
        ],
        goodsImgUrl:[
          { required: true, message: '请选择商品图片', trigger: 'blur' },
        ],
        goodsUnit:[
          { required: true, message: '请输入商品单位', trigger: 'blur' },
        ],
        purchasePrice:[
          { required: true, message: '请输入商品进价', trigger: 'blur' },
          { required: true, trigger: 'change', validator: priceRequire }
        ],
        sellPrice:[
          { required: true, message: '请输入商品售价', trigger: 'blur' },
          { required: true, trigger: 'change', validator: priceRequire }
        ],
        inventory:[
          { required: true, message: '请输入库存量', trigger: 'blur' },
          { required: true, trigger: 'change', validator: inventoryRequire }
        ],
      }
    }
  },
  components: {
    HeadTop,
  },
  methods: {
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
