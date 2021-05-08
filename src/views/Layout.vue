<template>
  <el-container style="height: 100%; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-active="$route.path" :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>权限管理</template>
        <el-menu-item-group>
          <el-menu-item :index="item.menu_url" v-for="(item,index) in menuList" :key="index">{{item.menu_name}}</el-menu-item>
          <!-- <el-menu-item index="/user">用户管理</el-menu-item>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/menu">菜单管理</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px;display:flex;justify-content: space-between;">
      <span style="font-size:20px;color:#ffffff">node权限管理系统</span>
      <div>
           <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="exit">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{userMsg.role_name}}</span>
      </div>
      
    </el-header>
    
    <el-main>
      <el-card class="box-card">
       <router-view />
      </el-card>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import { getUserByToken } from "../api/api"; 
export default {
    data() {
      return{
         userMsg:{},
        // 菜单列表
         menuList:[]
      }
    },
    created(){
      this.getUser()
    },
    methods:{
      // 获取登录用户信息
      getUser(){
        getUserByToken().then(res=>{
           console.log(res)
           if(res.success){
               this.userMsg=res.list[0]
               this.menuList=res.list

           }
        })
      },
      // 下拉点击菜单项
     handleCommand(command) {  
        localStorage.removeItem('Authorization');
        this.$router.push('/login');
      }
    }
    

  };
</script>

<style lang="less" scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    
  } 
  .el-aside {
    color: #333;
  }
</style>