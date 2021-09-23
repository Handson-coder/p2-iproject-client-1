<template>
  <div
    class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6"
  >
    <div
      class="col justify-center h-full w-full lg:max-w-full lg:flex"
      v-for="doctor in doctorSpecialists"
      :key="doctor.id"
    >
      <div
        class="lg:h-52 lg:w-80 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      >
        <img class="object-contain w-full h-full" :src="doctor.images" />
      </div>
      <div
        class="w-full border-r border-b border-l border-primary lg:border-l lg:border-t lg:border-primary bg-#52606e rounded-b lg:rounded-b-none lg:rounded-r lg:rounded-l lg:rounded-b p-4 flex flex-col justify-between leading-normal"
      >
        <div class="mb-3">
          <div class="text-gray-300 font-bold text-xl mb-2">
            {{doctor.pre_salutation}} {{ doctor.full_name }} {{doctor.post_salutation}}
          </div>
          <p class="text-gray-400 text-base">
            {{ doctor.city }}
          </p>
        </div>
        <div class="mt-3 flex flex-col justify-between">
          <div class="text-sm">
            <p class="text-primary uppercase">
              <b>{{ doctor.Specialist.name }}</b>
            </p>
          </div>
          <button
            class="mt-3 text-primary-content btn btn-primary"
            @click.prevent="toDetailDoctor(doctor.slug)"
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
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: "SpecialistDoctor",
  computed: {
    ...mapState(['doctorSpecialists'])
  },
  methods: {
    ...mapActions(['fetchSpecialistDoctor', 'fetchDoctorProfile']),
    async toDetailDoctor(slug) {
      const payload = slug
      await this.fetchDoctorProfile(payload)
      this.$router.push(`/doctors/${payload}`)
    }
  },
  async created() {
    await this.fetchSpecialistDoctor(+this.$route.params.id)
  }
};
</script>

<style></style>
