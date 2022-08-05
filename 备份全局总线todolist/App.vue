<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <myHeader :addTodo="addTodo" />
        <myList :todos="todos" />
        <myFooter :todos="todos" :checkAllTodo="checkAllTodo" :clearAllTodo="clearAllTodo"/>
      </div>
    </div>
  </div>
</template>

<script>
	// 引入组件
	import myHeader from './components/myHeader.vue'
	import myList from './components/myList.vue'
	import myFooter from './components/myFooter.vue'

	export default {
		name:'App',
		components:{ myHeader,myList,myFooter },
		data(){
			return{
				//由于todos是myheader组件和myfooter组件在使用，所以放到了app中
				todos:[
					{id:'001',title:'抽烟',done:true},
					{id:'002',title:'喝酒',done:false},
					{id:'003',title:'开车',done:true},
				]
			}
		},
    methods:{
      addTodo(todoObj){
        this.todos.unshift(todoObj)//添加数据得方法，增加到第一行，这里要给myHeader组件传函数addTodo()
        console.log(todoObj)
      },
      //勾选or取消勾选一个todo
      checkTodo(id){
        this.todos.forEach((todo)=>{
          if(todo.id === id) todo.done = !todo.done//要循环遍历列表，如果这个todo的id和这个ID相等就取反
        })
      },
      deleteTodo(id){
         this.todos =this.todos.filter(todo=>todo.id!==id)
         console.log(id)
      },
      checkAllTodo(done){
        this.todos.forEach((todo)=>{
          todo.done = done
        })
      },
      //清除所有已经完成的todo
      clearAllTodo(){
        this.todos = this.todos.filter((todo)=>{
          return !todo.done
        })
      }, 
      //编辑数据
      updateTodo(id,title){
        this.todos.forEach((todo)=>{
          if(todo.id === id) todo.title=title
        })

      }    
  },
      mounted() {
          this.$bus.$on("updateTodo", this.updateTodo);
          this.$bus.$on("checkTodo",this.checkTodo);
          this.$bus.$on("deleteTodo",this.deleteTodo);
        },
        beforeDestroy() {
          this.$bus.$off("updateTodo");
          this.$bus.$off("checkTodo");
          this.$bus.$off("deleteTodo")
        },

  }
	
</script>
<style>
  /*base*/
  body {background: #fff;}
  .btn {display: inline-block;padding: 4px 12px;margin-bottom: 0;font-size: 14px;
    line-height: 20px;text-align: center;vertical-align: middle;cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;}
  .btn-danger {color: #fff;background-color: #da4f49;border: 1px solid #bd362f;}
  .btn-danger:hover {color: #fff;background-color: #bd362f;}
  .btn:focus {outline: none;}
  .todo-container {width: 600px;margin: 0 auto;}
  .todo-container .todo-wrap {padding: 10px;border: 1px solid #ddd;border-radius: 5px;}
</style>