<template>
  <a-layout id="id_top">
    <MyHeader head_index="1"></MyHeader>
    <a-layout class="a-layout">
      <MySidebar />
      <a-layout id="pbbml" style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>交易中心</a-breadcrumb-item>
          <a-breadcrumb-item>手办</a-breadcrumb-item>
        </a-breadcrumb>
        <MyCollection></MyCollection>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import MyHeader from "./layout/myheader";
import MySidebar from "./layout/mysidebar";
import MyCollection from "../components/mycollection.vue";

export default {
  components: {
    // HelloWorld
    MyHeader,
    MySidebar,
    MyCollection,
  },
};
</script>

<style>
.space-class {
  margin-bottom: 0px;
}

#id_top {
  height: 100%;
}

#pbbml {
  background-color: #fff;
}
</style>
