<template>
  <div>
    <el-container style="">
      <el-header style="padding: 0!important;"> 
        <common-header></common-header>  
      </el-header>
     
      <el-container>
        <el-aside width="auto">
        
          <common-aside></common-aside>
          

        </el-aside>

       
        <el-main>
           <common-tab></common-tab>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>

import commonAside from "@/components/commonAside";
import commonHeader from "@/components/commonHeader";
import commonTab from '@/components/commonTab';


export default {
  name: "homePage",
  components: {
    commonAside,
    commonHeader,
    commonTab,
  }
};
</script>
    CommonTab

<style>

html {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
::v-deep el-header{
  padding: 0 !important;
  margin: 0;
}

</style>
