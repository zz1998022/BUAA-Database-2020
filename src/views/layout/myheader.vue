<template>
  <a-row type="flex" align="middle" class="header" style="background: #fff">
    <a-col :span="1"> </a-col>
    <a-col :span="2">
      <router-link to="/"><div class="logo">Figure Hub</div></router-link>
    </a-col>
    <a-col :span="20">
      <a-layout-header style="padding: 0; background: #fff">
        <a-menu
          id="gtcbml"
          theme="light"
          mode="horizontal"
          :default-selected-keys="[head_index]"
          :style="{ lineHeight: '63px', borderBottom: 'none' }"
        >
          <a-menu-item key="1" class="menu-font">
            <router-link to="/" style="color: #fb7299">首页</router-link>
          </a-menu-item>
          <a-menu-item key="2" class="menu-font">
            <router-link to="/market" style="color: #fb7299">市场</router-link>
          </a-menu-item>
          <a-menu-item key="3" class="menu-font">
            <router-link to="/manage" style="color: #fb7299">管理</router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-header>
    </a-col>
    <a-col :span="1"><a-avatar style="backgroundColor:#fb7299" icon="user" /></a-col>
  </a-row>
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
        path: "/about",
        params,
      });
    },
  },
};
</script>

<style>
.header {
  padding: 0px;
  position: relative;
  -webkit-box-shadow: 0 1px 1px rgba(18, 18, 18, 0.1);
  box-shadow: 0 1px 1px rgba(18, 18, 18, 0.1);
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
  font-size: 25px;
  font-family: myFont, Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: #fb7299;
  width: 100%;
}
</style>
