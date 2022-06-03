<template>
  <div class="products">
    <a-spin
      class="spin-class"
      tip="Chargement..."
      size="large"
      :spinning="visibleSpin"
    >
      <div class="products-header">
        <a-row>
          <a-col
            :xs="24"
            :sm="12"
            :md="10"
            :lg="8"
            :xl="6"
            class="products-filters"
          >
            <h3 class="card-title">Filtrer les articles</h3>
            <a-checkbox @change="showFavorite">
              ⭐ Favoris ({{ nbFavorites }})
            </a-checkbox>
            <a-checkbox-group
              class="products-filters-list"
              v-model="checkedList"
              :options="options"
              @change="onChange"
            />
          </a-col>
          <!-- <a-col
            :xs="24"
            :sm="24"
            :md="4"
            :lg="4"
            :xl="4"
            class="rubrique-filtre"
          >
            <h3 class="card-title">Afficher les favoris</h3>
            <div style="text-align: center">
              <a-button
                class="btn btn-icon btn-round"
                style="background-color: #555; text-align: center"
                shape="circle"
                @click="showFavorite"
              >
                <a-icon :style="starStyle" type="star" theme="filled" />
              </a-button>
            </div>
          </a-col> -->
          <!-- <a-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8"></a-col> -->
        </a-row>
        <a-row>
          <a-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8"></a-col>
          <a-col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            :xl="6"
            class="products-search"
          >
            <a-input-search
              placeholder="Saisissez votre recherche"
              @change="onSearch"
              v-model="searchInputValue"
            />
            <div v-if="searchResults !== null">
              {{ searchResults }} {{ commentResult }}
            </div>
          </a-col>
        </a-row>
      </div>

      <!-- <a-tag v-if="!favoriteIsSelected" color="orange"> orange </a-tag> -->
      <a-table
        class="products-datatable"
        :scroll="{ y: 500 }"
        rowKey="id"
        :columns="columns"
        :data-source="articles"
        bordered
        :locale="{ emptyText: 'Aucun article disponible' }"
      >
        <span
          class="products-datatable-gamme"
          slot="gamme"
          slot-scope="gamme"
          :style="[{ borderBottom: '5px solid ' + gamme.color }, gammeTdClass]"
        >
          {{ gamme.lib }}
        </span>
        <span
          class="products-datatable-lib"
          slot="lib"
          slot-scope="text"
          v-html="text"
        >
        </span>
        <span
          class="products-datatable-stock"
          slot="stock"
          slot-scope="text"
          v-html="text"
        />
        <span
          class="products-datatable-price"
          slot="price"
          slot-scope="text"
          v-html="text"
        />
        <span
          class="products-datatable-action"
          slot="action"
          slot-scope="record"
        >
          <a-button type="primary" @click="showModal(record)">
            <i
              aria-label="icon: shopping-cart"
              class="anticon anticon-shopping-cart"
            >
              <svg
                viewBox="0 0 1024 1024"
                data-icon="shopping-cart"
                width="20px"
                height="25px"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class=""
              >
                <path
                  d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"
                ></path>
              </svg>
            </i>
          </a-button>
        </span>
      </a-table>
      <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <p class="downloadLink" type="primary" @click="getCSVProductsList">
          Télécharger la liste des produits
        </p>
      </a-col>
    </a-spin>
    <!-- modal d'ajout au panier -->
    <a-modal
      class="products-modal"
      centered
      v-if="visibleModal"
      v-model="visibleModal"
      :footer="null"
      @cancel="closeModal"
    >
      <h2
        class="products-modal-gamme"
        :style="[
          { borderBottom: '5px solid ' + article.color, margin: '15px auto' },
        ]"
      >
        {{ article.gamme.lib.toUpperCase() }}
      </h2>
      <h3 class="products-modal-lib" v-html="article.lib">{{ article.lib }}</h3>
      <div class="products-modal-price">
        <div class="products-modal-tranche">
          <h4 style="align-self: center; margin-bottom: 5px">TARIF :</h4>
          <span v-if="article.remise.TRANCHE.length === 0"
            >Prix unitaire : {{ article.puRemise }} €</span
          >
        </div>
        <div class="products-modal-sell">
          <a-input-number
            id="inputNumber"
            v-model="productQuantity"
            :min="1"
            :max="99"
            @change="InputQuantityChange(article)"
          />
          <span class="products-modal-total">
            Total : {{ totalProduct.toFixed(2) }} €
          </span>
          <span class="products-modal-taxe">
            + écotaxe : {{ totalEcoTaxe.toFixed(2) }} €
          </span>
        </div>
      </div>
      <div class="products-modal-comm">
        <a-textarea
          placeholder="Ajouter un commentaire (facultatif) 
Exemple: CM: Dupont"
          :maxLength="30"
          :rows="2"
          v-model="comArticle"
        />
        {{ comArticle.length }} / 30
        <a-button type="primary" @click="addCart(article, productQuantity)"
          >Ajouter au panier</a-button
        >
      </div>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: "Gamme",
    dataIndex: "gamme",
    key: "gamme",
    scopedSlots: { customRender: "gamme" },
    sorter: (a, b) => a.gamme.lib.localeCompare(b.gamme.lib),
    sortDirections: ["descend", "ascend"],
    width: "100px",
    align: "center",
  },
  {
    title: "Libéllés",
    dataIndex: "lib",
    key: "lib",
    scopedSlots: { customRender: "lib" },
    sorter: (a, b) => a.lib.localeCompare(b.lib),
    sortDirections: ["descend", "ascend"],
    width: "200px",
    align: "center",
  },
  {
    title: "Disponibilité",
    dataIndex: "stock",
    key: "stock",
    scopedSlots: { customRender: "stock" },
    sorter: (a, b) => a.stock.localeCompare(b.stock),
    sortDirections: ["descend", "ascend"],
    width: "75px",
    align: "center",
  },
  {
    title: "Prix",
    key: "price",
    dataIndex: "price",
    scopedSlots: { customRender: "price" },
    sorter: (a, b) => (a.pu !== b.pu ? (a.pu < b.pu ? -1 : 1) : 0),
    sortDirections: ["descend", "ascend"],
    width: "75px",
    align: "center",
  },
  {
    title: "",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: "50px",
    align: "center",
  },
];
export default {
  data() {
    return {
      addCartLoading: false,
      columns: columns,
      checkedList: null,
      comArticle: "",
      indeterminate: true,
      checkAll: false,
      articles: [],
      gammes: [],
      defaultListArticles: [],
      searchInputValue: "",
      nbFavorites: 0,
      favoriteIsSelected: false,
      searchResults: null,
      commentResult: " résultats trouvés",
      starStyle: {
        color: "#aaa",
        fontSize: "24px",
        textAlign: "center",
        margin: "auto",
      },
      visibleSpin: true,
      visibleModal: false,
      article: null,
      productQuantity: 1,
      totalProduct: null,
      totalEcoTaxe: null,
      options: null,
      gammeTdClass: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50px",
        width: "125px",
        marginBottom: "unset",
        margin: "0 auto",
      },
    };
  },
  methods: {
    async getCSVProductsList() {
      const token = JSON.parse(sessionStorage.getItem("tokenInfos")).TOKEN;
      const client_code = JSON.parse(
        localStorage.getItem("userInfos")
      ).CODE_CLIENT;
      const params = {
        token: token,
        client_code: client_code,
      };
      await this.$store.dispatch("getCSVProductsList", params);
    },
    async addCart(article, quantity) {
      this.visibleModal = false;
      setTimeout(() => {
        this.visibleSpin = true;
      }, 100);
      this.productQuantity = 1;
      const token = JSON.parse(sessionStorage.getItem("tokenInfos")).TOKEN;
      let params = { token: token, article: article, quantity: quantity };
      if (this.comArticle !== null || this.comArticle !== "") {
        params.article.com = this.comArticle;
      }
      await this.$store.dispatch("addLineCart", params);
      this.comArticle = "";
      setTimeout(() => {
        this.visibleSpin = false;
      }, 500);
    },
    showModal(article) {
      this.article = article;
      this.visibleModal = true;
      this.totalProduct = Number(article.puRemise);
      this.totalEcoTaxe = article.ecoTaxe;
    },
    closeModal() {
      this.visibleModal = false;
      this.productQuantity = 1;
      this.comArticle = "";
    },
    onChange() {
      this.onSearch();
    },
    InputQuantityChange(product) {
      this.totalProduct = this.productQuantity * product.puRemise;
      this.totalEcoTaxe = this.productQuantity * product.ecoTaxe;
    },
    showFavorite() {
      this.favoriteIsSelected = !this.favoriteIsSelected;
      this.favoriteIsSelected
        ? (this.starStyle.color = "#ebc334")
        : (this.starStyle.color = "#aaa");
      this.onSearch();
    },
    onSearch() {
      const searchValues = this.searchInputValue.trim().split(" ");
      if (searchValues.length > 0 && searchValues.length > 0) {
        this.articles = this.defaultListArticles.filter((article) => {
          let result = true;
          if (this.checkedList !== null && this.checkedList.length > 0) {
            if (!this.checkedList.includes(article.gamme.lib)) return false;
          }
          if (this.favoriteIsSelected) {
            if (article.NB_CDE < 1) {
              return false;
            }
          }
          searchValues.forEach((value) => {
            if (
              article.lib.toUpperCase().includes(value.toUpperCase()) ||
              article.id.toUpperCase().includes(value.toUpperCase())
            ) {
              // console.log("search");
            } else {
              result = false;
              return;
            }
          });
          return result;
        });
        if (this.searchInputValue.length === 0) {
          this.searchResults = null;
        } else {
          this.searchResults = this.articles.length;
        }
        if (this.articles.length === 0) {
          this.commentResult = "aucun résultat";
        } else if (this.articles.length === 1) {
          this.commentResult = " résutat trouvé";
        } else {
          this.commentResult = " résultats trouvés";
        }
      } else {
        this.articles = this.defaultListArticles;
        this.searchResults = null;
        this.commentResult = "";
      }
    },
    setCountGamme(gamme) {
      return this.articles.filter((article) => article.gamme.lib === gamme)
        .length;
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
    setStock(data) {
      return data
        ? '<span style="width:10px; height:10px; background:#22844e">&nbsp;&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;En stock</span>'
        : '<span style="width:10px; height:10px; background:#a8a8a8">&nbsp;&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;À fabriquer</span>';
    },
  },
  async mounted() {
    let titleHeader = {
      title: "Liste des produits",
      subTitle: "Vous avez accès à " + "..." + " articles",
      icon: '<i aria-label="icon: unordered-list" class="anticon anticon-unordered-list"><svg viewBox="64 64 896 896" data-icon="unordered-list" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"></path></svg></i>',
    };
    await this.$store.dispatch("setHeaderTitle", titleHeader);

    const tokenInfos = JSON.parse(sessionStorage.getItem("tokenInfos"));
    if (tokenInfos) {
      const token = tokenInfos.TOKEN;
      const result = await this.$store.dispatch("getProducts", token);
      this.gammes = result.gammes.map((data) => {
        return {
          id: data.ID,
          lib: data.LIB,
          color: data.COULEUR,
        };
      });
      this.nbFavorites = 0;
      this.articles = result.articles.map((data) => {
        // let remise = "" + data.REMISE.RH;
        // if (remise > 0) {
        //   price = (price + Math.floor(price * (remise * 1)) / 100).toFixed(2);
        // } else if (remise < 0) {
        //   price = (price - Math.ceil(price * (remise * -1)) / 100).toFixed(2);
        // }
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
        let lib = "";
        if (
          data.REF_CLIENT.CODE_ARTICLE !== "" &&
          data.REF_CLIENT.LIB01 !== ""
        ) {
          lib =
            '<span style="font-weight: bolder;">' +
            data.REF_CLIENT.CODE_ARTICLE +
            "</span> <br> <span> " +
            data.REF_CLIENT.LIB01 +
            " " +
            data.REF_CLIENT.LIB02 +
            "</span>";
        } else {
          lib =
            '<span style="font-weight: bolder;">' +
            data.LIB01 +
            "</span> <br> <span> " +
            data.LIB02 +
            " " +
            data.LIB03 +
            "</span>";
        }
        if (data.NB_CDE > 0) {
          this.nbFavorites++;
          lib = '<span v-if="!favoriteIsSelected"> ⭐ </span>' + lib;
        }
        let res = {
          id: data.CODE_ARTICLE,
          gamme: this.setLibGamme(data.IDGAMME),
          color: this.setColorGamme(data.IDGAMME),
          stock: this.setStock(data.EN_STOCK),
          NB_CDE: data.NB_CDE,
          lib: lib,
          pu: data.PU,
          ecoTaxe: data.ECOTAXE.PRIX,
          puRemise: price,
          price:
            price +
            remise +
            '<br /><span style="color: #22844e; font-size: 10px;">écotaxe: ' +
            data.ECOTAXE.PRIX +
            " €</span>",
          remise: data.REMISE,
          refClient: data.REF_CLIENT,
        };
        return res;
      });

      titleHeader = {
        title: "Liste des produits",
        subTitle: "Vous avez accès à " + this.articles.length + " articles",
        icon: '<i aria-label="icon: unordered-list" class="anticon anticon-unordered-list"><svg viewBox="64 64 896 896" data-icon="unordered-list" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"></path></svg></i>',
      };
      await this.$store.dispatch("setHeaderTitle", titleHeader);

      this.defaultListArticles = this.articles;
      this.options = result.gammes.map((data) => {
        return {
          label: data.LIB + " (" + this.setCountGamme(data.LIB) + ")",
          value: data.LIB,
        };
      });
      this.visibleSpin = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.ant-spin-container {
  margin-bottom: 128px !important;
}
.spin-class {
  margin-bottom: 64px;
  display: flex;
  justify-content: center;
  height: 100%;
}
.rubrique-filtre {
  margin: auto 16px;
  padding: 8px;
}
.products {
  background: white;
  &-datatable {
    margin-top: 4px;
    // margin-bottom: 50px;
    width: 95%;
    margin-left: 2.5%;
    //white-space: pre-line;
    &-stock {
      width: 10%;
      // max-width: 350px;
      // min-width: 150px;
    }
  }
  &-filters {
    padding: 10px;
    //width: 200px;
    //max-width: 100%;
    border-radius: 5px;
    border: 1px solid #aca6a6;
    &-all {
      margin-bottom: 15px;
    }
    &-list {
      width: 200px;
      display: flex;
      flex-direction: column;
    }
  }
  &-header {
    //display: flex;
    //position: fixed;
    top: 75px;
    left: 215px;
    right: 15px;
    z-index: 2;
    justify-content: space-between;
    padding-top: 50px;
    padding: 16px;
    background: white;
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
      //padding: 0 20px;
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
  &-search {
    //width: 300px;
    max-width: 95%;
    height: 40px;
    margin: 15px auto 15px auto;
  }
}
.downloadLink {
  cursor: pointer;
  width: 100%;
  position: relative;
  left: 32px;
  margin-bottom: 50px;
}
</style>