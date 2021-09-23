<template>
  <div>
    <div class="mt-24 pl-56" v-if="hospitals.totalPages == 0">
      <img
        src="https://ell.brainpop.com/conceptmap/img/img_noresults_movies.png"
      />
    </div>
    <div
      v-else
      class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6"
    >
      <div
        class="col justify-center h-full w-full lg:max-w-full lg:flex"
        v-for="hospital in hospitals.hospitalWithPagination"
        :key="hospital.id"
      >
        <div
          class="lg:h-52 lg:w-80 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        >
          <img
            class="object-contain w-full h-full"
            :src="hospital.images"
          />
        </div>
        <div
          class="w-full border-r border-b border-l border-primary lg:border-l lg:border-t lg:border-primary bg-#52606e rounded-b lg:rounded-b-none lg:rounded-r lg:rounded-l lg:rounded-b p-4 flex flex-col justify-between leading-normal"
        >
          <div class="mb-3">
            <div class="text-gray-300 font-bold text-xl mb-2">
              {{ hospital.name }}
            </div>
            <p class="text-gray-400 text-base">
              {{ hospital.region }}
            </p>
          </div>
          <div class="mt-3 flex flex-col justify-between">
            <div class="text-sm">
              <p class="text-primary uppercase">
                <b>{{ hospital.Province.name }}</b>
              </p>
            </div>
            <button
              class="mt-3 text-primary-content btn btn-primary"
              @click.prevent="toDetailHospital(hospital.slug)"
            >
              DETAIL
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 ml-2 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-group" v-if="hospitals.totalPages != 0">
      <button class="btn btn-primary">Previous</button>
      <button
        class="btn"
        v-for="index in hospitals.totalPages"
        :key="index"
        @click.prevent="setPage(index)"
      >
        {{ index }}
      </button>
      <button class="btn btn-primary">Next</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "HospitalList",
  computed: {
    ...mapState(["hospitals"]),
  },
  methods: {
    ...mapActions(["fetchHospitals", 'fetchHospitalProfile']),
    async setPage(page) {
      let payload = {};
      if (page) {
        payload.page = page;
      }
      await this.fetchHospitals(payload);
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: `Fetching Hospital with ${page}.. Please Wait..`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async toDetailHospital(slug) {
      // console.log(slug);
      const payload = slug
      await this.fetchHospitalProfile(payload);
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Fetching Hospital.. Please Wait..",
        showConfirmButton: false,
        timer: 1500,
      });
      this.$router.push(`/hospitals/${slug}`);
    },
  },
  async created() {
    await this.fetchHospitals();
    Swal.fire({
      position: "top-end",
      icon: "info",
      title: "Fetching Hospitals.. Please Wait..",
      showConfirmButton: false,
      timer: 1500,
    });
  },
};
</script>

<style></style>
