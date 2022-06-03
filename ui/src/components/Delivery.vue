<template>
  <a-spin tip="Chargement..." size="large" :spinning="visibleSpin">
    <h1 v-if="this.linesCartInfos.length === 0">Pas de panier en cours</h1>
    <a-form :form="form" class="delivery" @submit="handleSubmit">
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <div class="delivery-address" v-if="userInfos.LIVRAISON !== undefined">
            <h1 style="text-align: center">ADRESSE DE LIVRAISON</h1>
            <h3 v-if="userInfos.SECTEUR == 'DSITRI'" class="warning-delivering">
              Attention : Pour toute livraison aux particuliers, merci de nous
              consulter au préalable.
            </h3>
            <div v-if="addresses.length > 0">
              <!-- {{ filteredAddresses }} 
                @search="filterAddresses"-->
              <a-select placeholder=" - Adresse de livraison - " show-search option-filter-prop="children"
                :filter-option="filterOption" @change="onChangeAddress" :allowClear="false">
                <a-select-option v-for="address in filteredAddresses" :label="address.LIBELLE" :value="address.ID"
                  :key="address.ID">
                  {{ address.CP }} {{ address.VILLE }} ({{ address.NOM }})
                  <!-- <text v-show="false">
                    {{ address.LIBELLE }} {{ address.RUE1 }} {{ address.RUE2 }}
                    {{ address.PAYS }}
                  </text> -->
                </a-select-option>
              </a-select>
              <!-- {{ selectedAddress }} -->
              <hr />
            </div>
            <a-form-item class="delivery-address-item" label="Nom livraison">
              <a-input v-decorator="[
                'name',
                {
                  initialValue: userInfos.LIVRAISON.NOM,
                  rules: [
                    {
                      max: 40,
                      required: true,
                      message:
                        'Merci de renseigner un nom valide! (40 caractères max)',
                    },
                  ],
                },
              ]" />
            </a-form-item>
            <a-form-item class="delivery-address-item" label="Rue 1">
              <a-input v-decorator="[
                'way1',
                {
                  initialValue: userInfos.LIVRAISON.RUE1,
                  rules: [
                    {
                      max: 40,
                      required: true,
                      message:
                        'Merci de renseigner une rue de livraison valide! (40 caractères max)',
                    },
                  ],
                },
              ]" />
            </a-form-item>
            <a-form-item class="delivery-address-item" label="Rue 2">
              <a-input v-decorator="[
                'way2',
                {
                  initialValue: userInfos.LIVRAISON.RUE2,
                  rules: [
                    {
                      max: 40,
                      required: false,
                      message: 'Complément de rue (40 caractères max)',
                    },
                  ],
                },
              ]" />
            </a-form-item>
            <!-- <div class="delivery-address-city">
            </div> -->
            <a-form-item class="delivery-address-code" label="Code postal">
              <a-input @blur="getExtracost(true)" v-decorator="[
                'postalCode',
                {
                  initialValue: userInfos.LIVRAISON.CODEPOSTAL,
                  rules: [
                    {
                      trigger: 'blur',
                      maxLength: 16,
                      required: true,
                      message:
                        'Merci de renseigner un code postal valide! (16 caractères max)',
                    },
                  ],
                },
              ]" />
            </a-form-item>
            <a-form-item class="delivery-address-town" label="Ville">
              <a-input v-decorator="[
                'city',
                {
                  initialValue: userInfos.LIVRAISON.VILLE,
                  rules: [
                    {
                      max: 40,
                      required: true,
                      message:
                        'Merci de renseigner une ville valide! (40 caractères max)',
                    },
                  ],
                },
              ]" />
            </a-form-item>
            <a-form-item class="delivery-address-item" label="Pays">
              <a-select class="form-input-select" @change="handleDeliverySelectChange"
                placeholder="Sélectionnez un pays" v-decorator="[
                  'country',
                  {
                    initialValue: selectedDeliveryCountry,
                    rules: [
                      { required: true, message: 'Veuillez choisir un pays' },
                    ],
                  },
                ]">
                <a-select-option v-for="(dcountry, index) in countries" :key="index" :value="dcountry.CHAINES[2]">
                  <span v-if="dcountry.ACTIF">{{ dcountry.CHAINES[0] }}</span>
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item class="delivery-address-item" label="Instructions livraison">
              <a-input v-decorator="[
                'instructions',
                {
                  initialValue: userInfos.LIVRAISON.INSTRUCTION,
                  rules: [
                    {
                      required: false,
                      max: 40,
                      message: 'Instructions (40 caractères max)',
                    },
                  ],
                },
              ]" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <div class="delivery-infoContact">
            <h1 style="text-align: center">CONTACT DE LIVRAISON</h1>
            <a-form-item class="delivery-address-item" label="Nom du contact de livraison">
              <!-- initialValue: userInfos.LIVRAISON.CONTACT.NOM, 
                    initialValue: userInfos.LIVRAISON.CONTACT.MAIL,
                    initialValue: userInfos.LIVRAISON.CONTACT.TEL,
                    -->
              <a-input v-decorator="[
                'nameContact',
                {
                  initialValue: '',
                  rules: [
                    {
                      max: 40,
                      required: true,
                      message:
                        'Merci de renseigner un nom valide! (40 caractères max)',
                    },
                  ],
                },
              ]" />
            </a-form-item>
            <a-form-item class="delivery-address-item" label="Mail du contact de livraison">
              <a-input v-decorator="[
                'mailContact',
                {
                  initialValue: '',
                  rules: [
                    {
                      trigger: 'blur',
                      type: 'email',
                      required: false,
                      message: 'Merci de renseigner un email valide!',
                    },
                    {
                      trigger: 'blur',
                      max: 40,
                      required: false,
                      message:
                        'Veuillez n\'entrer que 40 caractères maximum.',
                    },
                  ],
                },
              ]" />
            </a-form-item>
            <a-form-item class="delivery-address-item" label="Tél du contact de livraison">
              <a-input placeholder="0612345678" type="phone" v-decorator="[
                'telContact',
                {
                  initialValue: '',
                  rules: [
                    {
                      trigger: 'blur',
                      //pattern: /^((\+33\s?.?|0)(6|7)(\s?.?\d\d){4})$/,
                      min: 10,
                      max: 12,
                      required: true,
                      message:
                        'Merci de renseigner un numéro de téléphone portable valide!',
                    },
                  ],
                },
              ]" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <div class="delivery-date">
            <h1 style="text-align: center;">DATE DE LIVRAISON ESTIMÉE</h1>
            <p style="text-align: justify">
              La date de livraison la plus courte possible est le
              {{ dateLocale }}
            </p>
            <!-- v-show="dateFormatted" 
                :defaultValue="dateMoment"-->
            <a-form-item>
              <a-week-picker v-if="accountType == 'DISTRI'" class="delivery-date-input"
                placeholder="Semaine de livraison" @change="onChangeDate" :locale="locale" :disabled-date="disabledDate"
                :allowClear="false" format="[Semaine] ww - YYYY" v-decorator="[
                  'deliveryDate',
                  {
                    rules: [
                      {
                        initialValue: moment(new Date(furtherDate)),
                        type: 'date',
                        trigger: 'blur',
                        required: true,
                        message: 'Merci de renseigner une date de livraison!',
                      },
                    ],
                  },
                ]" />
              <a-date-picker v-else class="delivery-date-input" :locale="locale" :disabled-date="disabledDate"
                :defaultPickerValue="moment(new Date(furtherDate))" :allowClear="false" format="DD MMMM YYYY"
                :showToday="false" :changeMonth="true" :changeYear="false" @change="onChangeDate" v-decorator="[
                  'deliveryDate',
                  {
                    rules: [
                      {
                        initialValue: moment(new Date(furtherDate)),
                        type: 'date',
                        trigger: 'blur',
                        required: true,
                        message:
                          'Merci de renseigner une semaine de livraison!',
                      },
                    ],
                  },
                ]" />
            </a-form-item>
            <!-- {{ deliveryDate }} {{ dateFormatted }} -->
            <!--
              :value="deliveryDate !== null ? deliveryDate : dateFormatted"
              v-if="!iconLoading"
            -->
            <h2>Frais de port:</h2>

            <div class="div-fdp">
              <a-spin :spinning="loadingExtraCost">
                <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
                <div style="min-height: 64px;">
                  <p v-if="!loadingExtraCost" style="text-align: center">
                    <b v-if="surcout >= 0">{{ surcout }} €</b>
                  </p>
                  <p v-if="!loadingExtraCost" style="text-align: justify">{{ surcoutDescript }}</p>
                </div>
              </a-spin>
              <a-button type="primary" icon="calculator" :loading="loadingExtraCost" @click="getExtracost(true)">
                Recalculer
              </a-button>
            </div>
            <h1>Référence commande</h1>
            <a-form-item>
              <a-input :maxLength="20" class="delivery-ref-input" placeholder="Saisissez si besoin votre ref"
                v-decorator="[
                  'refCde',
                  {
                    initialValue: cart.REFCDE,
                    rules: [
                      {
                        required: false,
                        max: 20,
                        message: 'Ref Commande (20 caractères max)',
                      },
                    ],
                  },
                ]" />
            </a-form-item>
              <a-checkbox :checked="isCheckedCGV" @change="onChangeCGV" class="CGV-checkbox"
                valuePropName="isCheckedCGV" v-decorator="[
                  'isCheckedCGV',
                  {
                    initialValue: false,
                    rules: [
                      {
                        required: true,
                        transform: (value) => value || undefined,
                        trigger: 'change',
                        type: 'boolean',
                        message: 'Veuillez accepter nos CGV.',
                      },
                    ],
                  },
                ]">
                Accepter les
                <em @click.prevent="visibleCGVModal = true" class="CGV-link">Conditions Générales de Vente</em>
              </a-checkbox>
              <br />
            <a-button :disabled="blockValidation || !isCheckedCGV" class="delivery-date-button" type="primary"
              html-type="submit">
              VALIDER LE PANIER
            </a-button>
            <!-- <a-button
              type="primary"
              @click="estimateDelay"
            >
              TEST
            </a-button> -->
          </div>
        </a-col>
      </a-row>
      <a-modal centered v-if="visibleCGVModal" v-model="visibleCGVModal" :footer="null"
        @cancel="visibleCGVModal = false">
        <componentCGVDistri v-if="accountType == 'DISTRI'" />
        <componentCGVHott v-else />
        <div class="delivery-modal-button">
          <a-button type="primary" @click="
            () => {
              isCheckedCGV = true;
              visibleCGVModal = false;
            }
          ">J'ai compris</a-button>
        </div>
      </a-modal>
      <a-modal class="delivery-modal" centered v-if="visibleModal" v-model="visibleModal" :footer="null"
        @cancel="closeModal">
        <h2 class="delivery-modal-title">Panier validé</h2>
        <p>Numéro de panier: {{ modalContent.PANIER_ID }}</p>
        <p>Un mail de validation vous a été envoyé.</p>
        <div class="delivery-modal-button">
          <a-button type="primary" @click="closeModal">OK</a-button>
        </div>
      </a-modal>
    </a-form>
  </a-spin>
</template>

<script>
import moment from "moment";
import locale from "ant-design-vue/es/date-picker/locale/fr_FR";
import notificationManager from "../helpers/notificationManager";
import componentCGVDistri from "@/components/componentCGVDistri.vue";
import componentCGVHott from "@/components/componentCGVHott.vue";
export default {
  components: {
    componentCGVDistri,
    componentCGVHott,
  },
  data() {
    return {
      accountType: "",
      visibleModal: false,
      visibleSpin: true,
      loadingExtraCost: true,
      blockValidation: false,

      testValue: [],
      addresses: [],
      filteredAddresses: [],
      countries: [],
      cart: {},
      form: this.$form.createForm(this, { name: "cart_validation" }),
      isCheckedCGV: false,
      linesCartInfos: {},
      locale,
      selectedAddress: {},
      selectedDeliveryCountry: null,
      userInfos: {},
      visibleCGVModal: false,

      furtherDate: null,
      dateFormatted: null,
      dateLocale: null,
      dateMoment: null,
      deliveryDate: null,
      deliveryDateFilled: false,
      joursRestants: null,
      listeDatesLivraison: null,
      modalContent: false,

      datesFermees: [],
      surcout: 0,
      surcoutDescript: "",
      iconLoading: false,
    };
  },
  methods: {
    moment,
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
        //    ||
        // option.componentOptions.children[1].children[0].text
        //   .toLowerCase()
        //   .indexOf(input.toLowerCase()) >= 0
      );
    },
    // filterAddresses(input) {
    //   // this.filteredAddresses = [];
    //   const searchValues = input.trim().split(" ");
    //   console.log(searchValues);
    //   // searchValues.forEach((value) => {
    //   //   this.addresses.forEach((address) => {
    //   //     console.log(
    //   //       "CP? " + address.CP.toLowerCase().includes(value.toLowerCase())
    //   //     );
    //   //     if (address.CP.toLowerCase().includes(value.toLowerCase())) {
    //   //       console.log("search");
    //   //       this.filteredAddresses.push(address);
    //   //       return true;
    //   //     } else {
    //   //       return false;
    //   //     }
    //   //   });
    //   // });
    //   if (searchValues.length > 0) {
    //     let test = this.addresses.filter((address) => {
    //       let result = true;
    //       searchValues.forEach((value) => {
    //         console.log(
    //           "CP? " +
    //             address.CP.toLowerCase().includes(value.toLowerCase()) +
    //             "; LIBELLE? " +
    //             address.LIBELLE.toLowerCase().includes(value.toLowerCase())
    //         );
    //         if (
    //           // address.LIBELLE.toLowerCase().includes(value.toLowerCase()) ||
    //           // address.NOM.toLowerCase().includes(value.toLowerCase()) ||
    //           // address.RUE1.toLowerCase().includes(value.toLowerCase()) ||
    //           // address.RUE2.toLowerCase().includes(value.toLowerCase()) ||
    //           address.CP.toLowerCase().includes(value.toLowerCase())
    //           // ||
    //           // address.VILLE.toLowerCase().includes(value.toLowerCase())
    //         ) {
    //           console.log("search");
    //         } else {
    //           result = false;
    //           // return;
    //         }
    //       });
    //       return result;
    //     });
    //     // this.filteredAddresses = this.addresses;
    //     this.filteredAddresses = test;
    //     // this.testValue = test;
    //     console.log(JSON.stringify(test));
    //   } else {
    //     this.filteredAddresses = this.addresses;
    //   }
    // },
    onChangeAddress(monAdresse) {
      this.selectedAddress = {};
      if (monAdresse !== undefined) {
        this.addresses.forEach((address) => {
          if (monAdresse == address.ID) {
            this.selectedAddress = address;
          }
        });

        this.form.setFieldsValue({ ["name"]: this.selectedAddress.NOM });
        this.form.setFieldsValue({ ["way1"]: this.selectedAddress.RUE1 });
        this.form.setFieldsValue({ ["way2"]: this.selectedAddress.RUE2 });
        this.form.setFieldsValue({ ["postalCode"]: this.selectedAddress.CP });
        this.form.setFieldsValue({ ["city"]: this.selectedAddress.VILLE });
        this.form.setFieldsValue({ ["country"]: this.selectedAddress.PAYS });
      } else {
        this.form.setFieldsValue({ ["name"]: this.userInfos.LIVRAISON.NOM });
        this.form.setFieldsValue({ ["way1"]: this.userInfos.LIVRAISON.RUE1 });
        this.form.setFieldsValue({ ["way2"]: this.userInfos.LIVRAISON.RUE2 });
        this.form.setFieldsValue({
          ["postalCode"]: this.userInfos.LIVRAISON.CODEPOSTAL,
        });
        this.form.setFieldsValue({ ["city"]: this.userInfos.LIVRAISON.VILLE });
        this.form.setFieldsValue({
          ["country"]: this.userInfos.LIVRAISON.CODEPAYS,
        });
      }
      this.getExtracost(true);
    },
    onChangeCGV(event) {
      console.log("CGV", event.target.checked);
      this.isCheckedCGV = event.target.checked;
    },
    closeModal() {
      this.$router.push("/commandes");
    },
    async estimateDelay(token) {
      //console.log(token + '\n')
      var mesData = { ARTICLES: [] };
      let index = 0;
      this.linesCartInfos.forEach(
        (article) =>
        (mesData.ARTICLES[index++] = {
          CODE_ARTICLE: article.CODE_ARTICLE,
          QTE: article.QTE,
        })
      );
      const params = { token: token, body: mesData };
      const delay = await this.$store.dispatch("getEstimerDelai", params);
      // console.log(JSON.stringify(response.data));
      if (delay.length > 0) {
        this.listeDatesLivraison = delay;
        console.log(this.listeDatesLivraison);
        this.selectFurthestDate();
      } else {
        const millis = new Date().getTime();
        let twoWeeksLater = new Date(new Date(millis + 3600000 * 24 * 14));
        let dateMoment = moment(twoWeeksLater).format("YYYY-MM-DD");
        this.listeDatesLivraison = [dateMoment];
        this.selectFurthestDate();
        console.log(this.listeDatesLivraison);
        return;
      }
    },
    selectFurthestDate() {
      let furtherDate = this.listeDatesLivraison[0];
      // console.log("dates[0]:" + furtherDate);
      this.listeDatesLivraison.forEach(function (date) {
        if (date > furtherDate) {
          furtherDate = date;
        }
      });
      this.furtherDate = furtherDate;
      // console.log("date de livraison: " + this.furtherDate);
      this.formateDateExpedition();
    },
    formateDateExpedition() {
      let date = new Date(moment(this.furtherDate));
      const now = new Date(Date.now());
      this.dateFormatted = new Date(date);

      let joursRestants = parseInt(
        Math.floor((this.dateFormatted - now) / (3600000 * 24))
      );
      let dateMoment = moment(this.dateFormatted);
      this.dateMoment = dateMoment;
      // .format("DD MMMM YYYY");
      this.dateLocale = new Date(dateMoment).toLocaleDateString("fr-FR", {
        /*weekday:'long',*/ year: "numeric",
        month: "long",
        day: "numeric",
      });

      this.joursRestants = joursRestants;
      // console.log(
      //   "date formatée: " +
      //     dateFormatted +
      //     "\nformat Moment.js: " +
      //     this.dateMoment +
      //     "\njours restants: " +
      //     joursRestants
      // );
    },
    async onChangeDate(date) {
      this.deliveryDate = date.format("YYYY-MM-DD");
      if (this.deliveryDate !== null) {
        this.deliveryDateFilled = true;
        this.dateFormatted = new Date(this.deliveryDate);
        let dateMoment = moment(new Date());
        this.dateMoment = dateMoment.format("DD MMMM YYYY");
        await this.getExtracost(true);
      } else {
        this.deliveryDateFilled = false;
      }
      // console.log("date de livraison : " + this.deliveryDate);
    },
    onChangeWeek(date, dateString) {
      const deliveryWeek = date.format("YYYY-MM-DD");
      console.log(date, dateString, deliveryWeek);
    },
    disabledDate(current) {
      let disable = false;
      if (current && current.valueOf() <= Date.now()) {
        disable = true;
      } else if (
        current &&
        current.valueOf() <= new Date(new Date().getTime() + 3600000 * 24 * 3)
      ) {
        disable = true;
      } else if (
        current &&
        current.valueOf() >= new Date(new Date().getTime() + 3600000 * 24 * 364)
      ) {
        disable = true;
      } else {
        // disable = false;
        if (this.datesFermees.includes(current.format("YYYY-MM-DD"))) {
          disable = true;
        } else {
          disable = false;
          if (current < moment().endOf("day").add(this.joursRestants, "days")) {
            disable =
              current &&
              current < moment().endOf("day").add(this.joursRestants, "days");
          } else {
            if (current.day() === 0) {
              disable = false;
            } else {
              disable = false;
            }
          }
        }
      }
      return disable;
    },
    handleDeliverySelectChange(value) {
      this.selectedDeliveryCountry = value;
    },
    async checkCloture() {
      const tokenInfos = JSON.parse(sessionStorage.getItem("tokenInfos"));
      if (tokenInfos) {
        const token = tokenInfos.TOKEN;
        const cart = localStorage.getItem("cartInfos");
        if (cart) {
          let cartId = JSON.parse(localStorage.getItem("cartInfos")).PANIER_ID;
          const params = {
            token: token,
            id: cartId,
          };
          const entete = await this.$store.dispatch("getEnteteCart", params);
          // console.log("res entete " + JSON.stringify(entete.code));
          if (entete.code === 0) {
            if (!entete.data.CLOTURE) {
              return true;
            }
          }
        }
      }
      return false;
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.blockValidation = true;
      this.visibleSpin = true;
      const checkCartStatus = await this.checkCloture();
      if (checkCartStatus) {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            if (values.mailContact.length < 40) {
              let params = {
                token: JSON.parse(sessionStorage.getItem("tokenInfos")).TOKEN,
                id: JSON.parse(localStorage.getItem("cartInfos")).PANIER_ID,
                deliveryDate: this.deliveryDate,
                refCde: values.refCde.trim() !== "" ? values.refCde.trim() : "",
                livraison: {
                  CONTACT: {
                    NOM:
                      values.nameContact !==
                        this.userInfos.LIVRAISON.CONTACT.NOM
                        ? values.nameContact.trim()
                        : this.userInfos.LIVRAISON.CONTACT.NOM,
                    MAIL:
                      values.mailContact !==
                        this.userInfos.LIVRAISON.CONTACT.MAIL
                        ? values.mailContact.trim()
                        : this.userInfos.LIVRAISON.CONTACT.MAIL,
                    TEL:
                      values.telContact !== this.userInfos.LIVRAISON.CONTACT.TEL
                        ? values.telContact.trim()
                        : this.userInfos.LIVRAISON.CONTACT.TEL,
                  },
                  NOM:
                    values.name !== this.userInfos.LIVRAISON.NOM
                      ? values.name.trim()
                      : this.userInfos.LIVRAISON.NOM,
                  RUE1:
                    values.way1 !== this.userInfos.LIVRAISON.RUE1
                      ? values.way1.trim()
                      : this.userInfos.LIVRAISON.RUE1,
                  RUE2:
                    values.way2 !== this.userInfos.LIVRAISON.RUE2
                      ? values.way2.trim()
                      : this.userInfos.LIVRAISON.RUE2,
                  CODEPOSTAL:
                    values.postalCode !== this.userInfos.LIVRAISON.CODEPOSTAL
                      ? values.postalCode //.toString()
                      : this.userInfos.LIVRAISON.CODEPOSTAL,
                  VILLE:
                    values.city !== this.userInfos.LIVRAISON.VILLE
                      ? values.city.trim()
                      : this.userInfos.LIVRAISON.VILLE,
                  CODEPAYS:
                    values.country !== this.userInfos.LIVRAISON.CODEPAYS
                      ? values.country
                      : this.userInfos.LIVRAISON.CODEPAYS,
                  INSTRUCTIONS:
                    values.instructions.trim() !==
                      this.userInfos.LIVRAISON.INSTRUCTIONS
                      ? values.instructions.trim()
                      : this.userInfos.LIVRAISON.INSTRUCTIONS,
                },
              };
              this.modalContent = await this.$store.dispatch(
                "validateCart",
                params
              );
              // console.log("content", params);
              if (this.modalContent) {
                this.visibleModal = true;
                this.visibleSpin = false;
              }
            } else {
              notificationManager.openNotificationWithIcon(
                "error",
                "Adresse email incorrect",
                {
                  description:
                    "Adresse email du contact de livraison : 40 caractères maximum",
                }
              );
              this.visibleSpin = false;
            }
          } else {
            this.visibleSpin = false;
          }
        });
      }
      this.blockValidation = false;
    },
    async getDatesFermetures(token) {
      await this.$store.dispatch("getDatesFermees", token);
      this.datesFermees = localStorage.getItem("datesFermees");
    },
    async getExtracost(reload) {
      const checkCartStatus = await this.checkCloture();
      if (checkCartStatus) {
        this.iconLoading = true;
        this.loadingExtraCost = true;
        // this.blockValidation = true;
        this.surcout = -1;
        const tokenInfos = JSON.parse(sessionStorage.getItem("tokenInfos"));
        if (tokenInfos) {
          const token = tokenInfos.TOKEN;
          if (reload) {
            this.form.validateFields(async (err, values) => {
              if (!err) {
                var params = {
                  token: token,
                  PANIER_ID: this.cart.PANIER_ID,
                  CLIENT_CODE: this.userInfos.CODE_CLIENT,
                  DATE_LIVRAISON: this.deliveryDate,
                  MAILS: [this.userInfos.LOGIN],
                  livraison: {
                    CONTACT: {
                      NOM:
                        values.nameContact !==
                          this.userInfos.LIVRAISON.CONTACT.NOM
                          ? values.nameContact.trim()
                          : this.userInfos.LIVRAISON.CONTACT.NOM,
                      MAIL:
                        values.mailContact !==
                          this.userInfos.LIVRAISON.CONTACT.MAIL
                          ? values.mailContact.trim()
                          : this.userInfos.LIVRAISON.CONTACT.MAIL,
                      TEL:
                        values.telContact !==
                          this.userInfos.LIVRAISON.CONTACT.TEL
                          ? values.telContact.trim()
                          : this.userInfos.LIVRAISON.CONTACT.TEL,
                    },
                    NOM:
                      values.name !== this.userInfos.LIVRAISON.NOM
                        ? values.name.trim()
                        : this.userInfos.LIVRAISON.NOM,
                    RUE1:
                      values.way1 !== this.userInfos.LIVRAISON.RUE1
                        ? values.way1.trim()
                        : this.userInfos.LIVRAISON.RUE1,
                    RUE2:
                      values.way2 !== this.userInfos.LIVRAISON.RUE2
                        ? values.way2.trim()
                        : this.userInfos.LIVRAISON.RUE2,
                    CODEPOSTAL:
                      values.postalCode !== this.userInfos.LIVRAISON.CODEPOSTAL
                        ? values.postalCode //.toString()
                        : this.userInfos.LIVRAISON.CODEPOSTAL,
                    VILLE:
                      values.city !== this.userInfos.LIVRAISON.VILLE
                        ? values.city.trim()
                        : this.userInfos.LIVRAISON.VILLE,
                    CODEPAYS:
                      values.country !== this.userInfos.LIVRAISON.CODEPAYS
                        ? values.country
                        : this.userInfos.LIVRAISON.CODEPAYS,
                    INSTRUCTIONS:
                      values.instructions.trim() !==
                        this.userInfos.LIVRAISON.INSTRUCTIONS
                        ? values.instructions.trim()
                        : this.userInfos.LIVRAISON.INSTRUCTIONS,
                  },
                };
                // console.log(JSON.stringify(params))
                const appel = await this.$store.dispatch(
                  "getExtracost",
                  params
                );
                this.iconLoading = false;
                // console.log("res appel with address",JSON.stringify(appel.description));
                if (appel) {
                  if (appel.code === 0) {
                    this.surcout = appel.data.COUT;
                    this.surcoutDescript = appel.description;
                    this.blockValidation = false;
                    this.iconLoading = false;
                    this.loadingExtraCost = false;
                  } else if (appel.code == 15 || appel.code == 16) {
                    if (appel.code == 15) {
                      this.surcoutDescript =
                        "Le port n'a pas pu être déterminé. Il sera ajusté par l'équipe commerciale lors de la validation";
                    } else if (appel.code == 16) {
                      this.surcoutDescript =
                        "Le port doit être déterminé par le service commercial.";
                    }
                    this.surcout = -1;
                    this.blockValidation = false;
                    this.iconLoading = false;
                    this.loadingExtraCost = false;
                  }
                }
              }
              this.loadingExtraCost = false;
            });
          } else {
            var params = {
              token: token,
              PANIER_ID: this.cart.PANIER_ID,
              CLIENT_CODE: this.userInfos.CODE_CLIENT,
              DATE_LIVRAISON: this.deliveryDate,
              MAILS: [this.userInfos.LOGIN],
              livraison: null,
            };
            const appel = await this.$store.dispatch("getExtracost", params);
            // console.log("res appel without address", JSON.stringify(appel.description));
            if (appel) {
              if (appel.code === 0) {
                this.surcout = appel.data.COUT;
                this.surcoutDescript = appel.description;
                this.iconLoading = false;
                this.loadingExtraCost = false;
              } else if (appel.code === 15 || appel.code === 16) {
                if (appel.code === 15) {
                  this.surcoutDescript =
                    "Le port n'a pas pu être déterminé. Il sera ajusté par l'équipe commerciale lors de la validation";
                } else if (appel.code === 16) {
                  this.surcoutDescript =
                    "Le port doit être déterminé par le service commercial.";
                }
                // await this.sendEmail(token);
                this.surcout = -1;
                this.blockValidation = false;
                this.iconLoading = false;
                this.loadingExtraCost = false;
              }
            }
          }
        }
      }
    },
    async sendEmail(token) {
      const strUser = "Utilisateur: " + this.userInfos.USER_ID;
      const strCart = "Panier: " + this.cart.PANIER_ID;
      const base64Corps = btoa(`Le port n'a pas pu être déterminé. Il sera ajusté par l'équipe commerciale lors de la validation. ${strUser} ${strCart}`)
      const params = {
        token: token,
        body: {
          DESTINATAIRES: ["c.plancke@thiriez-literie.fr"],
          SUJET: `[${process.env.NODE_ENV}] ERREUR DANS LE CALCUL DE LA DATE DE LIVRAISON`,
          CORPS: base64Corps
        },
      };
      await this.$store.dispatch("sendEmail", params);
    },
  },
  created() {
    this.userInfos = JSON.parse(localStorage.getItem("userInfos"));
    this.countries = JSON.parse(localStorage.getItem("countriesInfos"));
    this.cart = JSON.parse(localStorage.getItem("cartInfos"));
    this.linesCartInfos = JSON.parse(localStorage.getItem("linesCartInfos"));
    this.selectedDeliveryCountry = this.userInfos.LIVRAISON.CODEPAYS;
    this.accountType = this.userInfos.SECTEUR;
  },
  async mounted() {
    this.visibleSpin = true;
    const tokenInfos = JSON.parse(sessionStorage.getItem("tokenInfos"));
    if (tokenInfos) {
      const token = tokenInfos.TOKEN;
      const cart = localStorage.getItem("cartInfos");
      //console.log('cart :'+cart)
      if (cart) {
        const params = {
          token: token,
          id: JSON.parse(cart).PANIER_ID,
        };
        const entete = await this.$store.dispatch("getEnteteCart", params);
        if (entete.code === 0) {
          if (!entete.CLOTURE) {
            await this.$store.dispatch("getDeliveryAddress", token);
            const addresses = JSON.parse(
              localStorage.getItem("deliveryAddress")
            );
            if (addresses) {
              this.addresses.sort(
                (a, b) => parseFloat(a.CP) - parseFloat(b.CP)
              );
              this.filteredAddresses = this.addresses;
            }

            await this.getDatesFermetures(token);
            await this.estimateDelay(token);
            let date = moment(new Date());
            this.deliveryDate = date.format("YYYY-MM-DD");
            if (this.deliveryDate) {
              await this.getExtracost(false);
            }
          } else {
            return;
          }
        } else {
          return;
        }
      } else {
        this.$store.state.cart = null;
        this.$store.state.cartStatus = null;
        this.$store.state.linesCart = [];
        this.$store.state.linesCartLength = 0;
        this.$router.push("/produits");
      }
      this.visibleSpin = false;
    }
  },
};
</script>
<style lang="scss" scoped>
.warning-delivering {
  text-align: center;
  color: rgb(255, 0, 0);
  font-style: italic;
}

.delivery {
  width: 100%;
  height: 100%;

  &-address,
  &-date,
  &-infoContact {
    width: auto;
    margin: 5px auto;
    padding: 5px;
  }

  &-date,
  &-ref {
    &-input {
      width: 100%;
    }
  }

  &-date {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-button {
      margin: auto;
      padding: 10px;
      width: 100%;
      height: auto;
    }
  }

  &-address {
    &-city {
      display: flex;
      width: auto;
      margin: auto;
    }

    &-code {
      width: auto;
      margin: auto;
    }

    &-town {
      width: auto;
      margin: auto;
    }

    &-item {
      width: auto;
      margin: auto;
    }
  }

  &-input,
  &-button {
    width: 300px;
  }

  &-modal {
    &-button {
      text-align: center;
      width: 100%;
      margin-top: 10px;
    }

    &-title {
      text-align: center;
    }
  }
}

a-col {
  margin: 15px;
  padding: 15px;
}

.return {
  margin-bottom: 25px;
}

.div-fdp {
  text-align: center;
}

.div-fdp * {
  text-align: justify;
}

.CGV-link {
  color: #000399;
  font-weight: bold;
  padding: 4px;
}

.CGV-link:hover {
  color: #0003d1;
  animation: all 2s;
}
</style>