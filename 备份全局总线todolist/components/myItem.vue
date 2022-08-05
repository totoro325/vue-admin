<template>
  <li>
    <label>
      <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
      <!-- <input type="checkbox" v-model="todo.done"/> -->
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>  
      <span v-show="!todo.isEdit">{{todo.title}}</span>
      <input v-show="todo.isEdit" type="text" :value="todo.title" @blur="handleBlur(todo,$event)" ref="inputTitle" />
      
    </label>
    <button class="btn btn-danger" @click="handelDelete(todo.id)" >删除</button>
       <button v-show="!todo.isEdit" class="btn btn-edit" @click="handleEdit(todo)">
      编辑
    </button>
  </li>
</template>

<script>
  export default {
    name:'myItem',
    //声明接收todo、checkTodo、deleteTodo
    //props:['todo','deleteTodo'],
    //这里使用全局总线所以只需要接受一个todo
    props:['todo'],
    methods:{
      handleCheck(id){
        this.$bus.$emit('checkTodo',id)
      },
      handelDelete(id){
          if(confirm('确定删除吗？')){
         // this.deleteTodo(id)	// 通知App组件将对应的todo对象删除
         this.$bus.$emit('deleteTodo',id)
        }
      },
      handleEdit(todo) {	// 编辑
       if(Object.prototype.hasOwnProperty.call(todo, 'isEdit')){
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true);
      }
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
    },
    handleBlur(todo, e) {	// 失去焦点回调（真正执行修改逻辑）
      todo.isEdit = false;
      if (!e.target.value.trim()) return alert("输入不能为空！");
      this.$bus.$emit("updateTodo", todo.id, e.target.value);
    },
  },
};
</script>

<style scoped>
  /*item*/
  li {list-style: none;height: 36px;line-height: 36px;padding: 0 5px;
    border-bottom: 1px solid #ddd;}
  li label {float: left;cursor: pointer;}
  li label li input {vertical-align:middle; margin-right:6px; position:relative;top: -1px;}
  li button {float: right;display: none;margin-top: 3px;}
  li:before {content: initial;}
  li:last-child {border-bottom: none;}
  li:hover{background-color: #ddd;}
  li:hover button{display: block;}
</style>