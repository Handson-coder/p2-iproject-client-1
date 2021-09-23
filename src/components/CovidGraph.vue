<template>
  <div>
    <div class="mb-3 mt-8 uppercase">
      <div class="text-gray-300 font-bold text-3xl mb-2">
        ~ DATA COVID-19 DI SETIAP PROVINSI DI
        {{ covidStatusInIndonesia.name }} ~
      </div>
    </div>
    <div
      class="p-10 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6"
    >
      <div
        class="col justify-center h-full w-full lg:max-w-full lg:flex"
        v-for="covidStat in covidStatusInIndonesia.regions"
        :key="covidStat.id"
      >
        <div
          class="md:items-center w-full border-r border-b border-l border-primary lg:border-l lg:border-t lg:border-primary bg-#52606e rounded-b lg:rounded-b-none lg:rounded-r lg:rounded-l lg:rounded-b p-4 flex flex-col justify-between leading-normal"
        >
          <div class="mb-3 mt-1">
            <div class="text-gray-300 font-bold text-2xl mb-2">
              {{ covidStat.name }}
            </div>
          </div>
          <div class="mb-3 mt-1">
            <div class="text-gray-300 font-bold text-2xl mb-2">
              Status
            </div>
          </div>
          <div class="mb-3 mt-1">
            <div class="text-primary font-bold text-1xl mb-2">
              Infected: {{ covidStat.numbers.infected }} Orang
            </div>
            <div class="text-accent font-bold text-1xl mb-2">
              Recovered: {{ covidStat.numbers.recovered }} Orang
            </div>
            <div class="text-error font-bold text-1xl mb-2">
              Fatal: {{ covidStat.numbers.fatal }} Orang
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CovidGrafik",
  computed: {
    ...mapState(["covidStatusInIndonesia"]),
  },
  methods: {
    ...mapActions(["fetchCovidStatusInIndonesia"]),
  },
  async created() {
    await this.fetchCovidStatusInIndonesia();
  },
};
</script>

<style></style>
