<template>
  <div>
    <div class="flex flex-row">
    <SidebarFilterHospital></SidebarFilterHospital>
    <HospitalList></HospitalList>
    </div>
    <router-view />
  </div>
</template>

<style></style>

<script>
import SidebarFilterHospital from "../components/SidebarFilterHospital.vue";
import HospitalList from "../components/HospitalList.vue";
export default {
  name: "Home",
  components: {
    SidebarFilterHospital,
    HospitalList
  }
};
</script>
