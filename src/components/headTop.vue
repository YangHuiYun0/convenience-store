<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }"> <strong>首页</strong> </el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown @command="handleCommand" menu-align='start'>
      <img src="./image/default.jpg" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="" @click.native="handleClose()">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
import { getLogout } from "@/api/user";
    export default {
      data(){
        return{
          adminInfo:{id:''}
        }
      },
    	created(){
    		// if (!this.adminInfo.id) {
    		// 	this.getAdminData()
    		// }
    	},
    	computed: {
    	},
		methods: {
			handleClose(){
				this.$message({
					type: 'success',
					message: '退出成功'
				});
				// this.$router.push('/');
				getLogout().then()
			},
			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');
				}else if(command == 'signout'){
					const res = await signout()
					if (res.status == 1) {
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
	                    this.$router.push('/');
					}else{
						this.$message({
	                        type: 'error',
	                        message: res.message
	                    });
					}
				}
			},
		}
    }
</script>

<style lang="scss">

	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
  }
  .avator{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 37px;
  }

	.el-dropdown-menu__item{
		text-align: center;
	}
</style>

