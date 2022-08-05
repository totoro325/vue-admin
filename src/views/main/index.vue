<template>
  <el-row class="home" :gutter="20">
    <el-col :span="24">
      <el-card class="banner"></el-card>
    </el-col>
    <el-col :span="14" style="margin-top: 20px">
      <el-card>
        <div class="user">
            <div>
              <el-avatar :size="64"  :src="avatarUrl.avatarUrl"></el-avatar>
            </div>
          <div class="userinfo">
            <p class="name">admin</p>
            <p class="access">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021-7-19</span></p>
          <p>上次登录地点：<span>上海</span></p>
        </div>
      </el-card>
        <el-card style="margin-top: 20px">
         <div ref="chart" id="main" style="height:290px"></div>
       </el-card>

       
    </el-col>
    <el-col :span="5" style="margin-top: 20px;height:200px">
       <el-card>
        <div>开发技术</div>
        <div style="font-size:13px">
          <ul>java</ul>
          <ul>php</ul>
          <ul>javascript</ul>
          <ul>go</ul>
         
        </div>
       </el-card>
    </el-col>
    <el-col :span="5" style="margin-top: 20px;height:200px">
       <el-card>
        <div>开发技术</div>
        <div style="font-size:13px">
          <ul>java</ul>
          <ul>php</ul>
          <ul>javascript</ul>
          <ul>go</ul>
         
        </div>
       </el-card>
    </el-col>
    <el-col :span="10" style="margin-top: 20px">
       
      <el-card >
          <el-table :data="tableData">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card> 
    </el-col>
   
  </el-row>
</template>>
<script>

import { getData } from "../../api/data.js";

export default {
  name: "home",

  data() {
    return {
      tableData: [],
      tableLabel: {
        id: "编号",
        name: "姓名",
        job: "职位",
        jion: "入职日期",
        address: "工作地点",
      },
      avatarUrl:{avatarUrl:require("@/assets/avatar.png")}
    };
  },
  mounted() {
    this.echartsInit();
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
      }
      console.log(res);
    });
  },
  methods: {
        //初始化echarts
        echartsInit() {
            //柱形图
            //因为初始化echarts 的时候，需要指定的容器 id='main'
            this.$echarts.init(document.getElementById('main')).setOption({
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    barWidth:12,
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                    }
                }]
            })
        }
            
    }
};
</script>
<style scoped>
html {
  background-color: #eee;
}
.banner{
  height: 120px;
  background-image: url("../../assets/banner.svg");
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
}
.user{
  display: flex;
  align-items: center;
}
.userinfo{
  padding-left:30px;
}
.login-info{
  font-size:12px;
}
</style>