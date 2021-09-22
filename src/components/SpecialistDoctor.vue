<template>
  <div
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
        <img class="object-contain w-full h-full" :src="hospital.images" />
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
</template>

<script>
export default {};
</script>

<style></style>
