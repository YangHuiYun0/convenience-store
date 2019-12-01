
<template>
  <div>
    <HeadTop/>
     <div class="tables" style="padding:20px">
      <el-row style="width: 100%">
        <el-col :xs="10" :sm="10" :md="8" :lg="6" :xl="4"  class="aside">
          <div v-loading="isLoading" class="comp-tree">
		        <el-button class="comp-tr-top" 
              type="primary" 
              size="small" 
              @click="handleAddTop">添加顶级节点</el-button>
            <el-tree ref="SlotTree"
              :data="setTree"
              :props="defaultProps"
              :expand-on-click-node="false"
              highlight-current
              :node-key="NODE_KEY"
              :accordion='true'>
                <div class="comp-tr-node" slot-scope="{ node, data }">
                  <!-- 编辑状态 -->
                  <template v-if="node.isEdit">
                    <el-input v-model="data.name" 
                      autofocus
                      size="mini"
                      :ref="'slotTreeInput'+data[NODE_KEY]"
                      @blur.stop="handleInput(node, data)"
                      @keyup.enter.native="handleInput(node, data)"></el-input>
                  </template>
                  <!-- 非编辑状态 -->
                  <template v-else>
                    <!-- 名称： 新增节点增加class（is-new） -->
                    <span :class="[data[NODE_KEY] < NODE_ID_START ? 'is-new' : '', 'comp-tr-node--name']">
                      {{ node.label }}
                    </span>
                    <span class="comp-tr-node--btns">
                      <!-- 新增 -->
                      <el-button icon="el-icon-plus"   size="mini"    circle   type="primary"  @click="handleAdd(node, data)"></el-button>
                      <el-button icon="el-icon-edit"   size="mini"  circle   type="info"  @click="handleEdit(node, data)"></el-button>
                      <el-button icon="el-icon-delete"   size="mini"  circle   type="danger"  @click="handleDelete(node, data)"></el-button>
                    </span>
                  </template>
                </div>
              </el-tree>
          </div>
        </el-col>
        <el-col :xs="14" :sm="14" :md="16" :lg="18" :xl="20" style="padding:10px">
          <div style="margin-bottom:20px;text-align: right">
            <el-button type="danger" class="el-icon-delete" >删除选中</el-button>
            <el-button type="success" class="el-icon-plus" @click="addGoods" >增加商品</el-button>
          </div>
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
          <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page=page
            :total=totalList
            :page-size=pageSize
            @current-change="currentChangeHandle">
          </el-pagination>
        </el-col>
      </el-row>
     </div>
  </div>

</template>

<script>
import HeadTop from "../../components/headTop";
export default{
	data(){
		return {
			isLoading: false,// 是否加载
			NODE_KEY: 'id',// id对应字段
			MAX_LEVEL: 2,// 设定最大层级
			NODE_ID_START: 0,// 新增节点id，逐次递减
			startId: null,
			defaultProps: {// 默认设置
				children: 'children',
				label: 'name'
			},
			initParam: {// 新增参数
				name: '新增节点',
				pid: 0,
				children: []
      },
      setTree:[
        {  
          id: 1,  
          name: "饮料",  
          ProSort: 1,  
          remark: "大类",
          pid: '',
          isEdit: false,
          children: [
            {
              id: 35,
              name: "果汁",
              pid: 1,
              remark: '',
              isEdit: false,
            },{
              id: 36,
              name: "碳酸饮料",
              pid: 1,
              remark: '',
              isEdit: false,
            },
          ]
        },{  
          id: 2,  
          name: "学习用品",  
          ProSort: 2,  
          remark: "大类",
          pid: '',
          isEdit: false,
          children: [
            {
              id: 37,
              name: "笔",
              pid: 1,
              remark: '',
              isEdit: false,
            },{
              id: 38,
              name: "本子",
              pid: 1,
              remark: '',
              isEdit: false,
            },
          ]
        },
      ],
      // =========表格===========
      page:0,
      totalList:3,
      pageSize:12,
      dataListLoading:false,
      goodsType:'',//商品类别
      supplier:'',//供应商
      name:'',//商品名称
      goodsTypeList:[{id:'',label:'请选择'},{id:'1',label:'饮料汽水'},{id:'2',label:'膨化零食'}],
      supplierTypeList:[{id:'',label:'请选择'},{id:'1',label:'平板农场'},{id:'2',label:'沃尔玛场'}],
      goodsTable:['index','goodsId','goodsType','name','unit','supplier','purchasePrice','integral','sellPrice','inventory'],
      goodsData:[{},{},{},{},{},{},{},{},{},{},{},{},],
		}
	},
	created(){
		// 初始值
		this.startId = this.NODE_ID_START
  },
  components: {
    HeadTop,
  },
	methods: {
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
        inventory:'库存',
        integral:'积分',
      }
      return typeLabel[type] || '';
    },
		handleDelete(_node, _data){// 删除节点
			console.log(_node, _data)
			// 判断是否存在子节点
			if(_data.children && _data.children.length !== 0){
				this.$message.error("此节点有子级，不可删除！")
				return false;
			}else{
				// 删除操作
				let DeletOprate = () => {
					this.$nextTick(() => {
						if(this.$refs.SlotTree){
							this.$refs.SlotTree.remove(_data)
							this.$message.success("删除成功！")
						}
					})
				}
				// 二次确认
				let ConfirmFun = () => {
					this.$confirm("是否删除此节点？","提示",{
						confirmButtonText: "确认",
						cancelButtonText: "取消",
						type: "warning"
					}).then(() => {
						DeletOprate()
					}).catch(() => {})
				}

				// 判断是否新增： 新增节点直接删除，已存在的节点要二次确认
				_data[this.NODE_KEY] < this.NODE_ID_START ? DeletOprate() : ConfirmFun()
			}
		},
		handleInput(_node, _data){// 修改节点
			console.log(_node, _data)
			// 退出编辑状态
			if(_node.isEdit){
				this.$set(_node, 'isEdit', false)
			}
		},
		handleEdit(_node, _data){// 编辑节点
			console.log(_node, _data)
			// 设置编辑状态
			if(!_node.isEdit){
				this.$set(_node, 'isEdit', true)
			}
			// 输入框聚焦
			this.$nextTick(() => {
				if(this.$refs['slotTreeInput'+_data[this.NODE_KEY]]){
					this.$refs['slotTreeInput'+_data[this.NODE_KEY]].$refs.input.focus()
				}
			})
		},
		handleAdd(_node, _data){// 新增节点
			console.log(_node, _data)
			// 判断层级
			if(_node.level >= this.MAX_LEVEL){
				this.$message.warning("当前已达到"+ this.MAX_LEVEL + "级，无法新增！")
				return false;
			}
			let obj = JSON.parse(JSON.stringify(this.initParam));// copy参数
			obj.pid = _data[this.NODE_KEY];// 父id
			obj[this.NODE_KEY] = --this.startId;// 节点id：逐次递减id
			// 判断字段是否存在
			if(!_data.children){
				this.$set(_data, 'children', [])
			}
			// 新增数据
			_data.children.push(obj)

			// 展开节点
			if(!_node.expanded){
				_node.expanded = true
			}
		},
		handleAddTop(){// 添加顶部节点
			let obj = JSON.parse(JSON.stringify(this.initParam));// copy参数
			obj[this.NODE_KEY] = --this.startId;// 节点id：逐次递减id
			this.setTree.push(obj)
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
</script>

<style lang="scss">
  .aside{
    border-right: 1px solid #e6e9f0;
    height: 820px;
    background-color: #FAFAFA;
  }
  .el-tree{
    background-color:transparent;
  }
	.show-btns{
		opacity: 1;
	}
	.comp-tree{
		width: 100%;
		max-width: 700px;
		max-height: 80vh;
		padding: 2em;
		overflow: auto;
		// 顶部按钮
		.comp-tr-top{
			width: 100px;
			margin-bottom: 2em;
		}
		// 自定义节点
		.comp-tr-node{
			.comp-tr-node--name{
				display: inline-block;
				line-height: 40px;
				min-height: 40px;
			}
			.comp-tr-node--btns{
				margin-left: 10px;
				opacity: 0;
				transition: opacity .1s;
				.el-button{
					transform: scale(0.8);// 缩小按钮
					& + .el-button{
						margin-left: -1px;
					}
				}
			}
		}
		// 悬浮显示按钮
		.el-tree-node__content{
			&:hover{
				.comp-tr-node--btns{
					@extend .show-btns;
				}
			}
		}
	}
  .el-tree-node__content{width: 200px;}

  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #f0f7ff;
    width: 200px;}

   .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #76b852;
    color: #FFF;
  }
  .el-table__header-wrapper thead div {
    background-color: 	#76b852;
  }
  .el-table th {
    background-color: #76b852;
  }
  .el-table thead{
    color: #363636;
  }
</style>