<template>
  <div class="home">
    <layout />
    <div v-if="chatVisible">
      <ChatBot />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Layout from "@/components/Layout.vue";
import ChatBot from "@/components/ChatBot.vue";

export default {
  name: "Home",
  components: {
    Layout,
    ChatBot,
  },
  data() {
    return {
      chatVisible: false,
    };
  },
  methods: {
    ...mapActions(["removeToken"]),
    checkToken() {
      const tokenInfos = JSON.parse(sessionStorage.getItem("tokenInfos"));

      if (tokenInfos) {
        const token = tokenInfos.TOKEN;
        const date = new Date(token.EXPIRATION).getTime();
        const now = new Date().getTime();
        if (date <= now) {
          this.removeToken("tokenInfos");
        } else {
          if (this.$store.state.token === null) {
            this.$store.state.token = token;
          }
          this.$router.push("/accueil", () => {});
          this.chatVisible = true;
        }
      } else {
        this.chatVisible = false;
        window.Kommunicate.logout();
        this.removeToken("tokenInfos");
      }
    },
  },
  mounted() {
    //this.chatVisible = false;
    this.checkToken();
  },
  beforeDestroy() {
    this.chatVisible = false;
    window.Kommunicate.logout();
    this.removeToken("tokenInfos");
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/spacing.scss";
.home {
  @include flex-column;
  @include flex-center;
  height: 100%;
  width: 100%;
}
</style>