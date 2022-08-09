<template>
  <div>
    <div id="tianjia">
      <el-button
        @click="drawer = true"
        type="primary"
        style="margin-left: 16px"
      >
        新建
      </el-button>
      <el-drawer title="新增数据" :visible.sync="drawer" :with-header="true">
        <div>
          <el-form class="contentWidth" ref="form" :model="form">
            <el-form-item label="请输入Id">
              <el-input
                type="text"
                name="id"
                v-model="addDetail.id"
                value=""
              ></el-input>
            </el-form-item>
            <el-form-item label="请输入姓名">
              <el-input
                type="text"
                name="id"
                v-model="addDetail.name"
                value=""
              ></el-input>
            </el-form-item>
            <el-form-item label="请选择办公区域" prop="address">
              <el-select
                @change="currOperatorChange"
                v-model="addDetail.address"
                placeholder="请选择办公区域"
              >
                <el-option
                  v-for="item in operateOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native.prevent="adddetail()">立即创建</el-button
              >
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
    </div>

     <!--编辑弹框部分-->
    <div>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="30%">
        <!--这就是一个表格-->
        <el-form :model="form">
          <!--公司ID-->
          <el-form-item label="ID">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <!--公司名称-->
          <el-form-item label="姓名">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <!--公司地址-->
          <el-form-item label="办公区域">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <!--确定, 取消  按钮-->
        <div>
          <el-button type="primary" @click.native.prevent="editSubForm"
            >确定</el-button
          >
          <el-button @click.native.prevent="dialogFormVisible = false"
            >取消</el-button
          >
        </div>
      </el-dialog>
    </div>
  
  
    <div>
      <el-table
        :data="tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column label="Id" prop="id"> </el-table-column>
        <el-table-column label="Name" prop="name"> </el-table-column>
        <el-table-column label="Address" prop="address"> </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="deletedetail(scope.$index, tableData)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getData } from "../../api/data.js";
var _index
export default {
  name: "shanghai",
  data() {
    return {
      tableData: [
        {
          id: "0001",
          name: "上海研发1",
          address: "上海静安研发中心",
        },
        {
          id: "0002",
          name: "上海研发2",
          address: "上海静安研发中心",
        },
        {
          id: "0003",
          name: "上海研发3",
          address: "上海静安研发中心",
        },
        {
          id: "0004",
          name: "上海研发4",
          address: "上海静安研发中心",
        },
      ],
      form: {
        id: "",
        name: "",
        address: "",
      },
      operateOption: [
        {
          label: "上海静安研发中心",
          value: "jiangan",
        },
        {
          label: "上海松江研发中心",
          value: "songjiang",
        },
      ],
      addDetail: [],
      search: "",
      drawer: false,
      dialogFormVisible: false,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit() {
      console.log("submit!");
    },
    /*添加方法*/
    adddetail() {
      console.log(1);
      this.$confirm("确认进行添加", "是否继续?", "提示", {
        confirmButtonText: "确定",
        confirmButtonText: "取消",
      })
        .then(() => {
          this.tableData.push({
            id: this.addDetail.id,
            name: this.addDetail.name,
            address: this.addDetail.address,
         
          }),
         
            /*成功添加之后的提示信息*/
            this.$message({
              type: "success",
              message: "添加成功",
            });
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },

    /*删除方法*/

    deletedetail: function (index, rows) {
      this.$confirm("此操作将删除数据,", "是否继续?", "提示", {
        confirmButtonText: "确定",
        confirmButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },
     /*编辑修改数据*/
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      _index = index;
      console.log(index)
      console.log(_index)
      //取到这一栏的值，也就是明白是在那一栏进行操作，从而将编辑后的数据存到表格中
    },
    //保存编辑
    editSubForm() {
      var editData = _index;
      this.tableData[editData].id = this.form.id;
      this.tableData[editData].name = this.form.name;
      this.tableData[editData].address = this.form.address;
      this.dialogFormVisible = false;
    },
    //查询方法
    searchFn:function(e){
      var key = e.target.value;
      //查询公司id
      if(key){
        var searchArray = [];
        this.newsList.forEach(function(item)){
          
        }
      }
    }
    currOperatorChange(val) {
      console.log("选项变化", val);
      if (val) {
        let obj = {};
        obj = this.operateOption.find((item) => {
          console.log(item.value);
          return item.value === val;
        });
        this.addDetail.address = obj.label;
        console.log(this.addDetail.address)
      } else {
        this.addDetail.address ="";
      }
    },
  },
   mounted() {
  
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
      }
      console.log(res);
    });
  },
};
</script>
<style scoped>
.contentWidth {
  padding-left: 40px;
  padding-right: 40px;
}
</style>