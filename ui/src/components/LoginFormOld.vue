<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login"
    @submit="handleSubmit"
  >
    <img class="logo" alt="logo Thiriez Literie" src="../assets/logo.jpg" />
    <h1>Portail B2B Thiriez Literie</h1>
    <h2>CONNEXION</h2>
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          {
            rules: [
              {
                type: 'email',
                required: true,
                message: 'Merci de saisir un email valide!',
              },
            ],
          },
        ]"
        placeholder="Adresse e-mail"
        class="login-input"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input-password
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Merci de saisir votre mot de passe!',
              },
            ],
          },
        ]"
        type="password"
        placeholder="Mot de passe"
        class="login-input"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-signin">
        Se connecter
      </a-button>
    </a-form-item>
    <router-link :to="{ name: 'ForgotPassword' }"
      >Mot de passe oublié ?</router-link
    >
    <router-link :to="{ name: 'CreateAccount' }"
      >Créer votre compte !</router-link
    >
  </a-form>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const credentials = {
            username: values.userName,
            password: values.password,
          };
          this.$store.dispatch("getTokenProperties", credentials);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.logo {
  width: 300px;
  margin-bottom: 25px;
}
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &-actions {
    flex-direction: column;
  }
  &-input,
  &-signin {
    width: 300px;
  }
}
</style>