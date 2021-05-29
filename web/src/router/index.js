import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const Login = () => import('../views/login/login.vue');

const routes = [{
  path: '/login',
  name: 'login',
  component: Login
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router