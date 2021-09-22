<template>
  <div>
    <div class="hero min-h-screen bg-base-100">
      <div class="flex-col justify-center hero-content lg:flex-row">
        <div class="text-center lg:text-left text-gray-400">
          <h1 class="mb-10 text-5xl font-bold">
            Hello there ...
          </h1>
          <h3 class="mb-20 text-3xl">
            Dont have any Account?
          </h3>
          <h4 class="text-3xl">
            Let's Sign Up to access more features..
          </h4>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                v-model="username"
                type="text"
                placeholder="Your username here..."
                class="input input-bordered label-text"
              />
            </div>
            <div class="mt-5 form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                v-model="email"
                type="text"
                placeholder="test@mail.com"
                class="input input-bordered label-text"
              />
            </div>
            <div class="mt-5 form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                v-model="password"
                style="text-color: white"
                type="password"
                placeholder="password"
                class="input input-bordered label-text"
              />
            </div>
            <div class="form-control mt-8">
              <button
                type="button"
                class="btn btn-primary text-primary-content"
                @click.prevent="clickSignUpButton"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "RegisterForm",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["isRegister"]),
  },
  methods: {
    ...mapActions(["handleRegister"]),
    async clickSignUpButton() {
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      await this.handleRegister(payload);
      if (this.isRegister) {
        await this.$router.push("/login");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign Up Success.. Now, you can Sign in Here..",
          showConfirmButton: false,
          timer: 3000,
        });
      } 
    },
  },
};
</script>

<style></style>
