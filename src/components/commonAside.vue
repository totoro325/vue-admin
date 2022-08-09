
<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-menu-item
        v-for="item in menuList"
        :key="item.path"
        @click="clickMenu(item)"
        :index="item.pid"
      >
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
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
      menuList: [
        {
          path: "",
          title: "首页",
          name: "main",
          pid: "01",
        },
        {
          path: "",
          title: "西安研发",
          name: "xian",
          pid: "02",
        },
        {
          path: "",
          title: "成都研发",
          name: "chengdu",
          pid: "03",
        },
        {
          path: "",
          title: "静安研发",
          name: "shanghai",
          pid: "04",
        },
      ],
    };
  },
  methods: {  
    clickMenu(item) {
      this.$router.push({
        name:item.name
      });
   
    },
  },
  computed:{
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }
  }
};
</script>
<style scoped>
html {
  height: 100%;
}
</style>