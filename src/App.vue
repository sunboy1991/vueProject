<template>
	<div id="app">

		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
//		created: function () {
//			var url = 'http://m.yaoex.com/manage/api/self/listAd';
//			this.$http.get(url,{params:{'station':210000,'type':1}}).then(function(data) {
//				var dataBaner = data.body.data;
//				this.msg =dataBaner.banner
//				console.log(dataBaner)
//			}, function(response) {
//				console.log(response)
//			})
//		}
	}
	
</script>

<style  lang="less">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;

	}
		img{
		width: 100%;	
		}	
</style>