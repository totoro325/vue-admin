
<template>
  <div>
    <el-menu
      default-active="1-4-1"  class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-menu-item
        v-for="item in noChildren"
        :key="item.path"
        @click="clickMenu(item)"
        :index="item.path"        
      >
        <i class="el-icon- +item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <el-submenu :index="item.title" v-for="(item,index) in hasChildren" :key="index">
         <template slot="title">
           <i :class="`el-icon-`+item.icon"></i>
           <span>{{item.title}}</span>
         </template>
         <el-menu-item-group>
            <el-menu-item :index="subItem.path" v-for="(subItem,subIndex) in item.children" :key="subIndex">{{ subItem.title}}</el-menu-item>
         </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  name: "commonAside",
  data() {
    return {
      //menuList: []
  }
  },
  methods: {  
    clickMenu(item) {
      this.$router.push({name: item.name});
      this.$store.commit('selectMenu',item)
   
    },
  },
  computed:{
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    noChildren(){
      return this.menuList.filter(item => !item.children)
    },
    hasChildren(){
      return this.menuList.filter( item => item.children)
    },
    //获取store.state中的menu数据，决定不同的用户展示不同的菜单
    menuList(){
      return this.$store.state.tab.menu
    }
  }
};
</script>
<style scoped>
html {
  height: 100%;
}
</style>