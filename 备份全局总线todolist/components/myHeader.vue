<template>
	<div class="todo-header">
		<input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="add()" 
          />
	</div>
</template>

<script>
	import {nanoid} from 'nanoid'
	export default {
		name:'myHeader',
		props:['addTodo'],//这里接受了从App.vue 传过来得addTodo

		
		data(){
			return {
				title:''//收集用户输入得内容，用v-model双向绑定数据

			}
		},
		methods:{
			//不能直接用addTodo得原因是要添加一个todo对象，不只是title.
			add(){
				//校验数据
				if(!this.title.trim())return alert('buneng wei kong')
				//将输入的数据包装成一个对象
				const todoObj={id:nanoid(),title:this.title,done:false}
				//通知addTodo去添加一个todo对象
				this.addTodo(todoObj)
				console.log(this)
				//清空输入
				this.title=''
			}
		}
	}
</script>

<style scoped>
	/*header*/
	.todo-header input {width: 560px;height: 28px;font-size: 14px;
    border: 1px solid #ccc;border-radius: 4px;padding: 4px 7px;}
	.todo-header input:focus {outline: none;border-color: rgba(82, 168, 236, 0.8);
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);}
</style>