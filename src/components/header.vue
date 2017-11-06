<template>
	<div class="container">
		<h1 class="logo">
        <img src="../assets/img/logo.png" alt="1号药城" />
    </h1>
		<div class="login_container">
			<div class="afterLine">
				<input type="text" name="username" class="login_username" placeholder="用户名" ref="username" v-on:input="judgeCount" />
				<i class="btn btn_delete"></i>
			</div>
			<div class="afterLine">
				<input type="text" name="password" class="input_password" placeholder="密码" ref="password" v-on:input="judgeCount" />
				<i class="btn btn_look look_hide"></i>
			</div>
			<p class="forget_password">
				<span class="login_error">用户名或者密码错误，请重试</span>
				<a href="/find_psw.html">点击找回密码></a>
			</p>
			<a href="javascript:;" class="btn_next btn_submit " v-bind:class="{btn_next_ok: isActive}" v-on:click="loginBtn">登录</a>
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
	var tool = require('../common/js/tool.js')
//		import Swiper from '@/common/js/swiper.js'

	export default {
		name: 'header',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				isActive: false
			}
		},
		created: function() {
			//			this.judgeCount()
		},
		methods: {
			common: function() {
				this.$common.setBaseRem()
			},
			judgeCount: function() {
				if(this.$refs.username.value.length >= 6 && this.$refs.password.value.length >= 6) {
					this.isActive = true;
				} else {
					this.isActive = false;
				}

			},
			loginBtn: function() {
				if(this.isActive) {
					this.getData()
				}

			},
			getData: function() {
				console.log('000000')
				this.$axios('passport/api/user/userLogin', {
					"username": this.$refs.username.value,
					"password": this.$refs.password.value
				}).then((data) => {
					var data = data.data
                                                this.$common.setLocalStorage('city_name', data.stationName );
                                                this.$common.setLocalStorage('city_id', data.station);
                                                this.$common.setLocalStorage('token', data.token);
                                                this.$common.setLocalStorage('result',data.result);
                                                this.$common.setLocalStorage('username',data.userName);
                                                this.$common.setLocalStorage('avatarUrl',data.avatarUrl);
                                                this.$common.setLocalStorage('enterpriseName', data.enterpriseName);					
					Toast({
						message: data.remark,
						position: 'center',
						duration: 1000
					})
					if(data.result==0){
						this.$router.push({ name: 'newindex'})
					}
				}).catch((err) => {
					console.log(err)
				})

			}
		},
		watch: {

		}

	}
</script>

<style lang="less">
	@import '../assets/styles/register.less';
	@import '../assets/styles/lib/swiper.min.css';
</style>