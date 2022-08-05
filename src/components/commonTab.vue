<template>
  <div class="tabs">
    <!-- :closable="tag.name !== 'home'" tag标签为home时不显示关闭按钮 -->
    <el-tag
      size="small"
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @click="changeMenu(tag)"
      @close="handleClose(tag)"
      :effect = "$route.name === tag.name ? 'dark' : 'plain'"
    >
      {{ tag.title }}
    </el-tag>
  </div>
</template>

<script>
// 引入vuex模块
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    // 使用vuex中state管理的tabsList数组对象数据
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    ...mapMutations({
      close: 'closeTab'
    }),
    // 通过事件绑定方法，当用户点击关闭时将tab作为参数传递给close方法，通过close方法调用vuex中的closeTab方法
    handleClose(tag) {
      this.close(tag)
    },
    // Tag标签与业务组件路由跳转连通
    changeMenu(item) {
      // 点击Tag标签跳转到对应业务组件的路由页面
      this.$router.push({ name:item.name })
      // 将用户点击导航的菜单传递给Vuex的selectMenu方法，实现CommonHeader组件面包屑展示菜单数据联动。
      this.$store.commit('selectMenu', item)
    }
  }
}
</script>

<style  scoped>

.tabs {
  padding: 20px;
 
}
.el-tag{
  cursor: pointer;
}
</style>

