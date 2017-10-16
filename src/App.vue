<template>
	<div id="app">
		<router-view></router-view>
		<div class="data">
			{{msg}}
		</div>
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
		created: function () {
			var url = 'http://m.yaoex.com/manage/api/mobileIndex/listIndexFloor';
			this.$http.post(url).then(function(data) {
				var json = data.body;
				this.msg = eval("(" + json + ")");
			}, function(response) {
				console.log(response)
			})
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>