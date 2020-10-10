<template>
  <a-layout>
    <MyHeader head_index="2"></MyHeader>
    <a-layout class="back">
      <div class="s-skin-container">
        <!-- <a-layout id="pbbml" style="padding: 0 24px 24px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>关于我们</a-breadcrumb-item>
          </a-breadcrumb>
        </a-layout> -->
      </div>
      <div class="heroContent">
        <div style="font-size:200px">还没写呢</div>
      </div>
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

<style>
.back {
  background-color: #ffffff;
}
.s-skin-container {
  position: fixed;
  _position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
}

.heroContent {
  position: absolute;
  font-size: 18px;
  top: 50%;
  left: 50%;
  padding-top: 0;
  width: 100%;
  z-index: 999;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  color: rgba(255, 156, 180, 0.3);
}
</style>