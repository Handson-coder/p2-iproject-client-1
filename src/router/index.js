import Vue from 'vue'
import VueRouter from 'vue-router'
import Hospital from '../views/Hospital.vue'
import LoginForm from '../views/LoginForm.vue'
import RegisterForm from '../views/RegisterForm.vue'
import SpecialistDoctorPage from '../views/SpecialistDoctorPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Hospital',
    component: Hospital
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
  {
    path: '/specialist',
    name: 'SpecialistDoctorPage',
    component: SpecialistDoctorPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
