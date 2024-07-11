<!-- GoogleCallback.vue -->
<template>
  <div>
    <p>Logging in...</p>
  </div>
</template>

<script>
import axios from "../../config.js";

export default {
  mounted() {
    this.handleGoogleResponse();
  },
  methods: {
    handleGoogleResponse() {
      const sessionId = this.$route.query.sessionId;

      axios.get(`/account/get-session-data/${sessionId}`).then((response) => {
        localStorage.setItem("jwt", response.data.accessToken);
        this.$router.push("/dashboard");
      });
    },
  },
};
</script>
