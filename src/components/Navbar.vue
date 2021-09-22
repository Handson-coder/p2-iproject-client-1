<template>
  <div id="nav">
    <div
      class="navbar mb-2 shadow-lg bg-neutral-focus text-neutral-content rounded-box"
    >
      <div class="flex-1 px-2 mx-2 ">
        <router-link
          class="btn btn-ghost btn-sm rounded-btn"
          :to="{ name: 'Home' }"
          >Hospital</router-link
        >
      </div>
      <div class="flex-none hidden px-2 mx-2 lg:flex">
        <div class="flex items-stretch">
          <router-link
            v-if="!isLoggedIn"
            class="btn btn-ghost btn-sm rounded-btn"
            :to="{ name: 'LoginForm' }"
            >sign in
          </router-link>
          <router-link
            v-if="!isLoggedIn"
            class="btn btn-ghost btn-sm rounded-btn"
            :to="{ name: 'RegisterForm' }"
            >sign up
          </router-link>
          <router-link
            v-if="isLoggedIn"
            class="btn btn-ghost btn-sm rounded-btn"
            :to="{ name: 'UserFavourite' }"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-5 mr-2 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            favourite list
          </router-link>
          <a
            v-if="isLoggedIn"
            @click.prevent="clickSignOutButton"
            class="btn btn-ghost btn-sm rounded-btn"
          >
            sign out
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "Navbar",
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    ...mapMutations({
      changeIsLoggedIn: "CHANGE_IS_LOGGED_IN",
    }),
    ...mapActions(["signOut"]),

    async clickSignOutButton() {
      await this.signOut();
      if (this.$route.name == "Home")
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign Out Success!",
          showConfirmButton: false,
          timer: 1500,
        });
      else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign Out Success!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push("/");
      }
    },

    async checkAccessToken() {
      if (localStorage.access_token) {
        await this.changeIsLoggedIn(true);
      }
    },
  },
  async created() {
    await this.checkAccessToken();
  },
};
</script>

<style></style>
