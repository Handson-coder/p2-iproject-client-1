<template>
  <div class="justify-center items-center">
    <div
      class=" w-full lg:max-w-full lg:flex flex flex-col justify-center items-center"
    >
      <div class="text-gray-500 font-bold text-3xl mb-6">
        ~ {{ hospitalProfile.meta_keywords }} ~
      </div>
      <div
        class="h-full lg:h-full lg:w-48 flex flex-row bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      >
        <img class="w-full h-full" :src="hospitalProfile.main_image" alt="" />
      </div>
      <div
        class=" mt-7 mb-7 items-center border-r border-b border-l border-primary lg:border-l lg:border-t lg:border-primary bg-#52606e rounded-b lg:rounded-b-none lg:rounded-r p-4 pr-2 pl-2 flex flex-col justify-between leading-normal"
      >
        <div class="flex flex-col justify-between">
          <div class="text-sm">
            <div class="flex flex-row ">
              <div class="text-gray-400 leading-none">
                <p class="text-2xl text-primary">
                  <b>
                    {{ hospitalProfile.city_name }}
                  </b>
                </p>
                <p class="mt-3 mb-5 text-1xl">
                  <b>DISTRICT :</b>
                  {{ hospitalProfile.district_name }}
                </p>
                <p class="mt-3 mb-5 text-1xl">
                  {{ hospitalProfile.about }}
                </p>
                <p class="mt-3 mb-5 text-1xl">
                  <b>TYPE :</b>
                  {{ hospitalProfile.hospital_type }}
                </p>
                <div>
                  <p v-if="!hospitalProfile.bpjs" class="mt-3 mb-5 text-1xl">
                    <b>BPJS :</b> Not Available
                  </p>
                  <p v-if="hospitalProfile.bpjs" class="mt-3 mb-5 text-1xl">
                    <b>BPJS :</b> Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <p class="text-gray-400 text-base">
            {{ hospitalProfile.address }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
// import Swal from "sweetalert2";
export default {
  name: "HospitalProfile",
  computed: {
    ...mapState(["hospitalProfile"]),
  },
  methods: {
    ...mapActions(["fetchHospitalProfile"]),
  },
  async created() {
    await this.fetchHospitalProfile(this.$route.params.slug);
  },
};
</script>

<style></style>
