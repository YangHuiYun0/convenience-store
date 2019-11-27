import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const main = r => require.ensure([], () => r(require('@/page/main')), 'main');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const typeList = r => require.ensure([], () => r(require('@/page/goods-manage/typeList.vue')), 'typeList');
const goods = r => require.ensure([], () => r(require('@/page/goods-manage/goods.vue')), 'goods');
const goodsList = r => require.ensure([], () => r(require('@/page/goods-manage/goodsList.vue')), 'goodsList');
const goodsDetails = r => require.ensure([], () => r(require('@/page/goods-manage/goodsDetails.vue')), 'goodsDetails');
const supplierList = r => require.ensure([], () => r(require('@/page/goods-manage/supplierList.vue')), 'supplierList');
const inventoryList = r => require.ensure([], () => r(require('@/page/goods-manage/inventoryList.vue')), 'inventoryList');
const memberList = r => require.ensure([], () => r(require('@/page/user-manage/memberList.vue')), 'memberList');
const userInfo = r => require.ensure([], () => r(require('@/page/user-manage/userInfo.vue')), 'userInfo');
const staffList = r => require.ensure([], () => r(require('@/page/user-manage/staffList.vue')), 'staffList');
const checkstand = r => require.ensure([], () => r(require('@/page/sales-manage/checkstand.vue')), 'checkstand');
const salesRecord = r => require.ensure([], () => r(require('@/page/sales-manage/salesRecord.vue')), 'salesRecord');
const totalSales = r => require.ensure([], () => r(require('@/page/sales-manage/totalSales.vue')), 'totalSales');
const routes = [
	{
		path: '/',
		component: login
  },
  {
    path:'/main',
    component:main,
    name:'',
    children: [{
			path: '/home',
			component: home,
			meta: [],
    },{
			path: '/goods-manage-typeList',
			component: typeList,
      meta: ['商品管理', '商品类别'],
    },
    {
			path: '/goods-manage-goods',
			component: goods,
      meta: ['商品管理', '商品'],
    },
    {
			path: '/goods-manage-goodsList',
			component: goodsList,
      meta: ['商品管理', '商品列表'],
    },
    {
			path: '/goods-manage-goodsDetails',
			component: goodsDetails,
      meta: ['商品管理', '商品列表','商品编辑'],
    },
    {
			path: '/goods-manage-supplierList',
			component: supplierList,
      meta: ['商品管理', '供应商列表'],
    },
    {
			path: '/goods-manage-inventoryList',
			component: inventoryList,
      meta: ['商品管理', '库存管理'],
    },

    {
			path: '/user-manage-memberList',
			component: memberList,
      meta: ['用户管理', '会员列表'],
    },
    {
			path: '/user-manage-staffList',
			component: staffList,
      meta: ['用户管理', '店员列表'],
    },
    {
			path: '/user-manage-userInfo',
			component: userInfo,
      meta: ['用户管理', '个人信息'],
    },

    {
			path: '/sales-manage-checkstand',
			component: checkstand,
      meta: ['销售管理', '收银台'],
    },
    {
			path: '/sales-manage-salesRecord',
			component: salesRecord,
      meta: ['销售管理', '销售记录'],
    },
    {
			path: '/sales-manage-totalSales',
			component: totalSales,
      meta: ['销售管理', '销售统计'],
    },
    ]
  }
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
