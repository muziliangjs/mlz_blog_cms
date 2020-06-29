import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// layout
import Default from '../layouts/Default.vue'

// cpmpontent
import Dashoard from '../views/Dashboard.vue'

const routes = [{
  path: "/",
  component: Default,
  children: [{
    path: "/",
    component: Dashoard,
  }]
}]

var router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})

export default router;