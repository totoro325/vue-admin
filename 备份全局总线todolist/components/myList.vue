<template>
  <ul class="todo-main">
    <myItem v-for="todoObj in todos" 
        :key="todoObj.id" 
        :todo="todoObj" 
        :deleteTodo="deleteTodo"
        >
    </myItem>
  </ul>
</template>

<script>
  import myItem from './myItem'

  export default {
    name:'myList',
    components:{myItem},
    // 声明接收App传递的数据，其中todos是自己用的，checkTodo和deleteTodo是给子组件MyItem用的
    props:['todos','deleteTodo']
  }
</script>

<style scoped>
  /*main*/
  .todo-main {margin-left: 0px;border: 1px solid #ddd;border-radius: 2px;padding: 0px;}
  .todo-empty {height: 40px;line-height: 40px;border: 1px solid #ddd;
    border-radius: 2px;padding-left: 5px;margin-top: 10px;}
</style>