<template>
  <!-- <div> -->
  <div class="sidebar ml-5" style="width:25%;">
    <div class="form-control">
      <h5 class="font-bold uppercase text-gray-400 mb-2">Province</h5>
      <label
        class="cursor-pointer label"
        v-for="province in provinces"
        :key="province.id"
      >
        <span class="label-text">{{ province.name }}</span>
        <input
          name="opt"
          type="radio"
          checked="checked"
          class="radio radio-primary"
          :value="province.id"
          v-model="provinceId"
        />
      </label>
    </div>
    <div class="p-1 my-2 mt-20">
      <button
        @click.prevent="fetchingHospitals()"
        class="
              px-4
              py-2
              mb-3
              btn btn-outline btn-primary
              text-gray-200
              rounded-b
              w-full
              capitalize
              tracking-wide
            "
      >
        FIND
      </button>
    </div>
    <div class="p-1 my-2 mt-5">
      <button
        @click.prevent="clearPayload()"
        class="
              px-4
              py-2
              mb-3
              btn btn-outline btn-primary
              text-gray-200
              rounded-b
              w-full
              capitalize
              tracking-wide
            "
      >
        CLEAR SEARCH
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "SidebarFilter",
  data() {
    return {
      provinceId: "",
    };
  },
  computed: {
    ...mapState(["provinces"]),
  },
  methods: {
    ...mapActions(["fetchProvinces", "fetchHospitals"]),
    async fetchingHospitals() {
      let payload = {};
      if (this.provinceId) {
        payload.provinceId = this.provinceId;
      }
      if (payload.provinceId) {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: `Fetching Hospitals, Please Wait..`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      await this.fetchHospitals(payload);
    },
    async clearPayload() {
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Clearing Filter.. Please Wait..",
        showConfirmButton: false,
        timer: 1500,
      });
      this.provinceId = ""
      await this.fetchHospitals();
    },
  },
  async created() {
    this.fetchProvinces();
  },
};
</script>

<style></style>
