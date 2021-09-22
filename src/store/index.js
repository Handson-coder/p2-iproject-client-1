import Vue from 'vue'
import Vuex from 'vuex'
import instanceAxios from '../apis/baseUrl'
import Swal from "sweetalert2";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isRegister: false,
    provinces: [],
    hospitals: {},

  },
  mutations: {
    CHANGE_IS_LOGGED_IN(state, payload) {
      state.isLoggedIn = payload
    },
    CHANGE_IS_REGISTER(state, payload) {
      state.isRegister = payload
    },
    FETCHING_PROVINCES(state, payload) {
      state.provinces = payload
    },
    FETCHING_HOSPITALS(state, payload) {
      state.hospitals = payload
    },
  },
  actions: {
    async handleGoogleLogin(context, payload) {
      try {
        const result = await instanceAxios({
          method: 'post',
          url: `/users/auth/google`,
          data: {
            idToken: payload.access_token
          }
        })
        localStorage.setItem('access_token', result.data.access_token)
        context.commit('CHANGE_IS_LOGGED_IN', true)
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`
        });
      }
    },

    async handleLogin(context, payload) {
      try {
        const result = await instanceAxios({
          method: 'post',
          url: '/users/login',
          data: {
            email: payload.email,
            password: payload.password,
          }
        })
        localStorage.setItem('access_token', result.data.access_token)
        context.commit('CHANGE_IS_LOGGED_IN', true)
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`
        });
      }
    },

    async handleRegister(context, payload) {
      try {
        const result = await instanceAxios({
          method: 'post',
          url: '/users/register',
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password,
          }
        })
        console.log(result.data.email);
        if (result.data.email) {
          context.commit('CHANGE_IS_REGISTER', true)
        } else {
          context.commit('CHANGE_IS_REGISTER', false)
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`
        });
      }
    },

    async fetchProvinces(context) {
      try {
        const result = await instanceAxios.get('/provinces')
        context.commit('FETCHING_PROVINCES', result.data)
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`
        });
      }
    },

    async fetchHospitals(context, payload) {
      // console.log(payload);
      // console.log(payload.id);
      try {
        let result;
        let url = '/hospitals'
        let pageNumber = 1
        if (payload) {
          if (payload.page) {
            pageNumber = payload.page
          }
        }
        let defaultUrl = `?page=${pageNumber}`
        if (!payload) {
          result = await instanceAxios({
            method: 'get',
            url: `${url}${defaultUrl}`
          })
        } else {
          if (payload.page && payload.provinceId) {
            url += `?page=${pageNumber}&province=${payload.provinceId}`
          } else if (payload.page && !payload.provinceId) {
            url += `${defaultUrl}`
          } else if (!payload.page && payload.provinceId) {
            url += `${defaultUrl}&province=${payload.provinceId}`
          }
          result = await instanceAxios.get(url)
        }
        context.commit('FETCHING_HOSPITALS', result.data)
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`
        });
      }
    },

    async signOut(context) {
      await localStorage.clear()
      context.commit('CHANGE_IS_LOGGED_IN', false)
    }
  },
  modules: {
  }
})
