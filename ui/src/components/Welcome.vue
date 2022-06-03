<template>
  <div class="hello"></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Welcome",
  methods: {
    ...mapActions(["removeToken"]),
  },
  mounted() {
    const tokenInfos = sessionStorage.getItem("tokenInfos");

    if (tokenInfos) {
      const token = JSON.parse(tokenInfos);
      const date = new Date(token.EXPIRATION).getTime();
      const now = new Date().getTime();
      if (date <= now) {
        this.removeToken("tokenInfos");
      } else {
        if (this.$store.state.token === null) {
          this.$store.state.token = token;
        }
        this.$router.push("/accueil", () => {});
      }
    } else {
      this.$router.push("/login", () => {});
    }
  },
};
</script>

<style lang="scss" scoped>
</style>