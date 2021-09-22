<template>
  <div>
    <div class="hero min-h-screen bg-base-100">
      <div class="flex-col justify-center hero-content lg:flex-row">
        <div class="text-center lg:text-left text-gray-400">
          <h1 class="mb-10 text-5xl font-bold">
            Hello there ...
          </h1>
          <h3 class="mb-20 text-3xl">
            Welcome to my site!
          </h3>
          <h4 class="text-3xl">
            Let's Sign In to access more features..
          </h4>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                class="input input-bordered label-text"
                v-model="email"
              />
            </div>
            <div class="mt-5 form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                class="input input-bordered label-text"
                v-model="password"
              />
              <label class="label">
                <a href="#" class="label-text-alt">Forgot password?</a>
              </label>
            </div>
            <div class="form-control mt-8">
              <button
                type="button"
                class="btn btn-accent text-primary-content"
                @click.prevent="clickLoginButton"
              >
                Sign In
              </button>
            </div>
            <div class="mt-4">
              <small class="text-gray-400">
                Or Sign In with Google
              </small>
            </div>
            <div class="mt-4" style="display: flex; justify-content: center">
              <GoogleLogin
                :params="params"
                :renderParams="renderParams"
                :onSuccess="onSuccess"
              ></GoogleLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
import { mapState, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      email: "",
      password: "",
      params: {
        client_id:
          "1023873235318-u0vl9lit8j30jv0nu04qdlf1q08tue06.apps.googleusercontent.com",
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
      // https://www.npmjs.com/package/vue-google-login
    };
  },
  name: "LoginForm",
  components: {
    GoogleLogin,  
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['handleGoogleLogin', 'handleLogin']),
    async onSuccess(googleUser) {
      const payload = {
        access_token: googleUser.getAuthResponse().id_token,
      };
      await this.handleGoogleLogin(payload);
      if (this.isLoggedIn && localStorage.access_token) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign in Success..",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push("/");
      }
    },
    async clickLoginButton() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      await this.handleLogin(payload);
      if (this.isLoggedIn && localStorage.access_token) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign in Success..",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
