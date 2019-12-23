<template>
	<div class="fillcontain">
		<el-row style="height: 100%; position: fixed ;width:100%" class="tac">
	  		<el-col :span="4" style="min-height: 100%; background-color: #545c64; ">
					<div class="head">
						便利店
					</div>
					<el-menu
					default-active="2"
					class="el-menu-vertical-demo"
					text-color="#fff"
					background-color="#545c64"
					:unique-opened='true'
					style="min-height: 100%; " router theme="dark">
					<el-menu-item index="/home"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-suitcase-1"></i>
							<span>商品管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/goods-manage-goods" style="padding-left: 60px;">商品列表</el-menu-item>
							<!-- <el-menu-item index="/goods-manage-goodsList" style="padding-left: 60px;">商品列表</el-menu-item> -->
							<el-menu-item index="/goods-manage-inventoryList" style="padding-left: 60px;">库存管理</el-menu-item>
							<el-menu-item index="/goods-manage-supplierList" style="padding-left: 60px;">供应商列表</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-notebook-1"></i>
							<span>销售管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/sales-manage-checkstand" style="padding-left: 60px;">收银台</el-menu-item>
							<el-menu-item index="/sales-manage-salesRecord" style="padding-left: 60px;">销售记录</el-menu-item>
							<!-- <el-menu-item index="/sales-manage-totalSales" style="padding-left: 60px;">销售统计</el-menu-item> -->
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-user"></i>
							<span>用户管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/user-manage-memberList" style="padding-left: 60px;">会员列表</el-menu-item>
							<el-menu-item index="/user-manage-staffList" style="padding-left: 60px;">店员列表</el-menu-item>
							<el-menu-item index="/user-manage-userInfo" style="padding-left: 60px;">个人信息</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
import HeadTop from "../components/headTop";
    export default {
			computed: {
				defaultActive: function(){
					return this.$route.path.replace('/', '');
				}
			},
			components: {
				HeadTop,
			},
    }
</script>


<style lang="scss" scoped>
.fillcontain{
	width: 100%;
	height: 100%;
}
.head{
	min-width: 180px;
	height: 60px;
	color: aquamarine;
	text-align: center;
	line-height: 60px;
	font-size: 28px;
}

.el-submenu .el-menu-item {
    min-width: 180px;
}
</style>
