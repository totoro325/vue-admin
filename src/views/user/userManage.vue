<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
    <common-form :formLabel="operateFormLabel" :form="operateForm"></common-form>
    <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisible = false">取消</el-button>
       <el-button type="primary" @click="confirm">确定</el-button>
    </div>
    </el-dialog>
    <div class="manage-header"  inline>
      <el-button type="primary" size="mini" @click="addUser">+ 新建</el-button>
      <common-form inline :formLabel="formLabel" :form="searchForm">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
    <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()" @edit="editUser" @del="delUser"></common-table>
  </div>
</template>

<script>
// 导入子组件
import commonForm from '../../components/commonForm'
import commonTable from '../../components/commonTable'
export default {
  components: {
    // 注册子组件
    commonForm,
    commonTable
  },
  data() {
    return {
      operateType:'add',
      isShow:false,
      // table表格数据
      tableData: [],
      // 表格列名
      tableLabel: [
        {
          // prop属性来对应对象中的键名即可填入数据
          prop: 'name',
          // 表格列名称
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 520
        }
      ],
       // 编辑表格内容的form表单数据
      operateForm: {
        // 更新表格字段名字
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名'
        },
        {
          model: 'age',
          label: '年龄'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址'
        }
      ],
      // 表格配置信息
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      // form表单数据
      searchForm: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ]
    }
  },
  methods: {
    // 请求table表格数据,和根据name查询表格数据
    getList(name=''){
      this.config.loading = true
      this.$http
        .get('/api/user/getUser', {
          params: {
            page: this.config.page,
            name
          }
        })
        .then(res => {
          // 请求接口返回的数据赋值给tableData
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item
          })
          this.config.total = res.data.count
          console.log("####",res.data.count)
          this.config.loading = false
        })
    },
    addUser(){
      this.operateForm = {}
      this.operateType = 'add'
      this.isShow = true
    },
    changePage(val){
      console.log(val)
    },
    editUser(row){
      this.operateType ='edit'
      this.isShow= true
      this.operateForm = row
      console.log
    },
    delUser(row){
     //插入messagebox弹框控件
     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //1请求删除接口，将id作为参数传递给接口。删除数据
          let id = row.id
          this.$http
            .get('api/user/del',{
              params:{
                id
              }
            })
            //处理删除接口返回的数据
            .then( res => {
              console.log(res.data)
              this.$message({
              type: 'success',
              message: '删除成功!'
              })
              this.getList()
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     
    },
    confirm(){
      if( this.operateType === 'edit'){
        this.$http.post('/api/user/edit', this.operateForm).then( res => {
          console.log(res.data)
          //点击确定后关闭表单弹窗
          this.isShow = false
          //刷新table表格获取新得数据
          this.getList()
        })
      }else{
        this.$http.post('api/user/add', this.operateForm).then(res =>{
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      }
    }
  },
  // 调用请求表格数据方法
  created(){
    this.getList()
  }
}
</script>

<style  scoped>
.manage-header{
    display: flex;
    justify-content: space-between;
    height:40px;
}
</style>

