<template>
  <div>
    <el-table :data="tableData" border>
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="role_name" label="角色名"> </el-table-column>
      <el-table-column prop="menu_name" label="菜单"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button @click="handleMenu(scope.row)" type="text" size="small"
            >分配菜单</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog title="添加菜单" :visible.sync="roleTableVisible" width="30%">
      <el-form ref="form2" :model="form2" label-width="80px">
        <el-form-item label="角色">
          <el-input v-model="form2.role_name" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="菜单">
          <el-select
            v-model="form2.menu"
            placeholder="请选择菜单"
            @focus="focusRole"
            style="width: 200px"
          >
            <el-option
              v-for="item in menuOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <div class="footer">
          <el-button @click="cancelRoleForm">取 消</el-button>
          <el-button type="primary" @click="comfirm" :loading="loading">{{
            loading ? "提交中 ..." : "确 定"
          }}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { JeecgListMixin } from "../mixin/tableList";
import { getRole, insertRoleMenu ,getMenu} from "../api/api";
export default {
  mixins: [JeecgListMixin],
  data() {
    return {
      roleTableVisible: false,
      loading: false,
      form2: {
        role_name: "",
        menu: "",
      },
      menuOptions: [],
    };
  },
  methods: {
    //发起请求
    async loadData(arg) {
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      //查询条件
      var params = {
        page_num: this.currentPage,
        page_size: this.pageSize,
      };
      getRole(params)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.tableData = res.list;
            this.total = res.total;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => console.log(err));
    },
    cancelRoleForm() {
      this.loading = false;
      this.roleTableVisible = false;
    },
    comfirm() {
      let params = {
        role_id: this.form2.role_id,
        menu_id: this.form2.menu,
      };
      insertRoleMenu(params).then((res) => {
        if (res.success) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.loadData();
          this.roleTableVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 分配菜单
    handleMenu(row) {
      console.log(row)
      this.roleTableVisible = true;
      Object.assign(this.form2, row);
    },
    focusRole(){
        //查询条件
      var params = {
        page_size: -1,
      };
      getMenu(params)
        .then((res) => {
          console.log(res);
          if (res.success) { 
            this.menuOptions = [];
            console.log(res.list);
            res.list.map((item) => {
              this.menuOptions.push({
                value: item.menu_id,
                label: item.menu_name,
              });
            });
            console.log(this.menuOptions)
          } else {
            this.menuOptions = [];
            this.$message.error(res.msg);
          }
        })
        .catch((err) => console.log(err));
    }
  },
};
</script>

<style>
@import "../../public/index.css";
</style>