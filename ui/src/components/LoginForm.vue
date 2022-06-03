<template>
  <a-form-model
    id="components-form-demo-normal-login"
    class="login"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :form="form"
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
  >
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :xs="24" :sm="22" :md="12" :lg="12" :xl="12">
        <div class="blocLogo">
          <img
            class="logoFormulaire"
            alt="logo Thiriez Literie"
            src="../assets/LOGO_institutionnel-vectoisé.svg"
          />
        </div>
      </a-col>
      <a-col :xs="24" :sm="22" :md="12" :lg="12" :xl="12">
        <!-- <h1>Portail B2B Thiriez Literie</h1> -->
        <h1>Connexion</h1>
        <a-form-model-item class="formInput" has-feedback label="" prop="email">
          <a-input
            class="divInput formInput-mail"
            v-model="ruleForm.email"
            type="email"
            placeholder="Adresse e-mail"
            autocomplete="on"
            size="large"
            @blur="resetInput('email')"
            @keyup.enter="onSubmit"
          >
            <a-icon slot="addonBefore" type="user" style="color: #002043" />
          </a-input>
        </a-form-model-item>

        <a-form-model-item
          class="formInput"
          has-feedback
          label=""
          prop="password"
        >
          <a-input-password
            class="divInput formInput-password"
            v-model.lazy="ruleForm.password"
            type="password"
            placeholder="Mot de passe"
            autocomplete="on"
            size="large"
            @blur="resetInput('password')"
            @keyup.enter="onSubmit"
          >
            <a-icon slot="addonBefore" type="lock" style="color: #002043" />
          </a-input-password>
        </a-form-model-item>
        <div style="color: red">
          {{ descriptionCodeReponse }}
        </div>

        <br />
        <div class="form-action">
          <a-button
            class="monBouton"
            @click="onSubmit"
            :disabled="buttonDisabled"
          >
            Se connecter
          </a-button>
        </div>
        <br />
        <div>
          <div class="divLiens">
            <router-link :to="'/mot-de-passe-oublie'" style="fontsize: 20px"
              ><div class="mesLiens mesLiens-pass" @click="transferEmail">
                Mot de passe oublié
              </div>
            </router-link>
          </div>
          <div class="divLiens">
            <router-link :to="'/creation-de-compte'" style="fontsize: 20px">
              <div class="mesLiens mesLiens-creaCompte">Créer un compte</div>
            </router-link>
          </div>
        </div>
        <br />
      </a-col>
    </a-row>

    <a-modal
      class=""
      :centered="true"
      :closable="false"
      :maskClosable="false"
      v-if="visibleCheckModal"
      v-model="visibleCheckModal"
      :footer="null"
      style="margin: auto"
    >
      <h2>
        {{ titreModal }}
      </h2>
      <div style="display: flex">
        <div style="width: 20%">
          <a-icon
            v-if="typeModal == 'check'"
            type="check-circle"
            theme="twoTone"
            two-tone-color="#4fc08d"
            style="font-size: 50px; margin: auto; width: 100%"
          />
          <a-icon
            v-if="typeModal == 'error'"
            type="close-circle"
            theme="twoTone"
            two-tone-color="#e12020"
            style="font-size: 50px; margin: auto; width: 100%"
          />
          <svg
            v-if="typeModal == 'warning'"
            style="
              color: #faad14;
              font-size: 50px;
              display: block;
              margin: auto;
            "
            viewBox="64 64 896 896"
            data-icon="exclamation-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class=""
          >
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            ></path>
            <path
              d="M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"
            ></path>
          </svg>
        </div>
        <div style="width: 60%; text-align: center; vertical-align: center">
          <h3 style="text-align: center; padding: 10px">
            {{ descriptionModal }}
          </h3>
          <p v-if="codeReponse !== 6" style="color: red">
            Le compte sera vérouillé après trois tentatives erronées.
          </p>
        </div>
        <div style="width: 20%"></div>
      </div>
      <br />
      <div class="action-modal">
        <a-button v-if="btn2 != ''" class="BoutonModal" @click="closeModal">
          {{ btn2 }}
        </a-button>
        <a-button v-if="btn1 != ''" class="BoutonModal" @click="closeModal">
          {{ btn1 }}
        </a-button>
      </div>
    </a-modal>
  </a-form-model>
</template>









<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  mounted() {
    if (process.env.NODE_ENV === "development") {
      // console.log('dev mode')
      // this.ruleForm.email = "demows-thiriez-test@yopmail.com";
      this.ruleForm.email = "c.plancke@thiriez-literie.fr";
      this.ruleForm.password = "azerty123";
    } else {
      // console.log('prod mode')
      return;
    }
    const log1 = JSON.parse(sessionStorage.getItem("log1"));
    if (log1) {
      this.ruleForm.email = log1;
      sessionStorage.removeItem("log1");
    }
  },
  data: function () {
    let validatePass = (rule, value, callback) => {
      if (value === "" && this.ruleForm.email !== "") {
        callback(new Error("Veuillez renseigner le mot de passe"));
      } else if (value !== "" && !/^([a-zA-Z0-9]{8,16})$/.test(value)) {
        callback(new Error("Veuillez choisir 8 à 16 lettres ou chiffre"));
      } else if (
        value !== "" &&
        !/^(?=.*[0-9])([a-zA-Z0-9]{8,16})$/.test(value)
      ) {
        // /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,16})$/
        callback(new Error("Veuillez utiliser au moins un chiffre"));
      } else {
        //this.$form.validateField("password");
        callback();
      }
    };
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 24 },
      buttonDisabled: false,

      visibleCheckModal: false,
      titreModal: "val titre",
      descriptionModal: "val description",
      typeModal: "check",
      btn1: "",
      btn2: "",

      descriptionCodeReponse: "",
      ruleForm: {
        // email: "demows-thiriez-test@yopmail.com",
        email: "",
        // password: "azerty123",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Veuillez renseigner l'email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Veuillez entrer une adresse email valide",
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: validatePass,
            trigger: "blur",
          },
          {
            required: true,
            message: "Veuillez renseignez le mot de passe",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    transferEmail() {
      sessionStorage.setItem("log", JSON.stringify(this.ruleForm.email));
    },
    showModal(titre, description, typeModal, btn1, btn2) {
      this.titreModal = titre;
      this.descriptionModal = description;
      this.typeModal = typeModal;
      this.visibleCheckModal = true;
      this.btn1 = btn1;
      this.btn2 = btn2;
    },
    closeModal() {
      this.visibleCheckModal = false;
      const TokenProperties = JSON.parse(
        sessionStorage.getItem("tokenProperties")
      );
      this.codeReponse = TokenProperties.code;
      if (this.codeReponse == 0) {
        localStorage.clear();
        sessionStorage.clear();
        this.$router.push("/accueil", () => {});
      }
    },

    resetInput(model) {
      // console.log("test reset " + this.ruleForm[model]);
      //this.$form.resetFields();
      if (this.ruleForm[model] === "") {
        setTimeout(() => {
          this.$refs.ruleForm.clearValidate(model);
          // console.log("test dans setTimeout");
        }, 1000);
      }
    },
    async onSubmit() {
      this.buttonDisabled = true;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.handleSubmit();
          setTimeout(() => {
            const TokenProperties = JSON.parse(
              sessionStorage.getItem("tokenProperties")
            );
            let descriptionReponse = TokenProperties.description;
            this.codeReponse = TokenProperties.code;
            // console.log('description : ' + descriptionReponse);
            // console.log('code : ' + this.codeReponse);
            if (this.codeReponse != 0) {
              this.showModal("Erreur", descriptionReponse, "error", "OK", "");
              if (this.codeReponse == 6) {
                this.ruleForm.email = "";
              } else if (this.codeReponse !== 0) {
                this.ruleForm.password = "";
              } else {
                this.ruleForm.email = "";
                this.ruleForm.password = "";
              }
            } else {
              //this.showModal('Réussite', descriptionReponse, 'check', 'Accéder au site', '');
              this.$router.push("/accueil", () => {});
            }
          }, 2000);
        } else {
          // console.log("erreurs dans le form !");
          //return false;
        }
        setTimeout(() => {
          this.buttonDisabled = false;
        }, 3000);
      });
    },
    async handleSubmit() {
      this.buttonDisabled = true;
      //e.preventDefault();
      const credentials = {
        username: this.ruleForm.email,
        password: this.ruleForm.password,
      };
      await this.$store.dispatch("getTokenProperties", credentials);
    },
  },
};
</script>









<style lang="scss" scoped>
.login {
  background-color: #fff;
  width: auto;
  height: fit-content;
  margin: auto;
  padding: 15px;
  display: block;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
}

.blocLogo {
  align-items: center;
  width: 100%;
  max-width: 450px;
  max-height: 350px;
  vertical-align: middle;
  margin: auto;
}
img.logoFormulaire {
  width: 100%;
  margin: auto;
  padding-left: 50px;
  padding-right: 50px;
}

.form-action {
  margin: auto;
  width: 128px;
  align-self: center;
}
button,
.monBouton {
  color: #ffffff;
  background-color: #002043;
  width: 100%;
  height: auto;
  margin: auto;
  padding-top: 10px;
  padding-bottom: 10px;
}
button:hover,
button:focus,
.monBouton:hover,
.monBouton:focus,
html [type="button"]:hover {
  color: #002043;
  background-color: #ffffff;
  border: #002043 solid 1px;
}

.formInput {
  width: 100%;
  text-align: center;
  &-mail {
    margin: auto;
    width: 306px;
    max-width: 100%;
  }
  &-password {
    margin-left: auto;
    width: 300px;
    max-width: 100%;
  }
}

/* ################ Les Boutons et Liens ################ */
.divLiens {
  margin: auto;
  width: 150px;
  align-self: center;
}
.mesLiens {
  margin: auto;
  &-pass {
    width: 85%;
  }
  &-creaCompte {
    width: 70%;
  }
}
.mesLiens,
.mesSteps {
  color: #002043;
  cursor: pointer;
}
.mesLiens:hover,
.mesSteps:hover {
  color: #004794;
}

/* ############# les champs de formulaire ################# */
.ant-input:hover,
.ant-input-lg:hover {
  border-color: #002043;

  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
}
.ant-input:focus,
.ant-input-lg:focus {
  border-color: #002043;

  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
}

.action-modal {
  margin: auto;
  width: 100%;
  align-self: center;
  text-align: center;
}
.BoutonModal {
  color: #ffffff;
  background-color: #002043;
  width: auto;
  min-width: 90px;
  max-width: 200px;
  margin: auto 5px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>