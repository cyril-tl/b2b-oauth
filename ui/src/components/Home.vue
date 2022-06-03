<template>
  <div class="homePage">
    <a-spin tip="Chargement des annonces..." size="large" :spinning="visibleSpin">
      <div v-for="(content, index) in homeContent" :key="
        Math.ceil(
          Math.random() * 10 + Math.random() * 100 + Math.random() * 1000
        ) + content.VALEUR_ID
      " class="homePage-content">
        <div v-if="content.ACTIF">
          <div class="homePage-content-title">
            <img v-if="content.MEMOS[0]" :src="`data:image/png;base64,${content.MEMOS[0]}`" />
            <h1>{{ content.CHAINES[0] }}</h1>
          </div>
          <span v-html="content.MEMOS[1]" />
          <hr v-if="index < homeContent.length - 1" />
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeContent: null,
      visibleSpin: true,
    };
  },
  async mounted() {
    const titleHeader = {
      title: "Accueil",
      subTitle: "",
      icon: '<i aria-label="icon: home" class="anticon anticon-home"><svg viewBox="64 64 896 896" data-icon="home" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path></svg></i>',
    };
    await this.$store.dispatch("setHeaderTitle", titleHeader);

    const tokenInfos = JSON.parse(sessionStorage.getItem("tokenInfos"));
    if (tokenInfos) {
      const token = tokenInfos.TOKEN;
      await this.$store.dispatch("getHomeContent", token);
      let content = JSON.parse(localStorage.getItem("homeContent"));
      content.sort((a, b) =>
        a.VALEUR_ID !== b.VALEUR_ID ? (a.VALEUR_ID < b.VALEUR_ID ? -1 : 1) : 0
      );
      this.homeContent = content;

      this.visibleSpin = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.homePage {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #000;
  margin: auto;
  padding: 32px;

  &-content {
    margin-bottom: 32px;

    &-title {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 80px;
        width: auto;
        margin-right: 25px;
      }
    }
  }
}
</style>