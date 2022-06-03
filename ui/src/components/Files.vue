<template>
  <div class="filesPage">
    <a-spin tip="Chargement..." size="large" :spinning="visibleSpin">
      <div class="filesPage-header">
        <div class="filesPage-filters"></div>
        <div>
          <a-input-search
            class="filesPage-search"
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
        class="filesPage-datatable"
        :scroll="{ y: 500 }"
        rowKey="FICHIER_ID"
        :columns="columns"
        :data-source="docs"
        bordered
        :locale="{ emptyText: 'Aucune commande disponible' }"
      >
        <span
          slot="type"
          slot-scope="record"
          :style="{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }"
        >
          <div :style="{ width: '100px' }">{{ record.TYPE }}</div>
          <img :src="`data:image/png;base64,${record.ICONE}`" />
        </span>
        <span slot="action" slot-scope="record">
          <a-button
            v-if="record.TYPE !== 'LIEN'"
            type="primary"
            :style="{ width: '125px' }"
            @click="downloadFile(record)"
          >
            Télécharger
          </a-button>
          <a-button
            v-else
            type="primary"
            :style="{ width: '125px' }"
            @click="downloadFile(record)"
          >
            Consulter
          </a-button>
        </span>
      </a-table>
    </a-spin>
  </div>
</template>

<script>
const columns = [
  {
    title: "Libellé",
    dataIndex: "LIBELLE",
    key: "lib",
    sorter: (a, b) => a.LIBELLE.localeCompare(b.LIBELLE),
    sortDirections: ["descend", "ascend"],
    scopedSlots: { customRender: "lib" },
    width: "30%",
    align: "center",
  },
  {
    title: "Description",
    dataIndex: "DESCRIPTION",
    key: "desc",
    sorter: (a, b) => a.DESCRIPTION.localeCompare(b.DESCRIPTION),
    sortDirections: ["descend", "ascend"],
    scopedSlots: { customRender: "desc" },
    width: "40%",
    align: "center",
  },
  {
    title: "Type",
    key: "type",
    scopedSlots: { customRender: "type" },
    sorter: (a, b) => a.TYPE.localeCompare(b.TYPE),
    sortDirections: ["descend", "ascend"],
    width: "15%",
    align: "center",
  },
  {
    title: "",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: "15%",
    align: "center",
  },
];

export default {
  data() {
    return {
      columns: columns,
      docs: [],
      defaultListDocs: [],
      searchInputValue: "",
      searchResults: null,
      visibleSpin: true,
    };
  },
  methods: {
    async downloadFile(doc) {
      if (doc.TYPE !== "LIEN") {
        const token = JSON.parse(sessionStorage.getItem("tokenInfos")).TOKEN;
        const params = {
          token: token,
          docId: doc.FICHIER_ID,
          titleFile: doc.NOM,
        };
        await this.$store.dispatch("downloadFile", params);
      } else {
        window.open(doc.NOM, "_blank");
      }
    },
    onSearch() {
      const searchValues = this.searchInputValue.trim().split("*");
      if (searchValues.length > 0) {
        this.docs = this.defaultListDocs.filter((doc) => {
          let result = false;
          searchValues.forEach((value) => {
            if (
              doc.DESCRIPTION.toUpperCase().includes(value.toUpperCase()) ||
              doc.TYPE.toUpperCase().includes(value.toUpperCase()) ||
              doc.LIBELLE.toUpperCase().includes(value.toUpperCase()) ||
              doc.NOM.toUpperCase().includes(value.toUpperCase())
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
          return result;
        });
        if (this.searchInputValue.length === 0 && searchValues !== "") {
          this.searchResults = null;
          this.docs = this.defaultListDocs;
        } else {
          this.searchResults = this.docs.length;
        }
      } else {
        this.docs = this.defaultListDocs;
        this.searchResults = 0;
      }
    },
  },
  async created() {
    this.visibleSpin = true;
    let titleHeader = {
      title: "Fichiers",
      subTitle: "Vous avez ... fichiers",
      icon: '<i aria-label="icon: file" class="anticon anticon-file"><svg viewBox="64 64 896 896" data-icon="file" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z"></path></svg></i>',
    };
    await this.$store.dispatch("setHeaderTitle", titleHeader);

    const tokenInfos = JSON.parse(sessionStorage.getItem("tokenInfos"));
    if (tokenInfos) {
      const token = tokenInfos.TOKEN;
      await this.$store.dispatch("getFilesList", token);
      const data = JSON.parse(localStorage.getItem("filesInfos"));
      if (data) {
        this.docs = this.defaultListDocs = data;
        titleHeader = {
          title: "Fichiers",
          subTitle: "Vous avez " + data.length + " fichiers",
          icon: '<i aria-label="icon: file" class="anticon anticon-file"><svg viewBox="64 64 896 896" data-icon="file" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z"></path></svg></i>',
        };
      }
      await this.$store.dispatch("setHeaderTitle", titleHeader);
      this.visibleSpin = false;
    }
  },
};
</script>

<style scoped lang="scss">
.filesPage {
  display: flex;
  justify-content: center;
  height: 100%;
  background: white;
  .ant-spin-nested-loading {
    width: 95%;
  }
  &-datatable {
    width: 100%;
    margin-top: 128px;
    margin-bottom: 128px;
  }
  &-filters {
    padding: 10px;
    width: 175px;
    &-all {
      margin-bottom: 15px;
    }
    &-list {
      display: flex;
      flex-direction: column;
    }
  }
  &-header {
    display: flex;
    position: fixed;
    top: 75px;
    left: 215px;
    right: 15px;
    z-index: 2;
    justify-content: space-between;
    padding-top: 50px;
    padding: 25px;
    background: white;
  }
  &-search {
    width: 300px;
    height: 40px;
  }
}
</style>