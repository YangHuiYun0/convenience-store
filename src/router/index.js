import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const main = r => require.ensure([], () => r(require('@/page/main')), 'main');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const typeList = r => require.ensure([], () => r(require('@/page/goods-manage/typeList.vue')), 'typeList');

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
    ]
  }
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
