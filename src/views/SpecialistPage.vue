<template>
  <div
    class="p-10 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6"
  >
    <div
      class="col justify-center h-full w-full lg:max-w-full lg:flex"
      v-for="specialist in specialists"
      :key="specialist.id"
    >
      <div
        class="md:items-center w-full border-r border-b border-l border-primary lg:border-l lg:border-t lg:border-primary bg-#52606e rounded-b lg:rounded-b-none lg:rounded-r lg:rounded-l lg:rounded-b p-4 flex flex-col justify-between leading-normal"
      >
        <div
          class="lg:h-48 lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        >
          <img class="w-full h-full" :src="specialist.images" />
        </div>
        <div class="mb-3 mt-8">
          <div class="text-gray-300 font-bold text-xl mb-2">
            {{ specialist.name }}
          </div>
        </div>
        <div class="mt-3 flex flex-col justify-between">
          <button
            class="text-primary-content btn btn-primary"
            @click.prevent="findDoctor(specialist.id)"
          >
            find doctor
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
import { mapActions, mapState } from "vuex";
export default {
  name: "SpecialistDoctor",
  computed: {
    ...mapState(["specialists"]),
  },
  methods: {
    ...mapActions(["fetchSpecialist", 'fetchSpecialistDoctor']),
    async findDoctor(SpecialistId) {
      const payload = SpecialistId
      await this.fetchSpecialistDoctor(payload)
      this.$router.push(`/specialist/${payload}`)
    }
  },
  async created() {
    await this.fetchSpecialist();
  },
};
</script>

<style></style>
