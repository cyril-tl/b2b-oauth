<template>
  <div class="cartPage">
    <a-spin tip="Chargement..." size="large" :spinning="visibleSpin">
      <h1 v-if="this.linesCartInfos.length === 0">
        <!-- {{ cartStatus }} -->
        Pas de panier en cours
      </h1>
      <a-row v-else>
        <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <p class="messgaQte">{{ messageQuantity }}</p>
          <a-table class="cartPage-datatable" rowKey="id" :columns="columns" :data-source="linesCartInfos" bordered
            :locale="{ emptyText: 'Aucun article disponible' }">
            <p slot="gamme" slot-scope="record" :style="[{ background: record.color }, gammeTdClass]">
              {{ record.lib }}
            </p>
            <span slot="lib" slot-scope="text" v-html="text" />
            <!-- <span slot="stock" slot-scope="text" v-html="text" /> -->
            <span slot="quantity" slot-scope="text" v-html="text" />
            <span slot="price" slot-scope="text" v-html="text" />
            <span slot="deliveryDate" slot-scope="text" v-html="text" style="font-weight: bold" />
            <span slot="action" slot-scope="record">
              <i aria-label="icon: edit" class="anticon anticon-edit clickable-content" @click="showModal(record)">
                <svg viewBox="64 64 896 896" data-icon="edit" width="25px" height="25px" fill="currentColor"
                  aria-hidden="true" focusable="false" class>
                  <path
                    d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
                </svg>
              </i>
              <a-popconfirm class="clickable-content" title="Supprimer?" ok-text="Oui" cancel-text="Non"
                @confirm="confirm(record)" @cancel="cancel">
                <i aria-label="icon: delete" class="anticon anticon-delete" style="margin-left: 15px">
                  <svg viewBox="64 64 896 896" data-icon="delete" width="25px" height="25px" fill="currentColor"
                    aria-hidden="true" focusable="false" class>
                    <path
                      d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
                  </svg>
                </i>
              </a-popconfirm>
            </span>
          </a-table>
        </a-col>
        <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <div style="
              background: #ececec;
              margin: auto 8px;
              padding: 16px;
              height: 250px;
            ">
            <a-card title="Total" style="max-width: 100%; height: 100%; text-align: center">
              <h3>{{ parseFloat(totalPanier.toFixed(3)) }} €</h3>
              <h4 style="color: green">
                + écotaxe
                {{ parseFloat(totalEcotaxe.toFixed(3)) }} €
              </h4>
              <h2>
                = {{ parseFloat((totalPanier + totalEcotaxe).toFixed(3)) }} €
              </h2>
            </a-card>
            <br />
          </div>
        </a-col>
      </a-row>
      <a-modal class="cartPage-modal" centered v-if="visibleModal" v-model="visibleModal" :footer="null"
        @cancel="closeModal(article)">
        <h2 class="cartPage-modal-gamme" :style="[
          { borderBottom: '5px solid ' + article.color, margin: '15px auto' },
        ]">
          {{ article.gamme.lib.toUpperCase() }}
        </h2>
        <h3 class="cartPage-modal-lib">{{ article.libModal }}</h3>
        <div class="cartPage-modal-price">
          <div class="cartPage-modal-tranche">
            <h4 style="align-self: center; margin-bottom: 5px">TARIF :</h4>
            <span v-if="
              !article.remise.TRANCHE || article.remise.TRANCHE.length === 0
            ">Prix unitaire : {{ article.puRemise }} €</span>
          </div>
          <div class="cartPage-modal-sell">
            <a-input-number id="inputNumber" v-model="productQuantity" :min="1" :max="99"
              @change="InputQuantityChange(article)" />
            <span class="products-modal-total">Total : {{ totalProduct.toFixed(2) }} €</span>
            <span class="cartPage-modal-taxe">+ écotaxe : {{ totalEcoTaxe.toFixed(2) }} €</span>
          </div>
        </div>
        <div class="cartPage-modal-comm">
          <a-textarea placeholder="Ajouter un commentaire (facultatif). Exemple: CM: Dupont" :maxLength="30" :rows="2"
            v-model="comArticle" />
          <div>{{ comArticle.length }} / 30</div>
          <a-button type="primary" @click="updateProduct(article, productQuantity, $event)">Modifier l'article
          </a-button>
        </div>
      </a-modal>
    </a-spin>
  </div>
</template>

<script>
import { mapState } from "vuex";

const columns = [
  {
    title: "Libéllés",
    dataIndex: "lib",
    key: "lib",
    scopedSlots: { customRender: "lib" },
    sorter: (a, b) => a.lib.localeCompare(b.lib),
    sortDirections: ["descend", "ascend"],
    width: "35%",
    align: "center",
  },
  // {
  //   title: "Disponibilité",
  //   dataIndex: "stock",
  //   key: "stock",
  //   scopedSlots: { customRender: "stock" },
  //   sorter: (a, b) => a.stock.localeCompare(b.stock),
  //   sortDirections: ["descend", "ascend"],
  //   width: "15%",
  //   align: "center",
  // },
  {
    title: "Quantité",
    dataIndex: "quantity",
    key: "quantity",
    scopedSlots: { customRender: "quantity" },
    width: "15%",
    align: "center",
  },
  {
    title: "Prix unitaire",
    key: "price",
    dataIndex: "price",
    scopedSlots: { customRender: "price" },
    sorter: (a, b) => (a.pu !== b.pu ? (a.pu < b.pu ? -1 : 1) : 0),
    sortDirections: ["descend", "ascend"],
    width: "auto",
    align: "center",
  },
  {
    title: "Délai estimé",
    key: "deliveryDate",
    dataIndex: "deliveryDate",
    scopedSlots: { customRender: "deliveryDate" },
    sorter: (a, b) => a.deliveryDate.localeCompare(b.deliveryDate),
    sortDirections: ["descend", "ascend"],
    width: "auto",
    align: "center",
  },
  {
    title: "",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: "auto",
    align: "center",
  },
];

export default {
  data() {
    return {
      columns: columns,
      linesCartInfos: [],
      visibleSpin: true,
      visibleModal: false,
      gammes: [],
      comArticle: "",
      article: null,
      messageQuantity: "",
      productQuantity: null,
      rawListArticles: [],
      totalEcotaxe: 0,
      totalPanier: 0,
      totalProduct: null,
      totalEcoTaxe: null,
    };
  },
  computed: {
    ...mapState(["cartStatus", "linesCart"]),
  },
  methods: {
    confirm(article) {
      this.deleteProduct(article);
    },
    cancel() { },
    closeModal(article) {
      this.visibleModal = false;
      this.productQuantity = article.quantity;
    },
    countQte(arr, key) {
      let arr2 = [];

      arr.forEach((x) => {
        if (
          arr2.some((val) => {
            return val[key] == x[key];
          })
        ) {
          arr2.forEach((k) => {
            if (k[key] === x[key]) {
              k["QTE"] += x["QTE"];
            }
          });
        } else {
          let a = {};
          a[key] = x[key];
          a["QTE"] = x["QTE"];
          arr2.push(a);
        }
      });

      return arr2;
    },
    async deleteProduct(article) {
      this.visibleSpin = true;
      let cartId = JSON.parse(localStorage.getItem("cartInfos")).PANIER_ID;
      const token = JSON.parse(sessionStorage.getItem("tokenInfos")).TOKEN;
      let params = {
        token: token,
        id: cartId,
      };
      const entete = await this.$store.dispatch("getEnteteCart", params);
      if (entete.code === 0) {
        if (!entete.CLOTURE) {
          let paramsDelete = {
            token: token,
            cartId: cartId,
            lineId: article.id,
          };
          await this.getLines(params);
          if (this.linesCartInfos.length !== 0) {
            await this.$store
              .dispatch("deleteLineCart", paramsDelete)
              .then(async (res) => {
                if (res === true) {
                  let cartInfos = JSON.parse(
                    localStorage.getItem("cartInfos")
                  ).PANIER_ID;
                  if (cartInfos) {
                    await this.getLines(params);
                    if (this.linesCartInfos.length > 0) {
                      this.getSummaries();
                    }
                  }
                }
              });
          }
        } else {
          this.linesCartInfos = [];
          localStorage.removeItem("cartInfos");
          localStorage.removeItem("linesCartInfos");
          this.$router.push("/produits");
        }
        this.visibleSpin = false;
      } else {
        this.$router.push("/produits");
      }
    },
    async estimateDelay(token) {
      var mesData = { ARTICLES: [] };
      let index = 0;
      this.rawListArticles.forEach(
        (article) =>
        (mesData.ARTICLES[index++] = {
          CODE_ARTICLE: article.CODE_ARTICLE,
          QTE: article.QTE,
        })
      );
      mesData.ARTICLES = this.countQte(mesData.ARTICLES, "CODE_ARTICLE");
      const params = { token: token, body: mesData };
      await this.$store.dispatch("getEstimerDelai", params);
      const listDeliveryDates = JSON.parse(
        localStorage.getItem("estimerDelai")
      );
      this.listeDatesLivraison = listDeliveryDates;
      return;
    },
    async getLines(params) {
      this.rawListArticles = await this.$store.dispatch("getLinesCart", params);
      this.linesCartInfos = this.rawListArticles.map((data) => {
        4;
        const pubrut = data.PU;
        let remise = data.REMISE.RH;
        let price = Math.round(100 * pubrut * (1 + remise / 100)) / 100;
        if (data.REMISE.INVISIBLE) {
          remise = " €";
        } else {
          if (data.REMISE.RH !== 0) {
            remise =
              ' €<br /><span style="font-size: 10px;">(' +
              data.PU.toFixed(2) +
              "€ " +
              data.REMISE.RH +
              "% de remise)</span>";
          } else {
            remise = " €";
          }
        }
        let libModal = "";
        if (
          data.REF_CLIENT.CODE_ARTICLE !== "" &&
          data.REF_CLIENT.LIB01 !== ""
        ) {
          libModal =
            data.REF_CLIENT.CODE_ARTICLE +
            "\n" +
            data.REF_CLIENT.LIB01 +
            "\n" +
            data.REF_CLIENT.LIB02;
        } else {
          libModal = data.LIB01 + "\n" + data.LIB02 + "\n" + data.LIB03;
        }
        let res = {
          codeArticle: data.CODE_ARTICLE,
          id: data.LIGNE_ID,
          gamme: this.setLibGamme(data.IDGAMME),
          color: this.setColorGamme(data.IDGAMME),
          stock: this.setStock(data.EN_STOCK),
          lib: this.setLibProduct(data),
          libModal: libModal,
          pu: data.PU,
          ecoTaxe: data.ECOTAXE.PRIX,
          puRemise: price,
          price:
            price +
            remise +
            '<br /><span style="color: #22844e; font-size: 10px;">+ écotaxe: ' +
            data.ECOTAXE.PRIX +
            " €</span>",
          remise: data.REMISE,
          quantity: data.QTE,
          com: data.COMM,
          // deliveryDate: 0
          deliveryDate: this.setDateProduct(data.CODE_ARTICLE),
        };
        return res;
      });
      // console.log("sortie de getLines de Cart.vue");
    },
    getSummaries() {
      let totalCart = 0;
      let totalTax = 0;
      try {
        const strLines = localStorage.getItem("linesCartInfos");
        if (strLines) {
          // const linesCartInfos = JSON.parse(localStorage.getItem("linesCartInfos"));
          this.messageQuantity = ""
          this.linesCartInfos.forEach((line) => {
            totalCart += parseFloat(line.puRemise) * parseFloat(line.quantity);
            totalTax += parseFloat(line.ecoTaxe) * parseFloat(line.quantity);
            if (line.quantity >= 5) (this.messageQuantity = "Attention, pour les quantités de 5 ou plus, les dates sont à titre indicatif et pourront être ajustées par le service commercial.")
          });
        }
      } catch (error) {
        console.log(error);
      }
      this.totalPanier = totalCart;
      this.totalEcotaxe = totalTax;
      // console.log("total_panier: " + totalCart.toFixed(2));
      // return totalPanier;
    },
    InputQuantityChange(product) {
      this.totalProduct = this.productQuantity * product.puRemise;
      this.totalEcoTaxe = this.productQuantity * product.ecoTaxe;
    },
    setColorGamme(id) {
      let res;
      this.gammes.forEach((el) => {
        if (id == el.id) {
          res = el.color;
          return;
        }
      });
      return res;
    },
    setDateProduct(codeArt) {
      let test = "";
      if (this.listeDatesLivraison) {
        this.listeDatesLivraison.forEach((x) => {
          if (codeArt == x["CODE_ARTICLE"]) {
            let d1 = new Date(x["DATE_LIVRAISON"]);
            console.log("setDateProduct", x["DATE_LIVRAISON"], d1);
            if (d1 < Date.now() + 3600000 * 24 * 7 * 4) {
              test =
                '<span style="color:#32be64">' +
                x["DATE_LIVRAISON"] +
                "</span>";
            } else if (d1 > Date.now() + 3600000 * 24 * 7 * 6) {
              test =
                '<span style="color:#ff0000">' +
                x["DATE_LIVRAISON"] +
                "</span>";
            } else {
              test =
                '<span style="color:#ff7f00">' +
                x["DATE_LIVRAISON"] +
                "</span>";
            }
          }
        });
      }
      return test;
    },
    setLibGamme(id) {
      let res;
      this.gammes.forEach((el) => {
        if (id == el.id) {
          res = {
            lib: el.lib,
            color: el.color,
          };
          return;
        }
      });
      return res;
    },
    setLibProduct(product) {
      let res = "";
      if (
        product.REF_CLIENT.CODE_ARTICLE !== "" &&
        product.REF_CLIENT.LIB01 !== ""
      ) {
        res =
          '<span style="font-weight: bolder;">' +
          product.REF_CLIENT.CODE_ARTICLE +
          "</span> <br> <span> " +
          product.REF_CLIENT.LIB01 +
          " " +
          product.REF_CLIENT.LIB02 +
          "</span>";
      } else {
        res =
          '<span style="font-weight: bolder;">' +
          product.LIB01 +
          "</span> <br> <span> " +
          product.LIB02 +
          " " +
          product.LIB03 +
          "</span>";
      }
      const comm = product.COMM
        ? "<br /><span>Commentaire : " + product.COMM + "</span>"
        : "";
      return res + comm;
    },
    setStock(data) {
      return data
        ? '<span style="width:10px; height:10px; background:#22844e">&nbsp;&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;En stock</span>'
        : '<span style="width:10px; height:10px; background:#ff7f00">&nbsp;&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;En fabrication</span>';
    },
    showModal(article) {
      this.article = article;
      this.visibleModal = true;
      this.productQuantity = article.quantity;
      this.totalProduct = Number(article.puRemise);
      this.totalEcoTaxe = article.ecoTaxe;
      this.comArticle = article.com;
    },
    async updateProduct(article, quantity, event) {
      event.target.disabled = true;
      this.visibleModal = false;
      this.visibleSpin = true;
      let cartId = JSON.parse(localStorage.getItem("cartInfos")).PANIER_ID;
      const tokenInfos = JSON.parse(sessionStorage.getItem("tokenInfos"));
      if (tokenInfos) {
        const token = tokenInfos.TOKEN;
        const params = {
          token: token,
          id: cartId,
        };
        const entete = await this.$store.dispatch("getEnteteCart", params);
        // console.log("res entete " + JSON.stringify(entete.code));
        if (entete.code === 0) {
          if (!entete.data.CLOTURE) {
            let paramsUpdate = {
              token: token,
              article: article,
              quantity: quantity,
            };
            if (this.comArticle !== null || this.comArticle !== "") {
              paramsUpdate.article.com = this.comArticle;
            }
            await this.$store
              .dispatch("updateLineCart", paramsUpdate)
              .then(async (res) => {
                if (res === true) {
                  cartId = JSON.parse(
                    localStorage.getItem("cartInfos")
                  ).PANIER_ID;
                  this.linesCartInfo = await this.$store.dispatch(
                    "getLinesCart",
                    params
                  );
                  await this.getLines(params);
                  await this.estimateDelay(token);
                  this.getSummaries();
                  this.comArticle = "";
                  this.$emit("updateTitle");
                } else {
                  event.target.disabled = false;
                }
              });
          } else {
            this.$emit("updateTitle");
            this.linesCartInfos = [];
            localStorage.removeItem("cartInfos");
            localStorage.removeItem("linesCartInfos");
            this.$router.push("/produits");
          }
          this.visibleSpin = false;
        } else {
          this.$emit("updateTitle");
          this.$router.push("/produits");
        }
      } else {
        this.$router.push("/login");
      }
      // this.visibleSpin = false;
    },
  },
  async mounted() {
    //window.location.reload();
    if (window.location.href.substr(-2) !== "?r") {
      window.location = window.location.href + "?r";
    }
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
            this.gammes = JSON.parse(localStorage.getItem("gammesInfos"));
            this.rawListArticles = await this.$store.dispatch(
              "getLinesCart",
              params
            );
            if (this.rawListArticles.length > 0) {
              await this.estimateDelay(token);
              await this.getLines(params);
              this.getSummaries();
            }
          } else {
            this.linesCartInfos = [];
          }
        } else {
          this.linesCartInfos = [];
        }
      } else {
        this.linesCartInfos = [];
      }
      this.visibleSpin = false;
    }
  },
};
</script>

<style scoped lang="scss">
.cartPage {
  display: flex;
  justify-content: center;
  height: 100%;
  background: white;

  .ant-spin-nested-loading {
    width: 95%;
  }

  &-datatable {
    width: 100%;
  }

  &-modal {
    &-comm {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      textarea,
      button {
        margin-top: 15px;
      }

      button {
        width: 50%;
      }
    }

    &-gamme,
    &-lib {
      text-align: center;
      white-space: pre-line;
    }

    &-gamme {
      padding-bottom: 10px;
    }

    &-lib {
      padding-bottom: 25px;
    }

    &-price {
      height: 150px;
      border: 1px solid #ccc;
      border-radius: 5px;
      display: flex;
    }

    &-sell {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &-total {
      margin-top: 5px;
      font-weight: bold;
    }

    &-taxe {
      margin-bottom: 5px;
      color: #22844e;
      font-size: 10px;
    }

    &-tranche {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 20px;
      margin-top: 20px;
    }
  }
}

.clickable-content {
  cursor: pointer;
}

.messgaQte {
  margin: auto;
  width: 75%;
  min-width: 300px;
  color: #ff7f00;
  font-weight: bold;
  // max-width: 500px;
  text-align: center;
}
</style>