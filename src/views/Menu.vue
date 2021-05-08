<template>
  <div>
    <el-table :data="tableData" border>
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="menu_name" label="角色名"> </el-table-column>
      <el-table-column prop="menu_url" label="菜单路径"> </el-table-column>
      <el-table-column label="是否可用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.menu_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change=change(scope.$index,scope.row)
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
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
  </div>
</template>

<script>
import { JeecgListMixin } from "../mixin/tableList";
import { getMenu,updataMenuStatus } from "../api/api";
export default {
  mixins: [JeecgListMixin],
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
      getMenu(params)
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
    // 切换状态
    change(index,rowData){
      console.log(index,rowData)
      let params = rowData
      // 发起更新状态请求
      updataMenuStatus(params).then(res=>{
        if(res.success){
          console.log(res)
          this.$message({
              message: res.msg,
              type: "success",
            });
        }else{
           this.$message.error(res.msg);
        }
      }).catch((err) => console.log(err));
    }
  },
};
</script>

<style>
@import '../../public/index.css';
</style>