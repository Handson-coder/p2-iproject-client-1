<template>
  <div id="nav">
    <div
      class="navbar mb-2 shadow-lg bg-neutral-focus text-neutral-content rounded-box"
    >
      <div class="flex-1 px-2 mx-2">
        <div class="pr-5">
          <img class="w-16 h-16" src="../assets/logo.png" />
        </div>
        <router-link
          class="btn btn-ghost btn-sm rounded-btn"
          :to="{ name: 'Hospital' }"
          >Halo - Dok</router-link
        >
      </div>
      <div class="flex-none hidden px-2 mx-2 lg:flex">
        <div class="flex items-stretch">
          <router-link
            v-if="isLoggedIn"
            class="btn btn-ghost btn-sm rounded-btn"
            :to="{ name: 'SpecialistPage' }"
          >
            Specialist
          </router-link>
          <router-link
            v-if="isLoggedIn"
            class="btn btn-ghost btn-sm rounded-btn"
            :to="{ name: 'ChatDoctor' }"
          >
            Consult
          </router-link>
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
      if (this.$router.name == "Home") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign Out Success!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push("/login");
      } else {
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
