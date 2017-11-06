<template>
    <div class="container">
    	<section class="search_container">
	      <div class="dropdown_box">
	        <input id="search_select" class="search_select" type="text"  value="默认" readonly>
	        <ul id="select_city" class="select_city">
	        </ul>
	      </div>
	      <a class="search_input" >
	        <input id="search_input"  type="text"  placeholder="药品名/拼音缩写/厂家名/供应商" readonly></a>
    	</section>
      <div class="scroll-wrapper">
        <!-- 图片轮播-->
        <section class="swiper_container swiper-hlimmit">
         <div class="swiper-wrapper" >
        <div class="swiper-slide" v-for="item in banner">
          <a class="slidea">
            <img v-bind:src='item.imgPath' alt="M药城">
          </a>
        </div>
        
      </div>
        </section>
        <!-- end -->
        <!--快速入口-->
        <div class="fast_entrance">
        	<div class="fast_buy">
        		<p><b>快速采购</b></p>
        		<p>快速下单常购商品</p>
        	</div>
        	<div class="shoper">
        		<p><b>店铺馆</b></p>
        		<p>认证店铺优质货源</p>
        	</div>
        </div>
        <!--新闻滚动-->
        <div class="news_list" >
        	<div id="news_list">
        	</div>
        </div>
        <!--主推活动-->
        <div class="bigActivity">
        </div>
        <!--排行榜-->
        <div class="top_list">
        </div>
				<!--广告-->
				<div class="ad">
					
				</div>
				<!--黄金单品-->
				<div class="sku">
				</div>
				<!--中西成药 -->
        <div class="medicineBox">
        	
        </div>
				<div class="brand">
				</div>
        <!-- 推荐商业 -->
        <div class="recommend_business">
        	<h2>推荐供应商</h2>
        	<div class="businessBox"></div>
        </div>
        <!--类目热销榜 -->
        <div class="category_list">
       	</div>
        <!-- end -->
        <div class="mask"></div>
		    <div class="tip_down">正在加载</div>
		    <div class="product_buy">
		        <p>
		            <i class="btn_reduce_number left"></i>
		            <input type="number" name="number" class="product_number"  />
		            <i class="btn_add_number btn_add_number_ok right"></i>
		        </p>
		        <p class="product_buy_info">
		            <span class="left">库存：</span>
		            <span class="right js_stock"></span>
		        </p>
		        <p class="product_buy_info">
		            <span class="left">最小可拆零包装：</span>
		            <span class="right js_min"></span>
		        </p>
		        <p class="error_msg"></p>
		        <a href="javascript:" class="btn_next_ok js_add_list">加入进货单</a>
		    </div>
    	</div>
			<!--引导下载-->
			<div class="Boot_download">
				<div class="close_img">
					<img src="images/down/Cancel@2x.png"/>
				</div>
				<div class="logo_img">
					<img src="images/down/logo@2x.png"/>
				</div>	
				<div class="word_content">
					<h1>1号药城APP</h1>
					<p>掌上采购 智慧链接 价值共享</p>
				</div>	
				<div class="go_now">
				
				<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yiwang.fangkuaiyi">
				<img src="images/down/gonow.png" alt="" />	
				</a>
				</div>					
			</div>    	
    	<!-- 底部菜单 -->
      <footer class="footer" style="display: none;">
        <ul class="bot_menu_ul">
          <li class="on">
            <a href="index.html" title="">
              <span class="nav_ico nav_ico1"></span>
              <span class="world">首页</span>
            </a>
          </li>
          <li>
            <a href="classify.html" title="">
              <span class="nav_ico nav_ico2"></span>
              <span class="world">分类</span>
            </a>
          </li>
          <li>
            <a href="shopcar.html" title="">
              <span class="shop_car nav_ico nav_ico3">
                <i class="shop_count">3</i>
              </span>
              <span class="world">购物车</span>
            </a>
          </li>
          <li>
            <a href="user_center.html" title="">
              <span class="nav_ico nav_ico4"></span>
              <span class="world">我</span>
            </a>
          </li>
        </ul>
      </footer>
    </div>	
</template>

<script>
	import common from '@/common/js/common.js'

	import newindex from '@/components/newindex.vue'
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
		var Swiper = require('../common/js/swiper.js')
	console.log(Swiper)
	export default {
		name: 'header',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				isActive: false,
				banner:[],
			}
		},
		created: function() {
						this.getData()
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
			getData: function() {
				console.log('000000')
				this.$axios('manage/api/mobileIndex/listIndexFloor', {'gettype':false}).then((data) => {
					var data = data.data
					this.banner=data.BannerList
				new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    loop: false,
                    autoplay: 2000,
                    onTouchEnd: function (swiper, event) {
                        /* if(swiper.activeIndex == 2){
                         window.location='index.html'
                         }*/
                    }
                })
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
	@import '../assets/styles/tryindex.less';
</style>