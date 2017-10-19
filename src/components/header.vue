<template>
<div class="container">
    <header class="base_header">
      登录
    </header>
    <h1 class="logo">
        <img src="images/logo.png" alt="1号药城" />
    </h1>
    <div class="login_container">
        <div class="afterLine">
            <input type="text" name="username"  class="login_username" placeholder="用户名" />
            <i class="btn btn_delete"></i>
        </div>
        <div class="afterLine">
            <input type="text" name="password" class="input_password" placeholder="密码" />
            <i class="btn btn_look look_hide" ></i>
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
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		methods: {
			common: function() {
				this.$common.setBaseRem()
			}
		}
		
	}
</script>

<style lang="less">

@import '../../static/less/common.less';


</style>