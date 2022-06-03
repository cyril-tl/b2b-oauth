<template>
  <div class="contactPage">
    <a-spin
      tip="Chargement des contacts..."
      size="large"
      :spinning="visibleSpin"
    >
      <a-row class="contactPage-row">
        <a-col
          v-for="(contact, index) in contacts"
          :key="index"
          :xs="24"
          :sm="24"
          :md="12"
          :lg="8"
          :xl="8"
          class="contactPage-infoContact"
        >
          <h1>{{ contact.DESIGNATION }}</h1>
          <p>{{ contact.NOM }}</p>
          <p v-if="contact.TEL !== 'Inconnu'">{{ contact.TEL }}</p>
          <p v-else>aucun tel. renseigné</p>
          <p>{{ contact.MAIL.toLowerCase() }}</p>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contacts: [],
      visibleSpin: true,
    };
  },
  async mounted() {
    this.visibleSpin = true;
    const tokenInfos = JSON.parse(sessionStorage.getItem("tokenInfos"));
    if (tokenInfos) {
      const token = tokenInfos.TOKEN;
      const titleHeader = {
        title: "Mes contacts",
        subTitle: "",
        icon: '<i aria-label="icon: contacts" class="anticon anticon-contacts"><svg viewBox="64 64 896 896" data-icon="contacts" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M594.3 601.5a111.8 111.8 0 0 0 29.1-75.5c0-61.9-49.9-112-111.4-112s-111.4 50.1-111.4 112c0 29.1 11 55.5 29.1 75.5a158.09 158.09 0 0 0-74.6 126.1 8 8 0 0 0 8 8.4H407c4.2 0 7.6-3.3 7.9-7.5 3.8-50.6 46-90.5 97.2-90.5s93.4 40 97.2 90.5c.3 4.2 3.7 7.5 7.9 7.5H661a8 8 0 0 0 8-8.4c-2.8-53.3-32-99.7-74.7-126.1zM512 578c-28.5 0-51.7-23.3-51.7-52s23.2-52 51.7-52 51.7 23.3 51.7 52-23.2 52-51.7 52zm416-354H768v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H548v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H328v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H96c-17.7 0-32 14.3-32 32v576c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V256c0-17.7-14.3-32-32-32zm-40 568H136V296h120v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h120v496z"></path></svg></i>',
      };
      await this.$store.dispatch("setHeaderTitle", titleHeader);

      await this.$store.dispatch("getContactsInfos", token);
      this.contacts = JSON.parse(localStorage.getItem("contactsInfos"));
      this.visibleSpin = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.contactPage {
  margin: 4%;
  min-height: 200px;
  &-row {
    min-height: 200px;
    margin: auto;
    margin-bottom: 32px;
    text-align: justify;
  }
  &-infoContact {
    padding: 16px;
    h1 {
      text-align: justify;
    }
  }
}
</style>