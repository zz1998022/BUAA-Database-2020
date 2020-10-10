<template>
  <a-layout>
    <MyHeader head_index="3"></MyHeader>
    <a-layout class="a-layout">
        <router-view />
    </a-layout>
  </a-layout>
</template>
<script>
import MyHeader from "./layout/myheader";
import MySidebar from "./layout/mysidebar";
import MyBread from "./layout/mybreadcrumb";
import MyCollection from "@/components/manage/manufacturer/mycollection.vue";

export default {
  components: {
    MyHeader,
    MySidebar,
    MyBread,
    MyCollection,
  },
};
</script>

<style>
.space-class {
  margin-bottom: 0px;
}

#pbbml {
  background-color: #fff;
}
</style>
