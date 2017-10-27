<template>
	<div class="container">
		<h1 class="logo">
        <img src="../assets/img/logo.png" alt="1号药城" />
    </h1>
		<div class="login_container">
			<div class="afterLine">
				<input type="text" name="username" class="login_username" placeholder="用户名" />
				<i class="btn btn_delete"></i>
			</div>
			<div class="afterLine">
				<input type="text" name="password" class="input_password" placeholder="密码" />
				<i class="btn btn_look look_hide"></i>
			</div>
			<p class="forget_password">
				<span class="login_error">用户名或者密码错误，请重试</span>
				<a href="/find_psw.html">点击找回密码></a>
			</p>
			<a href="javascript:;" class="btn_next btn_submit">登录</a>
			<a href="register.html" class="btn_next btn_register">注册</a>
			<div class="weixin">
				<p><span>用其他方式登录</span></p>
				<a href="javascript:void(0)" class="btn_next btn_weixin"></a>
			</div>
		</div>

	</div>

</template>

<script>
	import {
		Toast,
		Loadmore,
		TabContainer,
		TabContainerItem,
		Indicator,
		MessageBox
	} from "mint-ui";	
	var fkybridge = require('../common/js/fkybridge.js');
	var tool= require('../common/js/tool.js')
	var axios= require('../common/js/axios01.js').default
	export default {
		name: 'header',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		created: function() {
			this.getData()
		},
		methods: {
			common: function() {
				this.$common.setBaseRem()
			},
			getData: function() {
				console.log(axios)
				axios('passport/api/user/userLogin',{
					"username": 'testzd',
					"password": 'q123456'
				}).then((data) => {
					console.log(data)
				
				})
				
			}
		}

	}
</script>

<style lang="less">
	@import '../assets/styles/register.less';
</style>