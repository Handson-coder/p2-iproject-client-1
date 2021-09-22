<template>
  <div class="justify-center items-center">
    <div
      class=" w-full lg:max-w-full lg:flex flex flex-col justify-center items-center"
    >
      <div class="text-gray-500 font-bold text-3xl mb-6">
        ~ {{ doctorProfile.pre_salutation }} {{ doctorProfile.full_name }}
        {{ doctorProfile.post_salutation }} ~
      </div>
      <div
        class="h-full lg:h-full lg:w-48 flex flex-row bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      >
        <img class="w-full h-full" :src="doctorProfile.image_url" alt="" />
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
                    {{ doctorProfile.provider_locations[0].city }}
                  </b>
                </p>
                <!-- dikarenakan profile_section[0].valuenya akan berubah2 setiap di refresh, jadi saya melakukan seleksi disini memakai v-if agar mendapatkan hasil yang benar -->
                <p
                  v-if="!Number(this.doctorProfile.profile_sections[0].value) === true"
                  class="mt-3 mb-5 text-1xl"
                >
                  <b>ALUMNUS :</b> {{ doctorProfile.profile_sections[0].value }}
                </p>
                <p
                  v-if="!Number(this.doctorProfile.profile_sections[1].value) === true"
                  class="mt-3 mb-5 text-1xl"
                >
                  <b>ALUMNUS :</b> {{ doctorProfile.profile_sections[1].value }}
                </p>
                <p
                  v-if="!Number(this.doctorProfile.profile_sections[2].value) === true"
                  class="mt-3 mb-5 text-1xl"
                >
                  <b>ALUMNUS :</b> {{ doctorProfile.profile_sections[2].value }}
                </p>
                <p class="mt-3 mb-5 text-1xl">
                  <b>DISTRICT :</b>
                  {{ doctorProfile.provider_locations[0].district }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <p class="text-gray-400 text-base">
            {{ doctorProfile.description }}
          </p>
        </div>
        <div class="mt-3 flex flex-col justify-between">
          <div class="text-sm">
            <button
              class="mt-4 text-primary-content btn btn-primary"
              @click.prevent="addToFavouriteList(movieDetail.id)"
            >
              chat with doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "DoctorProfile",
  computed: {
    ...mapState(["doctorProfile"]),
  },
  methods: {
    ...mapActions(["fetchDoctorProfile"]),
  },
  async created() {
    await this.fetchDoctorProfile(this.$route.params.slug);
  },
};
</script>

<style></style>
