<template>
  <div class="incoming_msg pr-100">
    <div class="received_msg" v-if="message.username != user.username">
      <span class="time_date">
        {{ message.username }}: {{ message.message }}
      </span>
    </div>
    <div class="received_msg" v-else>
      <span class="time_date">
        {{ message.username }}: {{ message.message }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "IncomingMsg",
  props: ["message"],
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["findUserLogin"]),
  },
  async created() {
    await this.findUserLogin();
  },
};
</script>
