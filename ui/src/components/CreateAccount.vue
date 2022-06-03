<template>
  <div class="account">
    <a-form :form="form" @submit="handleSubmit">
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :xs="0" :sm="0" :md="12" :lg="12" :xl="12">
          <div class="blocLogo">
            <img
              class="logo"
              alt="logo Thiriez Literie"
              src="../assets/LOGO_institutionnel-vectoisé.svg"
            />

            <img
              class="imageLogin"
              alt="image de connexion"
              src="../assets/login1.svg"
            />
          </div>
        </a-col>

        <a-col :xs="24" :sm="22" :md="12" :lg="12" :xl="12">
          <h1>création de compte</h1>

          <div v-if="current <= 0" class="retour">
            <router-link :to="'/Login'" style="fontsize: 20px">
              <div class="mesLiens">
                <a-icon type="left-circle" />
                Retour à la connexion
              </div>
            </router-link>
          </div>
          <a-steps
            class="mesSteps"
            :current="current"
            size="small"
            @change="StepChange"
          >
            <a-step title="Informations">
              <a-icon slot="icon" type="info-circle" style="color: #002043" />
            </a-step>
            <a-step title="Coordonnées">
              <a-icon slot="icon" type="solution" style="color: #002043" />
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
                <div style="color: #002043">
                  <h4 style="font-weight: bold">Attention :</h4>

                  <!-- <p style="text-align: justify">
                    Pour des raisons de sécurité, vous ne pouvez pas créer de
                    compte si vous ne disposez pas d'une facture du groupe
                    THIRIEZ reçue avant le {{ troisMois }}.

                    Pour des raisons de sécurité, vous avez besoin d'une de vos
                    trois dernières factures du groupe THIRIEZ de moins de trois
                    mois (reçue après le {{ troisMois }}).
                  </p> -->
                  <p style="text-align: justify">
                    Pour des raisons de sécurité, vous devez utiliser le code
                    d'une de vos trois dernières factures.
                  </p>
                </div>
                <h4>Email</h4>
                <a-form-model-item
                  class="formInput"
                  label=""
                  has-feedback
                  prop="email"
                >
                  <a-input
                    class="formInput-mail"
                    v-model="ruleFormStep0.email"
                    type="email"
                    placeholder="Email"
                    autocomplete="on"
                    @blur="resetStep0('email')"
                  >
                  </a-input>
                </a-form-model-item>

                <h4>Code Client</h4>
                <a-form-model-item
                  class="formInput"
                  label=""
                  has-feedback
                  prop="clientCode"
                >
                  <a-input
                    v-model="ruleFormStep0.clientCode"
                    type="text"
                    placeholder="Code Client"
                    autocomplete="on"
                    class="formInput-codes"
                    @blur="resetStep0('clientCode')"
                  >
                    <a-tooltip slot="suffix" title="">
                      <a-popover title="" placement="left">
                        <template slot="content">
                          <img
                            src="../assets/tip1.png"
                            alt="En haut à gauche de votre facture"
                          />
                        </template>
                        <a-icon
                          type="info-circle"
                          style="color: rgba(0, 0, 0, 0.45)"
                        />
                      </a-popover>
                    </a-tooltip>
                  </a-input>
                </a-form-model-item>

                <h4>N° de facture</h4>
                <a-form-model-item
                  label=""
                  prop="invoice"
                  class="formInput"
                  has-feedback
                >
                  <a-input
                    v-model="ruleFormStep0.invoice"
                    type="text"
                    placeholder="N° de facture"
                    autocomplete="on"
                    class="formInput-codes"
                    @blur="resetStep0('invoice')"
                  >
                    <a-tooltip slot="suffix" title="">
                      <a-popover title="" placement="left">
                        <template slot="content">
                          <img
                            src="../assets/tip2.png"
                            alt="En haut à gauche de votre facture"
                          />
                        </template>
                        <a-icon
                          type="info-circle"
                          style="color: rgba(0, 0, 0, 0.45)"
                        />
                      </a-popover>
                    </a-tooltip>
                  </a-input>
                </a-form-model-item>

                <h4>N° de commande</h4>
                <a-form-model-item
                  label=""
                  prop="order"
                  class="formInput"
                  has-feedback
                >
                  <a-input
                    v-model="ruleFormStep0.order"
                    type="text"
                    placeholder="N° de commande"
                    autocomplete="on"
                    class="formInput-codes"
                    @blur="resetStep0('order')"
                  >
                    <a-tooltip slot="suffix" title="">
                      <a-popover title="" placement="left">
                        <template slot="content">
                          <img
                            src="../assets/tip3.png"
                            alt="En haut à gauche de votre facture"
                          />
                        </template>
                        <a-icon
                          type="info-circle"
                          style="color: rgba(0, 0, 0, 0.45)"
                        />
                      </a-popover>
                    </a-tooltip>
                  </a-input>
                </a-form-model-item>
              </a-form-model>
              <div class="mesLiens" @click="next">
                J'ai déjà reçu mon code
                <a-icon type="right-circle" />
              </div>
              <br />
            </div>

            <div v-if="current == 1" @keyup.enter="validateStep2()">
              <a-form-model
                ref="ruleFormStep1"
                class="ruleForm"
                :model="ruleFormStep1"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                :rules="rules"
              >
                <!-- <div v-show="!ruleFormStep0.email"></div> -->
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
                    autocomplete="on"
                    @blur="resetStep1('email2')"
                  >
                  </a-input>
                </a-form-model-item>

                <h4>Veuillez saisir le code d'activation reçu par mail</h4>
                <div class="formInput">
                  <div class="verifCode">
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
                      style="color: #002043; font-size: 24px; margin: auto"
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

                <!-- <h4>Prénom</h4> -->
                <a-form-model-item
                  class="formInput"
                  label=""
                  has-feedback
                  prop="firstName"
                >
                  <a-input
                    class="formInput-names"
                    v-model="ruleFormStep1.firstName"
                    type="text"
                    placeholder="Prénom"
                    autocomplete="on"
                    @blur="resetStep1('firstName')"
                  />
                </a-form-model-item>

                <!-- <h4>Nom</h4> -->
                <a-form-model-item
                  class="formInput"
                  label=""
                  has-feedback
                  prop="lastName"
                >
                  <a-input
                    class="formInput-names"
                    v-model="ruleFormStep1.lastName"
                    type="text"
                    placeholder="Nom"
                    autocomplete="on"
                    @blur="resetStep1('lastName')"
                  />
                </a-form-model-item>

                <h4>Renseignez un numéro de téléphone portable</h4>
                <a-form-model-item
                  class="formInput"
                  label=""
                  has-feedback
                  prop="phone"
                >
                  <a-input
                    class="formInput-phone"
                    v-model="ruleFormStep1.phone"
                    type="tel"
                    placeholder="Portable"
                    autocomplete="on"
                    @blur="resetStep1('phone')"
                  >
                    <a-icon
                      slot="addonBefore"
                      type="phone"
                      style="color: #002043"
                    />
                    <a-tooltip slot="suffix" title="">
                      <a-popover title="" placement="left">
                        <template slot="content">
                          <span>
                            +33 X XX XX XX XX <br />
                            06 XX XX XX XX <br />
                            07 XX XX XX XX
                          </span>
                        </template>
                        <a-icon
                          type="info-circle"
                          style="color: rgba(0, 0, 0, 0.45)"
                        />
                      </a-popover>
                    </a-tooltip>
                  </a-input>
                </a-form-model-item>

                <h4>Choisissez un mot de passe</h4>
                <a-form-model-item
                  class="formInput"
                  label=""
                  has-feedback
                  prop="pass"
                >
                  <a-input-password
                    class="formInput-content"
                    v-model="ruleFormStep1.pass"
                    type="password"
                    placeholder="Mot de passe"
                    autocomplete="on"
                    @blur="resetStep1('pass')"
                  >
                    <a-icon
                      slot="addonBefore"
                      type="lock"
                      style="color: #002043"
                    />
                  </a-input-password>
                </a-form-model-item>

                <h4>Répétez le mot de passe</h4>
                <a-form-model-item
                  class="formInput"
                  label=""
                  has-feedback
                  prop="checkPass"
                >
                  <a-input-password
                    class="formInput-content"
                    v-model="ruleFormStep1.checkPass"
                    type="password"
                    placeholder="Confirmer"
                    autocomplete="on"
                    @blur="resetStep1('checkPass')"
                  >
                    <a-icon
                      slot="addonBefore"
                      type="lock"
                      style="color: #002043"
                    />
                  </a-input-password>
                </a-form-model-item>
              </a-form-model>
            </div>
          </div>

          <div class="steps-action">
            <a-button
              v-if="current > 0"
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
              @click="validateStep1"
              :disabled="buttonDisabled"
            >
              Créer mon compte
            </a-button>
            <a-button
              type="submit"
              class="monBouton"
              v-if="current == 1"
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
      class="cartPage-modal"
      centered
      v-if="visibleModal"
      v-model="visibleModal"
      :footer="null"
      @cancel="closeModalFinal"
    >
      <div :style="[{ borderBottom: '5px solid ', margin: '15px auto' }]">
        <h2>Votre compte a bien été créé</h2>
        <p>Vous allez être redirigé vers la page de connexion</p>
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
            style="
              font-size: 50px;
              display: block;
              margin: auto;
              padding: 10px;
              width: 100%;
              vertical-align: center;
            "
            type="check-circle"
            theme="twoTone"
            two-tone-color="#4fc08d"
          />
          <a-icon
            v-if="typeModal == 'error'"
            style="
              font-size: 50px;
              display: block;
              margin: auto;
              padding: 10px;
              width: 100%;
              vertical-align: center;
            "
            type="close-circle"
            theme="twoTone"
            two-tone-color="#e12020"
          />
          <svg
            v-if="typeModal == 'warning'"
            style="
              font-size: 50px;
              display: block;
              margin: auto;
              padding: 10px;
              width: 100%;
              vertical-align: center;
              color: #faad14;
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
        <a-button v-if="btn2 !== ''" class="BoutonModal" @click="closeModal">
          {{ btn2 }}
        </a-button>
        <a-button
          v-if="btn1 !== '' && btn1 !== 'Retour à l\'accueil'"
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
    this.form = this.$form.createForm(this, { name: "create_account" });
  },
  mounted() {
    this.auth_base64 = this.$store.state.auth_base64;

    if (process.env.NODE_ENV === "development") {
      console.log("dev mode");
      this.ruleFormStep0.email = "test2-thiriez@yopmail.com";
      this.ruleFormStep0.clientCode = "DEMOWS";
      this.ruleFormStep0.invoice = "123456";
      this.ruleFormStep0.order = "654321";

      this.ruleFormStep1.email2 = "";
      this.ruleFormStep1.verifCode = "";
      this.ruleFormStep1.firstName = "Alain";
      this.ruleFormStep1.lastName = "Térieur";
      this.ruleFormStep1.phone = "0612345678";
      this.ruleFormStep1.pass = "azerty123";
    } else {
      // console.log('prod mode')
      return;
    }
  },
  data() {
    let validateCodeInvoice = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Veuillez renseigner le numéro de facture"));
      } else if (!/^([0-9A-Za-z]{6})$/.test(value)) {
        callback(new Error("numéro de facture : 6 chiffres ou lettres"));
      } else {
        callback();
      }
    };
    let validateCodeOrder = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Veuillez renseigner le numéro de commande"));
      } else if (!/^([0-9A-Za-z]{6})$/.test(value)) {
        callback(new Error("numéro de commande : 6 chiffres ou lettres"));
      } else {
        callback();
      }
    };
    let validateVerifCode = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("Veuillez renseigner le code d'activation"));
      } else if (!/^([0-9]{6})$/.test(value)) {
        callback(new Error("code incorrect"));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Veuillez renseigner un numéro de portable"));
      } else if (!/^((\+33\s?.?|0)(6|7)(\s?.?\d\d){4})$/.test(value)) {
        callback(new Error("Veuillez entrer un numéro de téléphone portable"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Veuillez renseigner un mot de passe"));
      } else if (value !== "" && !/^([a-zA-Z0-9]{8,16})$/.test(value)) {
        callback(new Error("Veuillez choisir 8 à 16 lettres ou chiffre"));
      } else if (
        value !== "" &&
        !/^(?=.*[0-9])([a-zA-Z0-9]{8,16})$/.test(value)
      ) {
        // /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,16})$/
        callback(new Error("Veuillez utiliser au moins un chiffre"));
      } else {
        // if (this.validateStep2.checkPass !== "") {
        //   this.$refs.validateStep2.validateField("checkPass");
        // }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Veuillez répéter le mot de passe"));
      } else if (value !== this.ruleFormStep1.pass) {
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
      titreModal: "val titre",
      descriptionModal: "val description",
      typeModal: "check",

      codeReponse: 0,
      descriptionCodeReponse: "",
      descriptionCodeActivationReponse: "",

      troisMois: new Date(new Date() - 7776000000).toLocaleString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),

      inputA: "",
      inputB: "",
      inputC: "",
      inputD: "",
      inputE: "",
      inputF: "",

      ruleFormStep0: {
        //email: "test1-thiriez@yopmail.com",
        email: "",
        clientCode: "",
        invoice: "",
        order: "",
      },
      ruleFormStep1: {
        //email2: "test1-thiriez@yopmail.com",
        email2: "",
        verifCode: "",
        firstName: "",
        lastName: "",
        phone: "",
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
        clientCode: [
          {
            required: true,
            message: "Veuillez renseigner le code client",
            trigger: "blur",
          },
          {
            type: "string",
            //validator: validateCodeClient,
            message: "Veuillez entrer un code client valide",
            trigger: "blur",
          },
        ],
        invoice: [
          {
            required: true,
            message: "Veuillez renseigner le numéro de facture",
            trigger: "blur",
          },
          {
            type: "string",
            validator: validateCodeInvoice,
            trigger: "blur",
          },
        ],
        order: [
          {
            required: true,
            message: "Veuillez renseigner le numéro de commande",
            trigger: "blur",
          },
          {
            type: "string",
            validator: validateCodeOrder,
            trigger: "blur",
          },
        ],
        verifCode: [
          {
            required: true,
            message: "Veuillez renseigner le code de vérification",
            trigger: "blur",
          },
          {
            min: 6,
            validator: validateVerifCode,
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
        firstName: [
          { required: true, message: "Veuillez entrer votre prénom" },
        ],
        lastName: [{ required: true, message: "Veuillez entrer votre nom" }],
        phone: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhone,
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
        this.ruleFormStep0.email2 = this.ruleFormStep0.email;
      }
      this.$refs.ruleFormStep0.resetFields();
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
      this.$router.push({ path: String });
    },

    showModalFinal() {
      this.visibleModal = true;
    },
    closeModalFinal() {
      this.visibleCheckModal = false;
      this.redirigeVersPage("Login");
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
      // console.log("test reset " + this.ruleFormStep0[model]);
      //this.$refs.ruleForm.resetFields();
      if (this.ruleFormStep0[model] === "") {
        setTimeout(() => {
          this.$refs.ruleFormStep0.clearValidate(model);
          // console.log("test dans setTimeout");
        }, 1000);
      }
    },
    resetStep1(model) {
      // console.log("test reset " + this.ruleFormStep1[model]);
      //this.$refs.ruleForm.resetFields();
      if (this.ruleFormStep1[model] === "") {
        setTimeout(() => {
          this.$refs.ruleFormStep1.clearValidate(model);
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
          this.validateStepCode();
        }
      }, 200);
    },

    onKeyup(event) {
      if (event.target.value.length >= 0) {
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
        // console.log(event.keyCode)
        if (
          /*(event.keyCode >= 48 && event.keyCode <= 57) ||*/
          event.keyCode >= 96 &&
          event.keyCode <= 105
        ) {
          const next = event.target.nextElementSibling;
          if (next === null) {
            this.validateStepCode();
            this.resetCode;
          } else {
            event.target.nextElementSibling.focus();
          }
        } else if (event.keyCode == 8 || event.keyCode == 46) {
          const previous = event.target.previousElementSibling;
          if (previous == null) {
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
    validateStep1() {
      this.buttonDisabled = true;
      this.$refs.ruleFormStep0.validate((valid) => {
        if (valid) {
          // console.log("validé ! ");
          this.createAccount1();
        } else {
          // console.log("erreur dans le form ! ");
          this.buttonDisabled = false;
          //return false;
        }
      });
    },
    validateStepCode() {
      let IsFilledEmail = this.ruleFormStep1.email2 !== "";
      let isFilledVerifCode = this.ruleFormStep1.verifCode.length == 6;
      if (IsFilledEmail && isFilledVerifCode) {
        // console.log("appel à l'API ");
        this.verifActivationCode();
      } else {
        this.codeReponse = "4";
        if (!IsFilledEmail) {
          // console.log('email incorrect');
          this.descriptionCodeActivationReponse =
            "Renseignez un email correcte";
        }
        if (!isFilledVerifCode) {
          // console.log('code verif incomplet');
          this.descriptionCodeActivationReponse = "Vérifiez votre code";
        } else {
          // console.log('erreur dans validateStepCode');
          this.descriptionCodeActivationReponse =
            "Erreur dans l'email ou dans le code";
        }
      }
    },
    validateStep2() {
      this.buttonDisabled = true;
      this.$refs.ruleFormStep1.validate((valid) => {
        if (valid) {
          // console.log("validé ! ");
          this.createAccount2();
        } else {
          // console.log("erreur dans le form ! ");
          this.buttonDisabled = false;
          //return false;
        }
      });
    },
    // Envoi des infos de commandes
    async createAccount1() {
      //e.preventDefault();
      // console.log("Processing createAccount étape 1 !");

      var monHead = {
        "Content-Type": "application/json",
        API: "CREAT_ACCOUNT_1",
        "Cache-Control": "no-cache",
        Authorization: "Basic " + this.auth_base64,
      };
      //var axios = require('axios');
      //var data = '{\n\t"LOGIN":demows-thiriez-test@yopmail.com\n}';
      // console.log('facture: '+this.ruleFormStep0.invoice);
      // console.log('commande: '+this.ruleFormStep0.order);

      setTimeout(() => {
        // let maRequetePOST =
        axios
          .post(
            "https://api.thiriez-literie.fr/auth",
            {
              LOGIN: this.ruleFormStep0.email,
              CLIENT_CODE: this.ruleFormStep0.clientCode,
              INVOICE: this.ruleFormStep0.invoice,
              ORDER: this.ruleFormStep0.order,
            },
            { headers: monHead }
          )
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            let codeReponse = response.data.code;
            let descriptionReponse = response.data.description;
            // console.log("code réponse : " + codeReponse + "\n");
            if (codeReponse == 0 || codeReponse == 8) {
              this.ruleFormStep1.email2 = this.ruleFormStep0.email;
              // console.log("créaction compte étape 1 OK");
              this.showModal(
                "Compte initialisé",
                descriptionReponse,
                "check",
                "Continuer",
                ""
              );
              this.next();
            } else {
              this.descriptionCodeReponse = descriptionReponse;
              // console.log(codeReponse);
              this.showModal(
                "Erreur",
                descriptionReponse,
                "error",
                "Réessayer",
                ""
              );
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        // console.log(maRequetePOST);
      }, 1000);
      setTimeout(() => {
        this.buttonDisabled = false;
      }, 2500);
    },
    // Envoi du code de verif
    async verifActivationCode() {
      this.loadingVerif = true;
      //e.preventDefault();
      // console.log("Processing verifActivationCode !");
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
            // console.log("code réponse : " + codeReponse + "\n");
            if (codeReponse == 0) {
              this.descriptionCodeActivationReponse = descriptionReponse;
              // console.log("créaction compte étape 2 OK");
            } else {
              this.showModal(
                "Erreur",
                descriptionReponse,
                "error",
                "Réessayer",
                ""
              );
              // console.log(codeReponse);
              setTimeout(() => {
                this.resetCode();
              }, 3000);
            }
            this.loadingVerif = false;
          })
          .catch(function (error) {
            console.log(error);
            this.loadingVerif = false;
          });
        // console.log(maRequetePOST);
      }, 1000);
      setTimeout(() => {
        this.buttonDisabled = false;
      }, 2500);
    },
    // Envoi des coordonnées
    async createAccount2() {
      //e.preventDefault();
      this.buttonDisabled = true;
      // console.log("Processing createAccount étape 2 !");

      var monHead = {
        "Content-Type": "application/json",
        API: "CREAT_ACCOUNT_2",
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
              PRENOM: this.ruleFormStep1.firstName,
              NOM: this.ruleFormStep1.lastName,
              TELEPHONE: this.ruleFormStep1.phone,
              PASSWORD: this.ruleFormStep1.checkPass,
            },
            { headers: monHead }
          )
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            let codeReponse = response.data.code;
            let descriptionReponse = response.data.data;
            // console.log("code réponse : " + codeReponse + "\n");
            if (codeReponse == 0) {
              // console.log("mdp étape 2 OK");
              //this.next();
              sessionStorage.setItem(
                "log1",
                JSON.stringify(this.ruleFormStep0.email)
              );
              this.showModal(
                "Votre compte a bien été créé",
                "Vous allez être redirigé vers la page de connexion",
                "check",
                "Retour à l'accueil",
                ""
              );
              this.buttonDisabled = false;
            } else {
              this.descriptionCodeReponse = descriptionReponse;
              this.showModal(
                "Erreur",
                descriptionReponse,
                "error",
                "Fermer",
                ""
              );
              // console.log(codeReponse);
              this.buttonDisabled = false;
            }
          })
          .catch(() => {
            // console.log(error);
            this.buttonDisabled = false;
          });
        // console.log(maRequetePOST);
      }, 1000);
      setTimeout(() => {
        this.buttonDisabled = false;
      }, 2500);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const createUserData = {
            LOGIN: values.email,
            CLIENT_CODE: values.clientCode,
            INVOICE: values.invoice,
            ORDER: values.order,
          };
          this.$store.dispatch("createUserAccount", createUserData);
        }
      });
    },
  },
};
</script>









<style lang="scss" scoped>
.account {
  background-color: #fff;
  width: 800px;
  height: fit-content;
  margin: 0 auto;
  padding: 32px;
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
  &-save-button {
    width: 300px;
  }
  &-save-button {
    margin: 25px 0;
  }
}

p {
  padding: 2px;
}

.blocLogo {
  vertical-align: middle;
}

.logo {
  width: 100%;
  margin: auto;
  padding-left: 20px;
  padding-right: 20px;
  max-height: 200px;
  min-height: 50px;
}

img.imageLogin {
  width: 100%;
  margin: auto;
  max-height: 250px;
  min-height: 50px;
}

.retour {
  padding: 10px;
}

button,
.monBouton {
  color: #ffffff;
  background-color: #002043;
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
  margin: 16px auto;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  padding: 32px 8px;
}
.steps-action {
  margin: auto;
  width: 100%;
  align-self: center;
  text-align: center;
}
.steps-action > button {
  margin: auto 2%;
}

h4 {
  margin: auto;
}

.inputReset {
  z-index: 10;
  position: absolute;
  top: 8px;
  right: -28px;
}

.formInput {
  text-align: center;
  &-content {
    margin: auto;
    width: 250px;
    max-width: 100%;
  }
  &-codes {
    margin: auto;
    width: 150px;
    max-width: 100%;
    text-align: center;
  }
  &-verifCode {
    margin: auto;
    width: 250px;
    max-width: 100%;
  }
  &-names {
    margin: auto;
    width: 200px;
    max-width: 100%;
  }
  &-mail {
    margin: auto;
    width: 256px;
    max-width: 100%;
  }
  &-phone {
    margin: auto;
    width: 220px;
    max-width: 100%;
  }
}

div.verifCode {
  position: relative;
  width: 75%;
  max-width: 450px;
  margin: auto;
  padding: 2px;
  border: 1px solid #ccc;
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
  outline: 0;
  border: 0;
  border-radius: 2px;
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
</style>