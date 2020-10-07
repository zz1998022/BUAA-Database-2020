<template>
	<a-layout id="id_top">
		<MyHeader head_index="3"></MyHeader>
		<a-layout class="a-layout">
			<a-layout id="pbbml" style="padding: 0 24px 24px">
				<a-breadcrumb style="margin: 16px 0">
					<a-breadcrumb-item>关于我们</a-breadcrumb-item>
				</a-breadcrumb>
				<H1>Figure Hub</H1>
				<P>集搜索、销售、二手交易、用户分享于一体的手办交易平台。</P>
			</a-layout>
		</a-layout>
	</a-layout>
</template>

<script>
	import MyHeader from "./layout/myheader";

	export default {
		components: {
			MyHeader,
		},
	};
</script>

<style lang="css" scoped>
</style>
