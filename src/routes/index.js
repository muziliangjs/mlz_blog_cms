import Vue from "vue";
import VueRouter from "vue-router";
import {
  getToken
} from "@/utils/auth";
Vue.use(VueRouter);

// layout
import Default from '../layouts/Default.vue'

// cpmpontent
import Dashoard from '../views/Dashboard.vue'
import Article from '../views/Article.vue'
import Label from '../views/Label.vue'
import Login from '../views/Login.vue'

const routes = [{
  path: "/",
  component: Default,
  children: [{
    path: "/",
    component: Dashoard,
  }, {
    path: "/article",
    component: Article,
  }, {
    path: "/label",
    component: Label,
  }]
}, {
  path: "/login",
  component: Login,
}, ]

var router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token == null && whiteList.indexOf(to.fullPath) == -1) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router;