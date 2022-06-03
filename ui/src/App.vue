<template>
  <a-config-provider :locale="fr_FR">
    <div id="app">
      <span
        v-if="mode === 'development'"
        style="color: red; float: left; position: fixed"
      >
        Mode {{ mode }}
      </span>
      <router-view name="background"> </router-view>
      <router-view />
      <!-- <ChatBot /> -->
    </div>
  </a-config-provider>
</template>

<script>
import fr_FR from "ant-design-vue/lib/locale/fr_FR";
//import ChatBot from "@/components/ChatBot.vue";

export default {
  data() {
    return {
      fr_FR,
      mode: process.env.NODE_ENV,
    };
  },

  mounted() {
    if (process.env.NODE_ENV === "development") {
      console.log("running development mode");
    } else {
      // console.log('running production mode')
      return;
    }
  },
  components: {
    // ChatBot,
  },
};
</script>

<style lang="scss">
body {
  // @media screen and (min-width: 992px) {
  //   .ant-modal-centered {
  //     margin-left: 200px !important;
  //   }
  // }
  .ant-layout-sider-zero-width-trigger {
    top: 17px;
  }
}
#app {
  height: 100%;
  display: flex;
}
</style>

<style>
@import "styles/style.css";

/*@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');*/
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
</style>