<template>
  <div>
    <div v-if="message.username == user.username" class="pl-80 items-end">
      <div>
        <div>
          <div class="incoming_msg">
            <div class="received_msg">
              <span class="time_date">
                {{ message.message }} : (Me)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="pr-80" >
      <div>
        <div>
          <div class="incoming_msg ">
            <div class="received_msg">
              <span class="time_date">
                {{ message.username }}: {{ message.message }}
              </span>
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
