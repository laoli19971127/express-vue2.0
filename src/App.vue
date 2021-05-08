<template>
  <div id="app" class="app">
     <router-view />
  </div>
</template>
<script>
import Login from '@/views/Login.vue'
export default {
  components:{
    Login
  }
};
</script>

<style lang="less">
.app{
  width: 100%;
  height: 100vh;
}
</style>
