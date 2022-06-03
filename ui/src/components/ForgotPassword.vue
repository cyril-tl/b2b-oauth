<template>
  <div class="forgot-password">
    <a-form :form="form" @submit="handleSubmit">
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :xs="24" :sm="22" :md="12" :lg="12" :xl="12">
          <div class="blocLogo">
            <img
              class="logo"
              alt="logo Thiriez Literie"
              src="../assets/LOGO_institutionnel-vectoisé.svg"
            />
          </div>
        </a-col>

        <a-col :xs="24" :sm="22" :md="12" :lg="12" :xl="12">
          <h1>Réinitialisation du mot de passe</h1>

          <div v-if="current <= 0 || current == 2" class="retour">
            <router-link :to="'/Login'" style="fontsize: 20px">
              <div class="mesLiens">
                <a-icon type="left-circle" />
                Retour à la connexion
              </div>
            </router-link>
          </div>
          <br />
          <a-steps
            class="mesSteps"
            :current="current"
            @change="StepChange"
            size="small"
          >
            <a-step title="Email">
              <a-icon slot="icon" type="mail" style="color: #002043" />
            </a-step>
            <a-step title="Code">
              <a-icon slot="icon" type="solution" style="color: #002043" />
            </a-step>
            <a-step title="Mot de passe">
              <a-icon slot="icon" type="lock" style="color: #002043" />
            </a-step>
          </a-steps>

          <div class="steps-content">
            <div v-if="current == 0" @keyup.enter="validateStep0()">
              <a-form-model
                ref="ruleFormStep0"
                class="ruleForm"
                :model="ruleFormStep0"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                :rules="rules"
              >
                <h4>Veuillez renseigner l'email de votre compte</h4>
                <a-form-model-item
                  class="formInput"
                  has-feedback
                  label=""
                  prop="email"
                >
                  <a-input
                    class="formInput-mail"
                    v-model="ruleFormStep0.email"
                    type="email"
                    placeholder="Email"
                    autocomplete="off"
                    size="large"
                    @blur="resetStep0('email')"
                  >
                    <!-- <a-icon slot="addonBefore" type="mail" style="color: #002043" /> -->
                  </a-input>
                </a-form-model-item>
                <!-- <p style="text-align: center; width: 75%; margin: auto">
                  Vous allez recevoir un code à 6 chiffres pour réinitialiseer
                  votre mot de passe
                </p>
                <div style="text-align: center; color: green">
                  {{ descriptionCodeReponse }}
                </div>
                <br />
                <div class="mesLiens" @click="next">
                  J'ai déjà reçu mon code
                  <a-icon type="right-circle" />
                </div> -->
              </a-form-model>
            </div>
            <div v-if="current == 1" @keyup.enter="validateStep1()">
              <a-form-model
                ref="ruleFormStep1"
                class="ruleForm"
                :model="ruleFormStep1"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                :rules="rules"
              >
                <!-- <div v-show="!ruleFormStep0.email"> </div>-->
                <h4>Rappelez l'email</h4>
                <a-form-model-item
                  class="formInput"
                  label=""
                  has-feedback
                  prop="email2"
                >
                  <a-input
                    class="formInput-mail"
                    v-model="ruleFormStep1.email2"
                    type="email"
                    placeholder="Email"
                    autocomplete="off"
                    size="large"
                    @blur="resetStep1('email2')"
                  >
                  </a-input>
                </a-form-model-item>

                <h4>Veuillez saisir le code d'activation reçu par mail</h4>
                <div class="formInput">
                  <div class="testCode">
                    <a-tooltip class="inputReset" title="">
                      <a-popover title="" placement="left">
                        <template slot="content">
                          <span>Vider le champ</span>
                        </template>
                        <a-icon
                          @click="resetCode"
                          type="close-circle"
                          style="color: #002043; font-size: 20px"
                        />
                      </a-popover>
                    </a-tooltip>
                    <input
                      @keyup="onKeyup"
                      @paste="onPaste"
                      v-model="inputA"
                      id="a"
                      class="def-txt-input"
                      name="chars[1]"
                      type="text"
                      value="1"
                      maxlength="1"
                      placeholder=" • "
                    />
                    <input
                      @keyup="onKeyup"
                      v-model="inputB"
                      id="b"
                      class="def-txt-input"
                      name="chars[2]"
                      type="text"
                      value="2"
                      maxlength="1"
                      placeholder=" • "
                    />
                    <input
                      @keyup="onKeyup"
                      v-model="inputC"
                      id="c"
                      class="def-txt-input"
                      name="chars[3]"
                      type="text"
                      value="3"
                      maxlength="1"
                      placeholder=" • "
                    />
                    <input
                      @keyup="onKeyup"
                      v-model="inputD"
                      id="d"
                      class="def-txt-input"
                      name="chars[4]"
                      type="text"
                      value="4"
                      maxlength="1"
                      placeholder=" • "
                    />
                    <input
                      @keyup="onKeyup"
                      v-model="inputE"
                      id="e"
                      class="def-txt-input"
                      name="chars[5]"
                      type="text"
                      value="5"
                      maxlength="1"
                      placeholder=" • "
                    />
                    <input
                      @keyup="onKeyup"
                      v-model="inputF"
                      id="f"
                      class="def-txt-input"
                      name="chars[6]"
                      type="text"
                      value="6"
                      maxlength="1"
                      placeholder=" • "
                    />
                  </div>
                  <div style="height: 40px; margin: 5px auto 10px auto">
                    <a-icon
                      v-if="loadingVerif"
                      type="loading"
                      spin
                      style="color: #002043; font-size: 24px; margin: 16px auto"
                    />
                    <div v-else style="color: green; margin: auto">
                      <p
                        v-if="codeReponse === 0"
                        style="color: green; margin: auto"
                      >
                        {{ descriptionCodeActivationReponse }}
                      </p>
                      <p
                        v-if="codeReponse !== 0"
                        style="color: red; margin: auto"
                      >
                        {{ descriptionCodeActivationReponse }}
                      </p>
                    </div>
                  </div>
                </div>
                <br />
                <!-- <div style="color: green">
                  {{ descriptionCodeReponse }}
                </div> -->
              </a-form-model>
            </div>
            <div v-if="current == 2" @keyup.enter="validateStep2()">
              <a-form-model
                ref="ruleFormStep2"
                class="ruleForm"
                :model="ruleFormStep2"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                :rules="rules"
              >
                <p style="text-align: center">
                  Compte : {{ ruleFormStep1.email2 }}
                </p>
                <p style="text-align: center">
                  Code : {{ ruleFormStep2.verifCode2 }}
                </p>
                <h4>Veuillez entrez votre nouveau mot de passe</h4>
                <a-form-model-item
                  class="formInput"
                  has-feedback
                  label=""
                  prop="pass"
                >
                  <a-input-password
                    class="formInput-content"
                    v-model="ruleFormStep2.pass"
                    type="password"
                    placeholder="Nouveau mot de passe"
                    autocomplete="off"
                    size="large"
                    @blur="resetStep2('pass')"
                  >
                    <a-icon
                      slot="addonBefore"
                      type="lock"
                      style="color: #002043"
                    />
                  </a-input-password>
                </a-form-model-item>
                <br />

                <h4>Veuillez confirmer le nouveau mot de passe</h4>
                <a-form-model-item
                  class="formInput"
                  label=""
                  has-feedback
                  prop="checkPass"
                >
                  <a-input-password
                    class="formInput-content"
                    v-model="ruleFormStep2.checkPass"
                    type="password"
                    placeholder="Confirmer"
                    autocomplete="off"
                    size="large"
                    @blur="resetStep2('checkPass')"
                  >
                    <a-icon
                      slot="addonBefore"
                      type="lock"
                      style="color: #002043"
                    />
                  </a-input-password>
                </a-form-model-item>
                <br />
                <!-- <div style="color: green">
                  {{ descriptionCodeReponse }}
                </div> -->
              </a-form-model>
            </div>
          </div>
          <div class="form-action">
            <a-button
              class="monBouton"
              v-show="current > 0 && current < 2"
              style="margin-left: 8px"
              @click="prev"
              :disabled="buttonDisabled"
            >
              Précédent
            </a-button>
            <a-button
              type="submit"
              class="monBouton"
              v-if="current == 0"
              @click="validateStep0"
              :disabled="buttonDisabled"
            >
              Suivant
            </a-button>
            <a-button
              type="submit"
              class="monBouton"
              v-if="current == 1"
              @click="validateStep1"
              :disabled="buttonDisabled"
            >
              Suivant
            </a-button>
            <a-button
              type="submit"
              class="monBouton"
              v-if="current == 2"
              @click="validateStep2"
              :disabled="buttonDisabled"
            >
              Terminer
            </a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>

    <a-modal
      class="l"
      :centered="true"
      :closable="false"
      :maskClosable="false"
      v-if="visibleModal"
      v-model="visibleModal"
      :footer="null"
    >
      <h2>
        <!-- :style="[{ borderBottom: '5px solid ', margin: '15px auto' }]" -->
        Réinitialisation
      </h2>
      <div style="display: flex">
        <div style="width: 20%">
          <a-icon
            type="check-circle"
            theme="twoTone"
            two-tone-color="#4fc08d"
            style="font-size: 50px; margin: auto; width: 100%"
          />
        </div>
        <div style="width: 60%; text-align: center; vertical-align: center">
          <h3 style="text-align: center; padding: 10px">
            Votre mot de passe a bien été réinitialisé
          </h3>
        </div>
        <div style="width: 20%"></div>
      </div>
      <div class="action-modal">
        <a-button class="BoutonModal" @click="closeModal">
          Retourner à l'accueil
        </a-button>
      </div>
    </a-modal>

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
        </div>
        <div style="width: 20%"></div>
      </div>
      <br />
      <div class="action-modal">
        <a-button v-if="btn2 != ''" class="BoutonModal" @click="closeModal">
          {{ btn2 }}
        </a-button>
        <a-button
          v-if="btn1 != '' && btn1 !== 'Retour à l\'accueil'"
          class="BoutonModal"
          @click="closeModal"
        >
          {{ btn1 }}
        </a-button>
        <a-button
          v-if="btn1 === 'Retour à l\'accueil'"
          class="BoutonModal"
          @click="closeModalFinal"
        >
          {{ btn1 }}
        </a-button>
      </div>
    </a-modal>
  </div>
</template>









<script>
import axios from "axios";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "forgot_password" });
  },
  mounted() {
    //console.log('Bearer Token depuis ForgotPassword : ' + this.$store.state.auth_base64);
    this.auth_base64 = this.$store.state.auth_base64;

    if (process.env.NODE_ENV === "development") {
      // console.log("dev mode");
      //email: "test-thiriez-ws@yopmail.com",
      //this.ruleFormStep0.email = '';
      this.ruleFormStep1.email2 = "";
      this.ruleFormStep1.verifCode = "";
      this.ruleFormStep2.verifCode2 = "";
      this.ruleFormStep2.pass = "azerty123";
      this.ruleFormStep2.checkPass = "azerty123";
    } else {
      // console.log("prod mode");
      return;
    }
    let log = JSON.parse(sessionStorage.getItem("log"));
    if (log) {
      this.ruleFormStep0.email = log;
      sessionStorage.removeItem("log");
    }

    //get params from URL
    // const queryString = window.location.search;
    // console.log(queryString);
    // const urlParams = new URLSearchParams(queryString);
    // const product = urlParams.get("email");
    // console.log('test avec javascript vanilla: '+product);
    //console.log('test avec $route; '+this.$route.query);

    let email = this.$route.query.email;
    let code = this.$route.query.code;
    if (email && code) {
      // console.log("email: " + email + "\ncode: " + code);

      this.ruleFormStep1.email2 = email;
      this.ruleFormStep1.verifCode = code;
      this.ruleFormStep2.verifCode2 = code;
      this.current = 2;
    }
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Veuillez renseigner le nouveau mot de passe"));
      } else if (value !== "" && !/^([a-zA-Z0-9]{8,16})$/.test(value)) {
        callback(new Error("Veuillez choisir 8 à 16 lettres ou chiffre"));
      } else if (
        value !== "" &&
        !/^(?=.*[0-9])([a-zA-Z0-9]{8,16})$/.test(value)
      ) {
        // /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,16})$/
        callback(new Error("Veuillez utiliser au moins un chiffre"));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Veuillez répéter le nouveau mot de passe"));
      } else if (value !== this.ruleFormStep2.pass) {
        callback(new Error("Les mots de passe sont différents !"));
      } else {
        callback();
      }
    };
    return {
      auth_base64: "",

      labelCol: { span: 6 },
      wrapperCol: { span: 24 },
      current: 0,
      buttonDisabled: false,
      loadingVerif: false,
      visibleModal: false,

      visibleCheckModal: false,
      titreModal: "titre",
      descriptionModal: "description",
      typeModal: "check",
      btn1: "",
      btn2: "",

      codeReponse: 0,
      descriptionCodeReponse: "",
      descriptionCodeActivationReponse: "",

      inputA: "",
      inputB: "",
      inputC: "",
      inputD: "",
      inputE: "",
      inputF: "",

      ruleFormStep0: {
        email: "",
      },
      ruleFormStep1: {
        email2: "",
        verifCode: "",
      },
      ruleFormStep2: {
        verifCode2: "",
        pass: "",
        checkPass: "",
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
        email2: [
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
        verifCode: [
          {
            required: true,
            min: 6,
            trigger: "blur",
            message: (
              <a-icon
                slot="icon"
                type="warning"
                style="font-size: 32px; padding:10px; color: rgba(255, 0, 0, 0.5)"
              />
            ),
          },
        ],
        pass: [
          {
            required: true,
            validator: validatePass,
            type: "password",
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            type: "password",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    next() {
      if (this.current == 0) {
        this.ruleFormStep1.email2 = this.ruleFormStep0.email;
        this.$refs.ruleFormStep0.resetFields();
      }
      if (this.current == 1) {
        this.$refs.ruleFormStep1.clearValidate("email2");
      }
      //this.$refs.ruleFormStep0.resetFields();
      this.descriptionCodeActivationReponse = "";
      this.descriptionCodeReponse = "";
      this.current++;
    },
    prev() {
      this.$refs.ruleFormStep1.resetFields();
      this.descriptionCodeReponse = "";
      this.current--;
    },
    StepChange(current) {
      if (this.current > current) this.current = current;
      this.descriptionCodeReponse = "";
    },
    redirigeVersPage(String) {
      this.$router.push({ path: "/" + String });
    },

    showModalFinal() {
      this.visibleModal = true;
    },
    closeModalFinal() {
      this.visibleCheckModal = false;
      this.redirigeVersPage("login");
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
    },

    // Reset la validation des forrmulaires
    resetStep0(model) {
      // console.log("test reset step 0 " + this.ruleFormStep0[model]);
      //this.$refs.ruleForm.resetFields();
      if (this.ruleFormStep0[model] === "") {
        setTimeout(() => {
          this.$refs.ruleFormStep0.clearValidate(model);
          // console.log("test dans setTimeout");
        }, 1000);
      }
    },
    resetStep1(model) {
      // console.log("test reset step 1 " + this.ruleFormStep1[model]);
      //this.$refs.ruleForm.resetFields();
      if (this.ruleFormStep1[model] === "") {
        setTimeout(() => {
          this.$refs.ruleFormStep1.clearValidate(model);
          // console.log("test dans setTimeout");
        }, 1000);
      }
    },
    resetStep2(model) {
      // console.log("test reset step 2 " + this.ruleFormStep2[model]);
      //this.$refs.ruleForm.resetFields();
      if (this.ruleFormStep2[model] === "") {
        setTimeout(() => {
          this.$refs.ruleFormStep2.clearValidate(model);
          // console.log("test dans setTimeout");
        }, 1000);
      }
    },

    // Gestion des champs du code de validation
    onPaste(event) {
      // console.log("Text Pasted" + event);
      const clip = event.clipboardData.getData("text");
      setTimeout(() => {
        // console.log("clip : " + clip);
        this.inputA = clip[0];
        this.inputB = clip[1];
        this.inputC = clip[2];
        this.inputD = clip[3];
        this.inputE = clip[4];
        this.inputF = clip[5];
        this.ruleFormStep1.verifCode =
          this.inputA +
          this.inputB +
          this.inputC +
          this.inputD +
          this.inputE +
          this.inputF;
        if (clip.length == 6) {
          this.verifActivationCode();
        }
      }, 200);
    },
    onKeyup(event) {
      if (event.target.value.length == 1) {
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
        // const value = event.target.value;
        // console.log("test inputs value : " + value);
        this.ruleFormStep1.verifCode =
          this.inputA +
          this.inputB +
          this.inputC +
          this.inputD +
          this.inputE +
          this.inputF;
        // console.log(
        //   "verifCode depuis onKeyUp : " + this.ruleFormStep1.verifCode
        // );
        //console.log(event.keyCode)
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 96 && event.keyCode <= 105)
        ) {
          const next = event.target.nextElementSibling;
          if (next === null) {
            // console.log("appel à l'API ");
            this.verifActivationCode();
            this.resetCode;
          } else {
            event.target.nextElementSibling.focus();
          }
        } else if (event.keyCode == 8 || event.keyCode == 46) {
          const previous = event.target.previousElementSibling;
          if (previous === null) {
            return;
          } else {
            event.target.value = "";
            event.target.previousElementSibling.focus();
          }
        }
        return;
      }
      return;
    },
    onChange(v) {
      // console.log("onChange ", v);
      this.ruleFormStep1.verifCode = v;
    },
    onComplete(v) {
      // console.log("onComplete ", v);
      this.ruleFormStep1.verifCode = v;
    },
    resetCode() {
      // console.log("Avant reset " + this.ruleFormStep1.verifCode);
      this.descriptionCodeActivationReponse = "";
      this.codeReponse = null;
      this.ruleFormStep1.verifCode = "";
      this.inputA =
        this.inputB =
        this.inputC =
        this.inputD =
        this.inputE =
        this.inputF =
          "";
      // console.log("Après reset " + this.ruleFormStep1.verifCode);
    },

    // Validation des formulaires
    validateStep0() {
      this.buttonDisabled = true;
      this.$refs.ruleFormStep0.validate((valid) => {
        if (valid) {
          // console.log("validé ! ");
          this.modifPassword0();
        } else {
          // console.log("erreur dans le form ! ");
          this.showModal(
            "Attention",
            "Il y a des erreurs dans les champs",
            "warning",
            "ok",
            ""
          );
          this.buttonDisabled = false;
          //return false;
        }
      });
    },
    validateStep1() {
      this.buttonDisabled = true;
      // console.log("test depuis validStep1 " + this.ruleFormStep1.verifCode);
      let IsFilledEmail = this.ruleFormStep1.email2 !== "";
      let isFilledVerifCode = this.ruleFormStep1.verifCode.length == 6;
      if (IsFilledEmail && isFilledVerifCode) {
        // console.log("appel à l'API ");
        this.verifActivationCode();
      } else {
        this.codeReponse = "4";
        if (!IsFilledEmail) {
          // console.log("email incorrect");
          this.descriptionCodeActivationReponse =
            "Renseignez un email correcte";
        }
        if (!isFilledVerifCode) {
          // console.log("code verif incomplet");
          this.descriptionCodeActivationReponse = "Vérifiez votre code";
        } else {
          // console.log("erreur dans validateStepCode");
          this.descriptionCodeActivationReponse =
            "Erreur dans l'email ou dans le code";
        }
      }
      // this.$refs.ruleFormStep1.validate((valid) => {
      //   if (valid) {
      //   // console.log("validé ! ");
      //     this.verifActivationCode();
      //   } else {
      //   // console.log("erreur dans le form ! ");
      //     this.buttonDisabled = false;
      //     //return false;
      //   }
      // });
    },
    validateStep2() {
      this.buttonDisabled = true;
      this.$refs.ruleFormStep2.validate((valid) => {
        if (valid) {
          // console.log("validé ! ");
          this.modifPassword2();
        } else {
          // console.log("erreur dans le form ! ");
          this.buttonDisabled = false;
          //return false;
        }
      });
    },

    // Appels à l'API
    // Envoi de l'email pour obtenir le code
    async modifPassword0() {
      //e.preventDefault();
      // console.log("Processing modifPassword étape 0 !");

      var monHead = {
        "Content-Type": "application/json",
        API: "FORGOT_PASSWORD",
        "Cache-Control": "no-cache",
        Authorization: "Basic " + this.auth_base64,
      };
      //var axios = require('axios');
      //var data = '{\n\t"LOGIN":demows-thiriez-test@yopmail.com\n}';

      setTimeout(() => {
        // let maRequetePOST =
        axios
          .post(
            "https://api.thiriez-literie.fr/auth",
            { LOGIN: this.ruleFormStep0.email },
            { headers: monHead }
          )
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            let codeReponse = response.data.code;
            let descriptionReponse = response.data.description;
            // console.log("code réponse : " + codeReponse + "\n");
            if (codeReponse == 0 || codeReponse == 8) {
              this.ruleFormStep1.email2 = this.ruleFormStep0.email;
              // console.log("mdp step0 OK");
              this.showModal(
                "Demande envoyée",
                descriptionReponse,
                "check",
                "Continuer",
                ""
              );
              this.next();
              //this.openNotificationWithIcon("success");
            } else {
              // console.log(codeReponse);
              this.showModal("Erreur", descriptionReponse, "error", "Ok", "");
              //this.openNotificationWithIcon("error");
            }
          })
          .catch(function (error) {
            console.log(error);
            //this.openNotificationWithIcon("error");
          });
        // console.log(maRequetePOST);
      }, 1000);
      setTimeout(() => {
        this.buttonDisabled = false;
      }, 3000);
    },
    // Envoi du code de verif
    async verifActivationCode() {
      this.loadingVerif = true;
      this.buttonDisabled = true;
      // console.log("Processing verifActivationCode étape 1 !");
      // console.log("verifCode depuis le call : " + this.ruleFormStep1.verifCode);

      var monHead = {
        "Content-Type": "application/json",
        API: "VALIDITE_CODE",
        "Cache-Control": "no-cache",
        Authorization: "Basic " + this.auth_base64,
      };
      setTimeout(() => {
        // let maRequetePOST =
        axios
          .post(
            "https://api.thiriez-literie.fr/auth",
            {
              LOGIN: this.ruleFormStep1.email2,
              CODE: this.ruleFormStep1.verifCode,
            },
            { headers: monHead }
          )
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            let codeReponse = response.data.code;
            this.codeReponse = codeReponse;
            let descriptionReponse = response.data.description;
            //this.descriptionCodeActivationReponse = descriptionReponse;
            // console.log(
            //   "réponse : " + codeReponse + "\n" + descriptionReponse + "\n"
            // );
            if (
              this.ruleFormStep1.verifCode !== "" &&
              this.ruleFormStep1.email2 !== "" &&
              codeReponse == 0
            ) {
              this.ruleFormStep2.verifCode2 = this.ruleFormStep1.verifCode;
              // console.log("verifCode 2 : " + this.ruleFormStep2.verifCode2);
              // console.log("verif avtivation code OK");
              this.next();
              //this.openNotificationWithIcon("success");
            } else {
              this.showModal(
                "Erreur",
                descriptionReponse,
                "error",
                "Réessayer",
                ""
              );
              //this.openNotificationWithIcon("error");
            }
          })
          .catch(function (error) {
            console.log(error);
            //this.openNotificationWithIcon("error");
          });
        // console.log(maRequetePOST);
      }, 1000);
      setTimeout(() => {
        this.buttonDisabled = false;
        this.loadingVerif = false;
      }, 3000);
    },
    // Envoi du nouveau mot de passe
    async modifPassword2() {
      //e.preventDefault();
      this.buttonDisabled = true;
      // console.log("Processing modifPassword étape 2 !");

      var monHead = {
        "Content-Type": "application/json",
        API: "RESET_PASSWORD",
        "Cache-Control": "no-cache",
        Authorization: "Basic " + this.auth_base64,
      };

      setTimeout(() => {
        // let maRequetePOST =
        axios
          .post(
            "https://api.thiriez-literie.fr/auth",
            {
              LOGIN: this.ruleFormStep1.email2,
              CODE: this.ruleFormStep1.verifCode,
              PASSWORD: this.ruleFormStep2.checkPass,
            },
            { headers: monHead }
          )
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            let codeReponse = response.data.code;
            let descriptionReponse = response.data.description;
            // console.log("code réponse : " + codeReponse + "\n");
            if (codeReponse == 0) {
              // console.log("mdp étape 2 OK");
              //this.openNotificationWithIcon("success");
              sessionStorage.setItem(
                "log1",
                JSON.stringify(this.ruleFormStep1.email2)
              );
              this.showModal(
                "Mot de passse réinitialisé",
                descriptionReponse,
                "check",
                "Retour à l'accueil",
                ""
              );
            } else {
              this.descriptionCodeReponse = descriptionReponse;
              // console.log(codeReponse);
              this.showModal(
                "Attention",
                descriptionReponse,
                "error",
                "Fermer",
                ""
              );
              //this.openNotificationWithIcon("error");
            }
          })
          .catch(function (error) {
            console.log(error);
            //this.openNotificationWithIcon("error");
          });
        // console.log(maRequetePOST);
      }, 1000);
      setTimeout(() => {
        this.buttonDisabled = false;
      }, 4000);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const email = {
            LOGIN: values.email,
          };
          this.$store.dispatch("changePassword", email);
        }
      });
    },
  },
};
</script>









<style lang="scss" scoped>
.forgot-password {
  background-color: #fff;
  width: 700px;
  height: fit-content;
  margin: 0 auto;
  padding: 24px;
  border-radius: 5px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  //box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.2);

  &-actions {
    flex-direction: column;
  }
  &-input,
  &-button {
    width: 300px;
  }
}

p {
  padding: 2px;
}

.blocLogo {
  align-items: center;
  width: 100%;
  max-width: 450px;
  max-height: 350px;
  vertical-align: middle;
  margin: auto;
}
.logo {
  width: 100%;
  margin: auto;
  padding-left: 30px;
  padding-right: 30px;
}

.signin-btn {
  margin-bottom: 3px;
}

button,
.monBouton {
  color: #ffffff;
  background-color: #002043;
  width: auto;
  margin: auto 10px;
  padding-left: 10px;
  padding-right: 10px;
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

button:hover,
button:focus,
.monBouton:hover,
.monBouton:focus,
html [type="button"]:hover {
  color: #002043;
  background-color: #ffffff;
  border: #002043 solid 1px;
}

.ant-steps-item:last-child {
  padding-right: 5%;
}
.steps-content {
  min-height: 100px;
  margin: 16px auto;
  padding-top: 42px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fafafa;
  align-items: center;
}

.form-action {
  margin: auto;
  width: 100%;
  align-self: center;
  text-align: center;
}

.formInput {
  text-align: center;
  &-content {
    margin-left: auto;
    width: 256px;
    max-width: 100%;
  }
  &-mail {
    margin: auto;
    width: 256px;
    max-width: 100%;
  }
  &-verifCode {
    margin-left: auto;
    width: 250px;
    max-width: 100%;
  }
  &-names {
    margin-left: auto;
    width: 200px;
    max-width: 100%;
  }
}

div.testCode {
  position: relative;
  width: 75%;
  margin: auto;
  padding: 2px;
  border: solid 1px #002043;
  border-radius: 5px;
}

.def-txt-input:focus,
.def-txt-input:hover {
  box-shadow: 0 0 4px rgba(0, 32, 67, 1);
}
.def-txt-input {
  margin: 1px;
  padding: 2px 2px;
  text-align: center;
  width: 15.5%;
  font-size: 20px;
  border: 0;
  border-radius: 2px;
  outline: 0;

  box-shadow: 0 0 8px rgba(0, 32, 67, 0);
  transition: 1s;
}
.def-txt-input:hover,
.def-txt-input:focus {
  border: 0;
  outline: 0;
}
.def-txt-input:hover {
  box-shadow: 0 0 3px rgba(0, 32, 67, 0.5);
}
.def-txt-input:focus {
  box-shadow: 0 0 3px rgba(0, 32, 67, 0.8);
}

.inputReset {
  z-index: 10;
  position: absolute;
  top: 8px;
  right: -32px;
}
</style>