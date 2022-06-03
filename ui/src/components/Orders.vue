<template>
  <div class="orderPage">
    <a-spin tip="Chargement..." size="large" :spinning="visibleSpin">
      <div v-if="options" class="orderPage-header">
        <div class="orderPage-filters">
          <h3 class="card-title">Filtrer les commandes</h3>
          <a-checkbox-group
            class="orderPage-filters-list"
            v-if="options"
            v-model="checkedList"
            :options="options"
            @change="onChange"
          />
        </div>
        <div>
          <a-input-search
            class="orderPage-search"
            placeholder="Saisissez votre recherche"
            @change="onSearch"
            v-model="searchInputValue"
          />
          <div v-if="searchResults !== null && searchResults <= 1">
            {{ searchResults }} résultat trouvé
          </div>
          <div v-if="searchResults > 1">
            {{ searchResults }} résultats trouvés
          </div>
        </div>
      </div>
      <a-table
        class="orderPage-datatable"
        :scroll="{ y: 500 }"
        rowKey="DOC_ID"
        :columns="columns"
        :data-source="orders"
        bordered
        :locale="{ emptyText: 'Aucune commande disponible' }"
      >
        <span slot="order" slot-scope="record" v-html="record" />
        <span slot="action" slot-scope="record">
          <a-button
            type="primary"
            @click="showModal(record.docs, record.cart, tempNumDoc)"
          >
            Consulter
          </a-button>
        </span>
      </a-table>
      <a-modal
        class="orderPage-modal"
        centered
        v-if="visibleModal"
        v-model="visibleModal"
        :footer="null"
        @cancel="closeModal()"
      >
        <h2
          class="orderPage-modal-gamme"
          :style="[{ borderBottom: '5px solid #ccc', margin: '15px auto' }]"
        >
          {{ orderTitle }}
        </h2>
        <a-table
          :pagination="false"
          :showHeader="false"
          rowKey="id"
          :columns="columns2"
          :data-source="docs"
          bordered
          :locale="{ emptyText: 'Aucune commande disponible' }"
        >
          <span slot="action">
            <a-button type="primary" @click="downloadFile(docs)">
              Télécharger
            </a-button>
          </span>
        </a-table>
      </a-modal>
    </a-spin>
  </div>
</template>

<script>
import moment from "moment";
const columns = [
  {
    title: "Commande",
    dataIndex: "cellContent",
    key: "order",
    scopedSlots: { customRender: "order" },
    sorter: (a, b) =>
      a.cart.PANIER_ID !== b.cart.PANIER_ID
        ? a.cart.PANIER_I < b.cart.PANIER_I
          ? -1
          : 1
        : 0,
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend",
    width: "33%",
    align: "center",
  },
  {
    title: "Date de commande",
    dataIndex: "cart.DHMODIFICATION",
    key: "dateValidation",
    scopedSlots: { customRender: "dateValidation" },
    sorter: (a, b) =>
      a.cart.DHMODIFICATION.localeCompare(b.cart.DHMODIFICATION),
    sortDirections: ["descend", "ascend"],
    width: "33%",
    align: "center",
  },
  {
    title: "",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: "33%",
    align: "center",
  },
];

const columns2 = [
  {
    title: "Document",
    dataIndex: "lib",
    key: "lib",
    scopedSlots: { customRender: "lib" },
    width: "33%",
    align: "center",
  },
  {
    title: "",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: "33%",
    align: "center",
  },
];

export default {
  data() {
    return {
      checkedList: null,
      columns: columns,
      columns2: columns2,
      docs: [],
      defaultListOrders: [],
      options: null,
      order: {},
      orderTitle: {},
      orders: [],
      searchInputValue: "",
      searchResults: null,
      visibleSpin: true,
      visibleModal: false,
      tempNumDoc: null,
    };
  },
  methods: {
    moment,
    cancel() {},
    closeModal() {
      this.visibleModal = false;
    },
    async downloadFile(doc) {
      const token = JSON.parse(sessionStorage.getItem("tokenInfos")).TOKEN;
      const params = {
        token: token,
        docId: doc[0].docId,
        titleFile: doc[0].lib,
        doc: this.tempNumDoc,
      };
      await this.$store.dispatch("downloadDoc", params);
    },
    onChange() {
      this.onSearch();
    },
    onSearch() {
      const searchValues = this.searchInputValue.trim().split("*");
      if (searchValues.length > 0 && searchValues.length > 0) {
        this.orders = this.defaultListOrders.filter((order) => {
          let result = false;
          if (this.checkedList !== null && this.checkedList.length > 0) {
            this.checkedList.forEach((el) => {
              let tab = Object.entries(order.docsSearch);
              tab.forEach((element) => {
                if (element[0] === el && element[1].length > 0) {
                  result = true;
                }
              });
            });
          } else {
            result = true;
          }
          if (result) {
            searchValues.forEach((value) => {
              if (
                order.cart.NUMDOC.toUpperCase().includes(value.toUpperCase()) ||
                order.cart.REFCDE.toUpperCase().includes(value.toUpperCase()) ||
                order.cart.PANIER_ID.toString()
                  .toUpperCase()
                  .includes(value.toUpperCase())
              ) {
                if (value.trim() !== "") {
                  result = true;
                  return;
                }
              } else {
                result = false;
                return;
              }
            });
          }
          return result;
        });
        if (this.searchInputValue.length === 0) {
          this.searchResults = null;
        } else {
          this.searchResults = this.orders.length;
        }
      } else {
        this.orders = this.defaultListOrders;
        this.searchResults = 0;
      }
    },
    setCellContent(data) {
      const ligne1 =
        '<div style="width:70%; margin: 0 auto; display:flex; border-bottom: 1px solid #ccc; height: calc(100% / 3)"><div style="width:60%; text-align: left;">N° de panier :</div><div style="width:40%;  text-align: left;">' +
        data.cart.PANIER_ID +
        "</div></div>";
      const ligne2 =
        '<div style="width:70%; margin: 0 auto; display:flex; border-bottom: 1px solid #ccc; height: calc(100% / 3)"><div style="width:60%; text-align: left;">N° Doc Thiriez Literie :</div><div style="width:40%; text-align: left;">' +
        data.cart.NUMDOC +
        "</div></div>";
      const personalRef = data.cart.REFCDE !== "" ? data.cart.REFCDE : "aucune";
      const ligne3 =
        '<div style="width:70%; margin: 0 auto; display:flex; height: calc(100% / 3)"><div style="width:60%; text-align: left;">Votre ref :</div><div style="width:40%; text-align: left;">' +
        personalRef +
        "</div></div>";
      return ligne1 + ligne2 + ligne3;
    },
    showModal(order, cart) {
      this.docs = order;
      this.tempNumDoc = cart.NUMDOC;
      let tempTitle = cart.REFCDE !== "" ? " - Ref : " + cart.REFCDE : "";
      this.orderTitle = "Commande n° : " + cart.NUMDOC + tempTitle;
      this.visibleModal = true;
    },
  },
  async created() {
    let titleHeader = {
      title: "Commandes",
      subTitle: "Vous avez ... commandes",
      icon: '<i aria-label="icon: file-done" class="anticon anticon-file-done"><svg viewBox="64 64 896 896" data-icon="file-done" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm376 116c-119.3 0-216 96.7-216 216s96.7 216 216 216 216-96.7 216-216-96.7-216-216-216zm107.5 323.5C750.8 868.2 712.6 884 672 884s-78.8-15.8-107.5-44.5C535.8 810.8 520 772.6 520 732s15.8-78.8 44.5-107.5C593.2 595.8 631.4 580 672 580s78.8 15.8 107.5 44.5C808.2 653.2 824 691.4 824 732s-15.8 78.8-44.5 107.5zM761 656h-44.3c-2.6 0-5 1.2-6.5 3.3l-63.5 87.8-23.1-31.9a7.92 7.92 0 0 0-6.5-3.3H573c-6.5 0-10.3 7.4-6.5 12.7l73.8 102.1c3.2 4.4 9.7 4.4 12.9 0l114.2-158c3.9-5.3.1-12.7-6.4-12.7zM440 852H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"></path></svg></i>',
    };
    await this.$store.dispatch("setHeaderTitle", titleHeader);

    const token = JSON.parse(sessionStorage.getItem("tokenInfos")).TOKEN;
    const resp = await this.$store.dispatch("getOrderList", token);
    let data = false;
    if (resp !== null) {
      data = JSON.parse(localStorage.getItem("ordersInfos"));
    }
    let options = null;
    let docsLength = {
      AVOIR: 0,
      BL: 0,
      COMMANDE: 0,
      FACTURE: 0,
      OFFRE: 0,
    };
    if (data) {
      data.forEach((el) => {
        if (options === null) {
          let opt = el.docs;
          delete opt.NUMDOC;
          options = Object.keys(opt);
        }
        el.cart.DHMODIFICATION =
          "Le " +
          moment(el.cart.DHMODIFICATION).format("DD-MM-YYYY") +
          " à " +
          moment(el.cart.DHMODIFICATION).format("HH:mm:ss");
        el.cellContent = this.setCellContent(el);
        el.docsSearch = el.docs;
        const tempDocs = el.docs;
        el.docs = [];
        if (tempDocs.AVOIR.length > 0) {
          docsLength.AVOIR += tempDocs.AVOIR.length;
          tempDocs.AVOIR.forEach((element, index) => {
            el.docs.push({
              lib:
                "Avoir - " +
                index +
                "(" +
                moment(element.DHCREATION).format("DD/MM/YY") +
                ")",
              docId: element.DOC_ID,
            });
          });
        }
        if (tempDocs.BL.length > 0) {
          docsLength.BL += tempDocs.BL.length;
          tempDocs.BL.forEach((element, index) => {
            el.docs.push({
              lib:
                "Bon de livraison - " +
                index +
                "(" +
                moment(element.DHCREATION).format("DD/MM/YY") +
                ")",
              docId: element.DOC_ID,
            });
          });
        }
        if (tempDocs.COMMANDE.length > 0) {
          docsLength.COMMANDE += tempDocs.COMMANDE.length;
          let lastRow = tempDocs.COMMANDE[tempDocs.COMMANDE.length - 1];
          el.docs.push({
            lib:
              "Commande (" +
              moment(lastRow.DHCREATION).format("DD/MM/YY") +
              ")",
            docId: lastRow.DOC_ID,
          });
        }
        if (tempDocs.FACTURE.length > 0) {
          docsLength.FACTURE += tempDocs.FACTURE.length;
          tempDocs.FACTURE.forEach((element, index) => {
            el.docs.push({
              lib:
                "Facture - " +
                index +
                "(" +
                moment(element.DHCREATION).format("DD/MM/YY") +
                ")",
              docId: element.DOC_ID,
            });
          });
        }
        if (tempDocs.OFFRE.length > 0) {
          docsLength.OFFRE += tempDocs.OFFRE.length;
          let lastRow = tempDocs.OFFRE[tempDocs.OFFRE.length - 1];
          el.docs.push({
            lib:
              "Offre (" + moment(lastRow.DHCREATION).format("DD/MM/YY") + ")",
            docId: lastRow.DOC_ID,
          });
        }
      });
      this.options = options.map((data) => {
        return { label: data + "(" + docsLength[data] + ")", value: data };
      });
      this.orders = this.defaultListOrders = data;

      titleHeader = {
        title: "Commandes",
        subTitle: "Vous avez " + this.orders.length + " commandes",
        icon: '<i aria-label="icon: file-done" class="anticon anticon-file-done"><svg viewBox="64 64 896 896" data-icon="file-done" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm376 116c-119.3 0-216 96.7-216 216s96.7 216 216 216 216-96.7 216-216-96.7-216-216-216zm107.5 323.5C750.8 868.2 712.6 884 672 884s-78.8-15.8-107.5-44.5C535.8 810.8 520 772.6 520 732s15.8-78.8 44.5-107.5C593.2 595.8 631.4 580 672 580s78.8 15.8 107.5 44.5C808.2 653.2 824 691.4 824 732s-15.8 78.8-44.5 107.5zM761 656h-44.3c-2.6 0-5 1.2-6.5 3.3l-63.5 87.8-23.1-31.9a7.92 7.92 0 0 0-6.5-3.3H573c-6.5 0-10.3 7.4-6.5 12.7l73.8 102.1c3.2 4.4 9.7 4.4 12.9 0l114.2-158c3.9-5.3.1-12.7-6.4-12.7zM440 852H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"></path></svg></i>',
      };
      await this.$store.dispatch("setHeaderTitle", titleHeader);
      this.visibleSpin = false;
    } else {
      this.orders = this.defaultListOrders = [];

      titleHeader = {
        title: "Commandes",
        subTitle: "Vous n'avez aucune commande",
        icon: '<i aria-label="icon: file-done" class="anticon anticon-file-done"><svg viewBox="64 64 896 896" data-icon="file-done" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm376 116c-119.3 0-216 96.7-216 216s96.7 216 216 216 216-96.7 216-216-96.7-216-216-216zm107.5 323.5C750.8 868.2 712.6 884 672 884s-78.8-15.8-107.5-44.5C535.8 810.8 520 772.6 520 732s15.8-78.8 44.5-107.5C593.2 595.8 631.4 580 672 580s78.8 15.8 107.5 44.5C808.2 653.2 824 691.4 824 732s-15.8 78.8-44.5 107.5zM761 656h-44.3c-2.6 0-5 1.2-6.5 3.3l-63.5 87.8-23.1-31.9a7.92 7.92 0 0 0-6.5-3.3H573c-6.5 0-10.3 7.4-6.5 12.7l73.8 102.1c3.2 4.4 9.7 4.4 12.9 0l114.2-158c3.9-5.3.1-12.7-6.4-12.7zM440 852H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"></path></svg></i>',
      };
      await this.$store.dispatch("setHeaderTitle", titleHeader);
      this.visibleSpin = false;
    }
  },
};
</script>

<style scoped lang="scss">
.orderPage {
  display: flex;
  justify-content: center;
  height: 100%;
  background: white;
  .ant-spin-nested-loading {
    width: 95%;
  }
  &-datatable {
    width: 100%;
    margin-top: 32px;
    margin-bottom: 128px;
  }
  &-filters {
    padding: 10px;
    width: 175px;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
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
    display: flex;
    // position: fixed;
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
    width: 300px;
    height: 40px;
  }
}
</style>