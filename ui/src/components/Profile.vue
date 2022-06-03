<template>
  <a-form :form="form" class="profile" @submit="handleSubmit">
    <a-spin
      tip="Chargement des informations..."
      size="large"
      :spinning="visibleSpin"
    >
      <h1>Facturation</h1>
      <hr />
      <div class="profile-delivery">
        <div class="profile-billing-form">
          <div
            class="profile-address"
            v-if="userInfos.FACTURATION !== undefined"
          >
            <div class="profile-address-form">
              <div class="delivery-contact">
                <a-form-item
                  class="profile-address-item"
                  label="Contact de facturation: Nom"
                >
                  <a-input
                    @change="onItemChange"
                    :disabled="true"
                    v-decorator="[
                      'addressBillingName',
                      {
                        initialValue: userInfos.FACTURATION.CONTACT.NOM,
                        rules: [
                          {
                            max: 40,
                            required: false,
                            message:
                              'Merci de renseigner un nom valide! (40 caractères max)',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  class="profile-address-item"
                  label="Contact de facturation: Mail"
                >
                  <a-input
                    @change="onItemChange"
                    :disabled="true"
                    v-decorator="[
                      'addressBillingMail',
                      {
                        initialValue: userInfos.FACTURATION.CONTACT.MAIL,
                        rules: [
                          {
                            max: 60,
                            required: false,
                            message:
                              'Merci de renseigner un mail valide! (60 caractères max)',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  class="profile-address-item"
                  label="Contact de facturation: Tel"
                >
                  <a-input
                    @change="onItemChange"
                    :disabled="true"
                    v-decorator="[
                      'addressBillingPhone',
                      {
                        initialValue: userInfos.FACTURATION.CONTACT.TEL,
                        rules: [
                          {
                            max: 20,
                            required: false,
                            message:
                              'Merci de renseigner un téléphone valide! (20 caractères max)',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
              </div>
              <div class="delivery-contact">
                <a-form-item
                  class="profile-address-item"
                  label="Raison sociale"
                >
                  <a-input
                    @change="onItemChange"
                    :disabled="true"
                    v-decorator="[
                      'billingName',
                      {
                        initialValue: userInfos.FACTURATION.NOM,
                        rules: [
                          {
                            max: 40,
                            required: false,
                            message:
                              'Merci de renseigner un nom valide! (40 caractères max)',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item class="profile-address-item" label="Rue 1">
                  <a-input
                    @change="onItemChange"
                    :disabled="true"
                    v-decorator="[
                      'billingWay1',
                      {
                        initialValue: userInfos.FACTURATION.RUE1,
                        rules: [
                          {
                            max: 40,
                            required: false,
                            message:
                              'Merci de renseigner une rue de facturation valide! (40 caractères max)',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item class="profile-address-item" label="Rue 2">
                  <a-input
                    @change="onItemChange"
                    :disabled="true"
                    v-decorator="[
                      'billingWay2',
                      {
                        initialValue: userInfos.FACTURATION.RUE2,
                        rules: [
                          {
                            max: 40,
                            required: false,
                            message:
                              'Merci de renseigner le complément de rue de facturation! (40 caractères max)',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
              </div>
              <div class="delivery-contact">
                <a-form-item class="profile-address-code" label="Code postal">
                  <a-input
                    @change="onItemChange"
                    :disabled="true"
                    v-decorator="[
                      'billingPostalCode',
                      {
                        initialValue: userInfos.FACTURATION.CODEPOSTAL,
                        rules: [
                          {
                            max: 16,
                            required: false,
                            message:
                              'Merci de renseigner un code postal valide! (16 caractères max)',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item class="profile-address-code" label="Ville">
                  <a-input
                    @change="onItemChange"
                    :disabled="true"
                    v-decorator="[
                      'billingCity',
                      {
                        initialValue: userInfos.FACTURATION.VILLE,
                        rules: [
                          {
                            max: 40,
                            required: false,
                            message:
                              'Merci de renseigner une ville valide! (40 caractères max)',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item class="profile-address-item" label="Pays">
                  <a-select
                    class="form-input-select"
                    :disabled="true"
                    @change="handleBillingSelectChange"
                    placeholder="Sélectionnez un pays"
                    v-decorator="[
                      'billingCountry',
                      {
                        initialValue: selectedBillingCountry,
                        rules: [
                          {
                            required: false,
                            message: 'Veuillez choisir un pays',
                          },
                        ],
                      },
                    ]"
                  >
                    <a-select-option
                      v-for="(bcountry, index) in countries"
                      :key="index"
                      :value="bcountry.CHAINES[2]"
                    >
                      <span v-if="bcountry.ACTIF">{{
                        bcountry.CHAINES[0]
                      }}</span>
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </div>
            </div>
          </div>
        </div>
        <p class="profile-billing-info">
          {{ bankInfos }}
          <router-link :to="{ name: 'Contact' }">Mes contacts</router-link>
        </p>
      </div>
      <h1>Adresse de livraison par défaut</h1>
      <hr />
      <h3 v-if="userInfos.SECTEUR == 'DISTRI'" class="warning-delivering">
       Attention: Pour toute livraison aux particuliers, merci de nous consulter au
        préalable.
      </h3>
      <div class="profile-delivery">
        <div class="profile-billing-form">
          <div class="profile-address" v-if="userInfos.LIVRAISON !== undefined">
            <div class="profile-address-form">
              <div class="delivery-contact">
                <a-form-item
                  class="profile-address-item"
                  label="Contact de livraison: Nom"
                >
                  <a-input
                    @change="onItemChange"
                    v-decorator="[
                      'addressDeliveryName',
                      {
                        initialValue: userInfos.LIVRAISON.CONTACT.NOM,
                        rules: [
                          {
                            max: 40,
                            required: true,
                            message:
                              'Merci de renseigner un nom valide! (40 caractères max)',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  class="profile-address-item"
                  label="Contact de livraison: Mail"
                >
                  <a-input
                    @change="onItemChange"
                    v-decorator="[
                      'addressDeliveryMail',
                      {
                        initialValue: userInfos.LIVRAISON.CONTACT.MAIL,
                        rules: [
                          {
                            max: 60,
                            required: true,
                            message:
                              'Merci de renseigner un mail valide! (60 caractères max)',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  class="profile-address-item"
                  label="Contact de livraison: Tel"
                >
                  <a-input
                    @change="onItemChange"
                    v-decorator="[
                      'addressDeliveryPhone',
                      {
                        initialValue: userInfos.LIVRAISON.CONTACT.TEL,
                        rules: [
                          {
                            max: 20,
                            required: true,
                            message:
                              'Merci de renseigner un téléphone valide (20 caractères max)',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
              </div>
              <div class="delivery-contact">
                <a-form-item class="profile-address-item" label="Nom">
                  <a-input
                    @change="onItemChange"
                    v-decorator="[
                      'deliveryName',
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
                    ]"
                  />
                </a-form-item>
                <a-form-item class="profile-address-item" label="Rue 1">
                  <a-input
                    @change="onItemChange"
                    v-decorator="[
                      'deliveryWay1',
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
                    ]"
                  />
                </a-form-item>
                <a-form-item class="profile-address-item" label="Rue 2">
                  <a-input
                    @change="onItemChange"
                    v-decorator="[
                      'deliveryWay2',
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
                    ]"
                  />
                </a-form-item>
              </div>
              <div class="delivery-contact">
                <a-form-item class="profile-address-code" label="Code postal">
                  <a-input
                    @change="onItemChange"
                    v-decorator="[
                      'deliveryPostalCode',
                      {
                        initialValue: userInfos.LIVRAISON.CODEPOSTAL,
                        rules: [
                          {
                            max: 16,
                            required: true,
                            message:
                              'Merci de renseigner un code postal valide! (16 caractères max)',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item class="profile-address-code" label="Ville">
                  <a-input
                    @change="onItemChange"
                    v-decorator="[
                      'deliveryCity',
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
                    ]"
                  />
                </a-form-item>
                <a-form-item class="profile-address-item" label="Pays">
                  <a-select
                    class="form-input-select"
                    @change="handleDeliverySelectChange"
                    placeholder="Sélectionnez un pays"
                    v-decorator="[
                      'deliveryCountry',
                      {
                        initialValue: selectedDeliveryCountry,
                        rules: [
                          {
                            required: true,
                            message: 'Veuillez choisir un pays',
                          },
                        ],
                      },
                    ]"
                  >
                    <a-select-option
                      v-for="(dcountry, index) in countries"
                      :key="index"
                      :value="dcountry.CHAINES[2]"
                    >
                      <span v-if="dcountry.ACTIF">{{
                        dcountry.CHAINES[0]
                      }}</span>
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </div>
            </div>
            <a-form-item
              class="profile-delivery-instruction"
              label="Instructions livraison"
            >
              <a-input
                @change="onItemChange"
                v-decorator="[
                  'deliveryInstructions',
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
                ]"
              />
            </a-form-item>
          </div>
          <a-form-item class="validation">
            <a-button
              class="formButton"
              type="primary"
              :disabled="!formChange"
              html-type="submit"
              >ENREGISTRER</a-button
            >
          </a-form-item>
        </div>
      </div>
    </a-spin>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      bankInfos:
        "Pour modifier vos informations bancaires, merci de prendre contact avec le service de comptabilté dans la rubrique ",
      countries: [],
      form: this.$form.createForm(this, { name: "cart_validation" }),
      formChange: false,
      selectedBillingCountry: null,
      selectedDeliveryCountry: null,
      userInfos: {},
      visibleSpin: true,
    };
  },
  methods: {
    onItemChange() {
      if (!this.formChange) this.formChange = !this.formChange;
    },
    handleBillingSelectChange(value) {
      this.selectedBillingCountry = value;
      this.onItemChange();
    },
    handleDeliverySelectChange(value) {
      this.selectedDeliveryCountry = value;
      this.onItemChange();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.formChange = !this.formChange;
          const user = {
            email: this.userInfos.LOGIN,
            livraison: {
              CONTACT: {
                NOM: values.addressDeliveryName.trim(),
                MAIL: values.addressDeliveryMail.trim(),
                TEL: values.addressDeliveryPhone,
              },
              NOM: values.deliveryName.trim(),
              RUE1: values.deliveryWay1.trim(),
              RUE2: values.deliveryWay2.trim(),
              CODEPOSTAL: values.deliveryPostalCode,
              VILLE: values.deliveryCity.trim(),
              CODEPAYS: values.deliveryCountry.trim(),
              INSTRUCTION: values.deliveryInstructions.trim(),
            },
          };
          await this.$store.dispatch("updateUserInfos", user);
          this.userInfos = await JSON.parse(localStorage.getItem("userInfos"));
        }
      });
    },
  },
  async mounted() {
    this.visibleSpin = true;
    const titleHeader = {
      title: "Mes informations",
      subTitle: "",
      icon: '<i aria-label="icon: user" class="anticon anticon-user"><svg viewBox="64 64 896 896" data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg></i>',
    };
    await this.$store.dispatch("setHeaderTitle", titleHeader);
    this.userInfos = await JSON.parse(localStorage.getItem("userInfos"));
    this.countries = JSON.parse(localStorage.getItem("countriesInfos"));
    this.selectedBillingCountry = this.userInfos.FACTURATION.CODEPAYS;
    this.selectedDeliveryCountry = this.userInfos.LIVRAISON.CODEPAYS;
    setTimeout(() => {
      this.visibleSpin = false;
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.warning-delivering {
  text-align: center;
  color: rgb(255, 0, 0);
  font-style: italic;
}
.profile {
  padding: 20px;
  &-billing,
  &-delivery {
    margin-top: 25px;
  }
  &-address {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: column;
    &-form {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }
  &-delivery {
    &-instruction {
      width: 97%;
      margin-left: 1.5%;
    }
  }
}
.delivery {
  &-contact {
    display: flex;
    flex-direction: column;
    width: 30%;
  }
}
.validation {
  width: 97%;
  display: flex;
  justify-content: center;
  .formButton {
    width: 300px;
  }
}
</style>