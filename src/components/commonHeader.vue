<template>
  <div class="header">
    <span class="title">{{ info }}</span>
    <el-button icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
  </div>
</template>
<script>
export default {
  name: "commonHeader",
  data() {
    return {
      info: "研发后台管理系统",
    };
  },
  methods:{
    handleMenu(){
        this.$store.commit('collapseMenu')
    }
  }
};
</script>
<style scoped>
.header {
  height: 60px;
  width: 100%;
  background: #001529;
  font-weight: 20px;
  color: #ccc;
  line-height: 60px;
  font-size: 20px;
  
}
.title {
  font-weight: 20px;
  color: #ccc;
  padding-right: 20px;
  padding-left:20px;
}
</style>
