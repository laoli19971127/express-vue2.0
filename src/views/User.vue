<template>
  <div>
    <el-button @click="impoortExcel" type="primary">导入</el-button>
    <el-button @click="exportExcel" type="primary">导出</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="name" label="用户" width="180"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="role_name" label="角色"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button @click="handleRole(scope.row)" type="text" size="small"
            >分配角色</el-button
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
    <el-dialog title="详情" :visible.sync="dialogTableVisible">
      <el-table :data="userTableDetail" border style="width: 100%">
        <el-table-column prop="name" label="用户" width="180">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
        <el-table-column prop="username" label="账号"> </el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>
      </el-table>
    </el-dialog>

    <el-drawer title="编辑" :visible.sync="drawer">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <div class="footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </el-form>
    </el-drawer>
    <el-dialog title="添加角色" :visible.sync="roleTableVisible" width="30%">
      <el-form ref="form2" :model="form" label-width="80px">
        <el-form-item label="用户">
          <el-input v-model="form2.name" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="form2.role"
            placeholder="请选择角色"
            @focus="focusRole"
            style="width: 200px"
          >
            <el-option
              v-for="item in roleOptions"
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

    <!-- 导入人员档案 -->
    <!--  action 放的是导入文件的后台地址 -->
    <el-dialog
      title="导入人员档案"
      :visible.sync="importDialogVisible"
      width="66%"
    >
      <el-upload
        ref="upload"
        name="file"
        :limit="limit"
        :auto-upload="false"
        action="接口地址"
        :on-exceed="handleExceed"
        :file-list="filelist"
        :on-change="handleChansge"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="postfile"
          :disabled="btn.disable"
          >{{ btn.message }}</el-button
        >
        <div slot="tip" class="el-upload__tip">
          上传文件只能为excel文件，且为xlsx,xls格式
        </div>
      </el-upload>
      <div v-for="o in errmesg" :key="o.message" class="text item">
        {{ o.message }}
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { JeecgListMixin } from "../mixin/tableList";
import {
  getUser,
  getUserByName,
  getRole,
  insertUserRole,
  importExcle,
  exportExcle,
} from "../api/api";

export default {
  mixins: [JeecgListMixin],
  data() {
    return {
      disableMixinCreated: false,
      dialogTableVisible: false,
      roleTableVisible: false,
      importDialogVisible: false,
      file: "",
      filename: "",
      limit: 1,
      filelist: [],
      errmesg: [],
      btn: {
        disable: false,
        message: "上传服务器",
      },
      userTableDetail: [],
      drawer: false,
      loading: false,
      form: {
        name: "",
        age: "",
        username: "",
        password: "",
      },
      form2: {
        name: "",
        role: "",
      },
      // 角色配置表
      roleOptions: [],
    };
  },
  methods: {
    exportExcel() {
      exportExcle().then((response) => {
        const blob = new Blob([response], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
        });
        console.log(blob)
        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = `人员.xlsx`;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
      });
    },
    impoortExcel() {
      let that = this;
      that.importDialogVisible = true;
    },
    handleExceed(e) {
      // 判断是否只能上传一个文件，超过提示报错
      console.log(e);
      this.$message.error({
        title: "错误",
        message: "只能上传一个文件哦",
      });
    },
    handleChansge(file, fileList) {
      console.log(file);
      let name = file.name;
      if (!/\.(xlsx|xls|XLSX|XLS)$/.test(file.name)) {
        this.$message.error({
          title: "错误",
          message: "上传文件只能为excel文件，且为xlsx,xls格式",
        });
        this.filelist = [];
        this.file = "";
        return false;
      }
      this.file = file.raw;
      this.filename = file.name;
    },
    postfile() {
      let that = this;
      if (this.file == "") {
        that.$message.error({
          title: "错误",
          message: "上传文件不能为空",
        });
        return false;
      } else {
        // 文件形式的需要用 formData形式
        let formData = new FormData();
        formData.append("file", this.file);

        this.btn.disable = true;
        this.btn.message = "上传中，请等待";
        let parmas = formData;
        importExcle(parmas)
          .then((res) => {
            if (res.success) {
              that.$message({
                message: res.msg,
                type: "success",
              });
              that.filelist = [];
              that.btn.disable = false;
              that.btn.message = "上传服务器";
            }
          })
          .catch((err) => {
            that.btn.disable = false;
            that.btn.message = "上传服务器";
            that.$message.error({
              title: "错误",
              message: "上传过程出错啦",
            });
          });
        // this.$axios1
        //   .post(url, formData, config)
        //   .then(function (response) {
        //     console.log(response);
        //     that.$notify({
        //       title: "成功",
        //       message: response.data.message,
        //       type: "success",
        //     });
        //     that.filelist = [];
        //     that.btn.disable = false;
        //     that.btn.message = "上传服务器";
        //   })
        //   .catch((err) => {
        //     that.btn.disable = false;
        //     that.btn.message = "上传服务器";
        //     that.$notify.error({
        //       title: "错误",
        //       message: "上传过程出错啦",
        //     });
        //   });
      }
    },
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
      getUser(params)
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
    //点击查看按钮
    handleClick(row) {
      this.dialogTableVisible = true;
      let params = {
        username: row.username,
      };
      getUserByName(params).then((res) => {
        console.log(res);
        if (res.success) {
          this.userTableDetail = res.list;
        }
      });
    },
    handleEdit(row) {
      this.drawer = true;
      Object.assign(this.form, row);
    },
    handleClose() {
      if (this.loading) {
        return;
      }
    },
    cancelForm() {
      this.loading = false;
      this.drawer = false;
      this.$forceUpdate();
    },
    cancelRoleForm() {
      this.loading = false;
      this.roleTableVisible = false;
    },
    comfirm() {
      console.log(this.form2);
      let params = {
        user_id: this.form2.user_id,
        role_id: this.form2.role,
      };
      insertUserRole(params).then((res) => {
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
    // 分配角色
    handleRole(row) {
      console.log(row);
      this.roleTableVisible = true;
      Object.assign(this.form2, row);
    },
    // 选择角色
    focusRole() {
      //查询条件
      var params = {
        page_size: -1,
      };
      getRole(params)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.roleOptions = [];
            console.log(res.list);
            res.list.map((item) => {
              this.roleOptions.push({
                value: item.role_id,
                label: item.role_name,
              });
            });
            console.log(this.roleOptions);
          } else {
            this.roleOptions = [];
            this.$message.error(res.msg);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
@import "../../public/index.css";
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>