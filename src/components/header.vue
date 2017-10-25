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
	var fkybridge = require('../common/js/fkybridge.js');
	var tool= require('../common/js/tool.js')
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
				console.log(this.$common.publicData)
				this.$axios.post('/jiekou/passport/api/user/userLogin', {
					"username": 'testzd',
					"password": 'q123456'
				}, {
					headers: this.$common.publicData
				}).then((reponse) => {
					var data = reponse.data.data
					console.log(reponse.data)
					if(reponse.data==0){
					this.$common.setLocalStorage('stationName', encodeURIComponent(data.stationName))
					this.$common.setLocalStorage('city_id', data.station)
					this.$common.setLocalStorage('token', data.token)
					this.$common.setLocalStorage('result', data.result)
					this.$common.setLocalStorage('username', data.userName)
					this.$common.setLocalStorage('avatarUrl', data.avatarUrl)
					this.$common.setLocalStorage('enterpriseName', data.enterpriseName)
					this.$common.setLocalStorage('nameList', data.nameList)
					this.$common.setLocalStorage('userId', data.userId)						
					}

				})
			}
		}

	}
</script>

<style lang="less">
	@import '../assets/styles/register.less';
</style>