<template>
  <div class="mail-send">
    <img class="logo" alt="logo Thiriez Literie" src="../assets/LOGO_institutionnel-vectoisé.svg">
    <h1>Portail B2B Thiriez Literie</h1>
    <h3>Un mail vient de vous être envoyé pour {{ message }}</h3>
    <router-link class="return" :to="{name: 'Login'}">Retour</router-link>
  </div>
</template>

<script>
export default {
  name: 'SendMail',
  props: {
    message : String
  }
}
</script>

<style lang="scss" scoped>
  .logo {
    width: 300px;
    margin-bottom: 25px;
  }
  .mail-send{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &-actions {
      flex-direction: column;
    }
  }
  .return {
    margin-bottom: 25px;
  }
</style>