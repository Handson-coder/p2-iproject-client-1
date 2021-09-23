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
    specialists: [],
    doctorSpecialists: [],
    doctorProfile: {},
    user: {},
    statusSent: false,
    messages: [],
    hospitalProfile: {},
    covidStatusInIndonesia: {}
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
    FETCHING_SPECIALISTS(state, payload) {
      state.specialists = payload
    },
    FETCHING_DOCTORS_SPECIALIST(state, payload) {
      state.doctorSpecialists = payload
    },
    FETCHING_DOCTOR_PROFILE(state, payload) {
      state.doctorProfile = payload
    },
    FIND_USER_LOGIN(state, payload) {
      state.user = payload
    },
    EMAIL_SENT_STATUS(state, payload) {
      state.statusSent = payload
    },
    PUSH_MESSAGE(state, payload) {
      state.messages.push(payload)
    },
    FETCHING_HOSPITAL_PROFILE(state, payload) {
      state.hospitalProfile = payload
    },
    FETCHING_COVID_STATUS(state, payload) {
      state.covidStatusInIndonesia = payload
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

    async fetchSpecialist(context) {
      try {
        const result = await instanceAxios({
          method: 'get',
          url: '/specialists',
          headers: {
            access_token: localStorage.access_token
          }
        })
        context.commit('FETCHING_SPECIALISTS', result.data)
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`
        });
      }
    },

    async fetchSpecialistDoctor(context, payload) {
      try {
        const result = await instanceAxios({
          method: 'get',
          url: `/doctors/specialist/${payload}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        context.commit('FETCHING_DOCTORS_SPECIALIST', result.data)
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`
        });
      }
    },

    async fetchDoctorProfile(context, payload) {
      try {
        const result = await instanceAxios({
          method: 'get',
          url: `/doctors/${payload}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        context.commit('FETCHING_DOCTOR_PROFILE', result.data)
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`
        });
      }
    },

    async findUserLogin(context) {
      try {
        const result = await instanceAxios({
          method: 'get',
          url: '/users',
          headers: {
            access_token: localStorage.access_token
          }
        })
        context.commit('FIND_USER_LOGIN', result.data)
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`
        });
      }
    },

    async chatWithDoctor(context, payload) {
      try {
        await instanceAxios({
          method: 'post',
          url: '/nodemailer',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            to: payload.to,
            username: payload.username,
            doctor: payload.doctor
          }
        })
        context.commit('EMAIL_SENT_STATUS', true)
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`
        });
      }

    },

    async fetchHospitalProfile(context, payload) {
      try {
        const result = await instanceAxios({
          method: 'get',
          url: `/hospitals/${payload}`,
        })
        context.commit('FETCHING_HOSPITAL_PROFILE', result.data)
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`
        });
      }
    },

    async fetchCovidStatusInIndonesia(context) {
      try {
        const result = await instanceAxios.get('/covid19/stats')
        context.commit('FETCHING_COVID_STATUS', result.data)
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
