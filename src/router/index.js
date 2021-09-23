import Vue from 'vue'
import VueRouter from 'vue-router'
import Hospital from '../views/Hospital.vue'
import LoginForm from '../views/LoginForm.vue'
import RegisterForm from '../views/RegisterForm.vue'
import SpecialistPage from '../views/SpecialistPage.vue'
import SpecialistDoctor from '../views/SpecialistDoctor.vue'
import DoctorProfile from '../views/DoctorProfile.vue'
import ChatDoctor from '../views/ChatDoctor.vue'
import HospitalDetail from '../views/HospitalDetail.vue'

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
    name: 'SpecialistPage',
    component: SpecialistPage
  },
  {
    path: '/specialist/:id',
    name: 'SpecialistDoctor',
    component: SpecialistDoctor
  },
  {
    path: '/doctors/:slug',
    name: 'DoctorProfile',
    component: DoctorProfile
  },
  {
    path: '/consult',
    name: 'ChatDoctor',
    component: ChatDoctor
  },
  {
    path: '/hospitals/:slug',
    name: 'HospitalDetail',
    component: HospitalDetail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
