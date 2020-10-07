<template>
  <a-layout-sider width="200" class="a-layout-sider">
    <a-menu
      mode="inline"
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="smile" />玩模管理</span>
        <a-menu-item key="1"> 厂商管理 </a-menu-item>
        <a-menu-item key="2"> 角色管理 </a-menu-item>
        <a-menu-item key="3"> GK模型 </a-menu-item>
        <!-- <a-menu-item key="4"> 手办表单 </a-menu-item> -->
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="pay-circle" />二手交易</span>
        <a-menu-item key="5"> 敬请期待 </a-menu-item>
        <a-menu-item key="6"> 敬请期待 </a-menu-item>
        <a-menu-item key="7"> 敬请期待 </a-menu-item>
        <a-menu-item key="8"> 敬请期待 </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title"><a-icon type="gift" />画个大饼</span>
        <a-menu-item key="9"> 敬请期待 </a-menu-item>
        <a-menu-item key="10"> 敬请期待 </a-menu-item>
      </a-sub-menu>
	  <a-sub-menu key="sub4">
	    <span slot="title"><a-icon type="loading" />正在加载</span>
	    <a-menu-item key="11"> 敬请期待 </a-menu-item>
	    <a-menu-item key="12"> 敬请期待 </a-menu-item>
	  </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: "Sidebar"
};
</script>

<style>
.a-layout-sider {
  background: #000;
}
</style>
