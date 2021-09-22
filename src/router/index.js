import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginForm from '../views/LoginForm.vue'
import RegisterForm from '../views/RegisterForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'RegisterForm',
    component: RegisterForm
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
