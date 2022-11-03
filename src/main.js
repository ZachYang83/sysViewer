import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import dataV from '@jiaminghi/data-view'
import '@/assets/scss/common.scss';
import '@/assets/scss/style.scss';
import '@/assets/css/ali-icons/iconfont.css'
import * as echarts from "echarts";
window.echarts = echarts;

Vue.use(ElementUI);
Vue.use(dataV)
Vue.config.productionTip = false
window.MAP = null;
window.PANEL_MAP = null;


Vue.prototype.axios = axios;
Vue.prototype.$echarts = echarts

router.beforeEach((to, from, next) => {
  //路由需要认证
  if (to.meta.requireAuth) {
    //判断store里是否有token
    if (store.state.token) {
      next()
    } else {
      next({
        path: 'home',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
}
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
