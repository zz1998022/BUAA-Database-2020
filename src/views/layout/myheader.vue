<template>
	<a-layout-header class="header" style="background: #fff">
		<div class="logo" />
		<a-menu id="gtcbml" theme="light" mode="horizontal" :default-selected-keys="[head_index]" :style="{ lineHeight: '64px' }">
			<a-menu-item key="1" class="menu-font">
				<router-link to="/" style="color: #fb7299">交易中心</router-link>
			</a-menu-item>
			<a-menu-item key="2" class="menu-font"> 还没写呢 </a-menu-item>
			<a-menu-item key="3" class="menu-font">
				<router-link to="/about" style="color: #fb7299">关于我们</router-link>
			</a-menu-item>
		</a-menu>
	</a-layout-header>
</template>

<script>
	export default {
		name: "Header",
		props: {
			head_index: String,
		},
		methods: {
			change() {
				alert("aaa");
				this.$router.push({
					path: '/about',
					params,
				})
			}
		}
	};
</script>

<style>
	.header {
		padding: 20px;
		position: relative;
		-webkit-box-shadow: 0 1px 1px rgba(18, 18, 18, .1);
		box-shadow: 0 1px 1px rgba(18, 18, 18, .1);
		z-index: 10;
		max-width: 100%;
	}

	#gtcbml {
		background-color: #fff;
	}

	.menu-font {
		color: #fb7299;
		font-weight: 700;
	}

	.logo {
		width: 120px;
		height: 31px;
		background: #fff;
		margin: 16px 28px 16px 0;
		float: left;
	}
</style>
