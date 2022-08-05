<template>
  <header>
    <div class="l-content">
      <span class="title">{{ info }}</span>
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
      ></el-button>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current"><a href="/">{{ current.title}}</a></el-breadcrumb-item>
       
      </el-breadcrumb>
    </div>

    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link"
          ><img :src="userImg" class="user" /><i
            class="el-icon-arrow-down el-icon--right"
          ></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus" @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: "commonHeader",
  data() {
    return {
      info: "研发后台管理系统",
      userImg: require("../assets/avatar.png"),
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    logOut(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      location.reload()
    }
  },
  computed:{
    ...mapState({
      current:state => state.tab.currentMenu
    })
  }
};
</script>
<style scoped>
header {
  width: 100%;
    display: flex;
    justify-content: space-between;
    height:60px;
    background-color:#031d7c
}
.title {
  font-weight: 20px;
  color: #ccc;
  padding-right: 20px;
  padding-left: 20px;
}
.l-content{
  display:flex;
  align-items: center;
}
.r-content{
   padding-top:12px;
  padding-right:12px;
}
.r-content .user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
 
}

.breadcrumb{
  padding-left:30px;
  color:#efef
}
::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner{
  color:#efefef
}
::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner a{
  color:#fff
}
::v-deep .el-breadcrumb__inner.is-link{
  color:#eee
}
.el-tag{
  margin-right:12px;
}
</style>
