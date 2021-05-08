import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//样式文件，需单独引入
import 'element-ui/lib/theme-chalk/index.css';
//引入写有需要的组件的文件
import element from './element/index'
Vue.use(element)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    console.log(token)
    if (token == null || token == '') {
      console.log(1213)
      next('/login');
    } else {
      next();
    }
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
