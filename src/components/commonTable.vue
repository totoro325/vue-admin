<template>
  <div class="common-table">
    <!-- 
      将表格数据tableData赋值给data 
        -stripe：斑马纹显示表格
        -v-loading：显示loading加载过程,值有父组件data数据config对象传递，决定是否显示加载效果
    -->
    <el-table :data="tableData" height="90%" stripe v-loading="config.loading">
      <!-- 表格第一列序号 -->
      <el-table-column label="序号" width="85">
        <template slot-scope="scope">
          <!-- 
            设置序号
              -  (config.page - 1) * 20 ：获取当前页数，每页20条
              - scope.$index + 1：设置序号
          -->
          <span style="margin-left: 10px">{{ (config.page - 1) * 20 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!-- 
        表格序号后面的列通过遍历父组件传入的data数据动态改变
          - show-overflow-tooltip:超出一行的内容点点点显示
          - :width:动态设置列宽，如果父组件传递了某个列的宽度则使用父组件传递的宽度，如果某个列没有传递宽度，则使用默认宽度
          
       -->
      <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label" show-overflow-tooltip :width="item.width ? item.width : 125">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!-- Table表格操作列 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      设置分页
        - :total="config.total":设置总页数
        - :current-page.sync="config.page"：设置当前页数
        - @current-change：绑定当前页事件，获取用户选择的页数
    -->
    <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  // 接收父组件传来的数据
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  methods: {
    // 表格操作列方法
    handleEdit(row) {
       this.$emit('edit',row)
    },
    handleDelete(row) {
      this.$emit('del',row)
    },
    // ---分页操作方法：当改变当前页数时，向父组件发送当前页数
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style  scoped>
.common-table {
    height: 700px; 
    background-color: #fff;
    position: relative; 
}
.pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
</style>

