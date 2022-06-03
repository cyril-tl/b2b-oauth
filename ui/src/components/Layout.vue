<template>
  <a-layout id="layout">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo">
        <img
          class="logo-picture"
          alt="logo Thiriez Literie"
          src="../assets/logo-blanc.svg"
        />
        <br />
        <span class="logo-title">Portail B2B</span>
      </div>
      <a-menu
        class="layout-menu"
        theme="dark"
        mode="inline"
        :selected-keys="currentRoute"
      >
        <a-menu-item
          class="layout-menu-top"
          v-for="menuTop in menus.top"
          :key="menuTop.key"
        >
          <router-link class="layout-menu-link" :to="{ name: menuTop.link }">
            <a-icon :type="menuTop.icon" />
            <span class="nav-text">
              {{ menuTop.title }}
            </span>
          </router-link>
        </a-menu-item>
        <a-menu-item
          class="layout-menu-bottom"
          v-for="menuBottom in menus.bottom"
          :key="menuBottom.key"
        >
          <router-link class="layout-menu-link" :to="{ name: menuBottom.link }">
            <a-icon :type="menuBottom.icon" />
            <span class="nav-text">
              {{ menuBottom.title }}
            </span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <div class="layout-header-title">
          <h1 class="layout-header-title title" v-if="headerTitle">
            <span v-html="headerTitle.icon"></span>{{ headerTitle.title }}
          </h1>
          <h3 class="layout-header-title subtitle" v-if="headerTitle">
            {{ headerTitle.subTitle }}
          </h3>
        </div>
        <div class="layout-header-actions">
          <a-dropdown v-if="isMounted" placement="bottomCenter">
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <span class="cart">
                <i
                  data-v-005bfc5a=""
                  aria-label="icon: shopping-cart"
                  class="anticon anticon-shopping-cart"
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    data-icon="shopping-cart"
                    width="40px"
                    height="40px"
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
                <span class="cartLength">{{ totalProductsCart }}</span>
              </span>
            </a>
            <a-menu slot="overlay">
              <!--  
              v-if="linesCart"
              <a-menu-item v-if="cartStatus !== 'Pas de panier en cours'">
                <a href="#">{{ cartStatus }}</a>
              </a-menu-item> 

               && cartStatus === 'Pas de panier en cours'
               -->
              <a-menu-item v-if="linesCart.length === 0">
                <a href="#">Votre panier est vide</a>
              </a-menu-item>
              <a-menu-item v-else>
                <div
                  class="cart-product"
                  v-for="(lineCart, index) in linesCart"
                  :key="index"
                  :style="{
                    borderLeft: '8px solid ' + setColorGamme(lineCart.IDGAMME),
                  }"
                >
                  <div v-if="index < 3">
                    <p style="margin-bottom: 0">
                      {{ setLibGamme(lineCart.IDGAMME) }}
                    </p>
                    <p style="margin-bottom: 0">
                      {{
                        lineCart.LIB01 +
                        " " +
                        lineCart.LIB02 +
                        " " +
                        lineCart.LIB03
                      }}
                    </p>
                    <p style="margin-bottom: 0">
                      Quantité : {{ lineCart.QTE }}
                    </p>
                    <hr />
                  </div>
                </div>
                <a-button
                  v-if="totalProductsCart === 1"
                  type="primary"
                  @click="goToCart"
                  style="margin: 0 auto; display: flex; align-items: center"
                  >Voir le panier ({{ totalProductsCart }} article)</a-button
                >
                <a-button
                  v-if="totalProductsCart > 1"
                  type="primary"
                  @click="goToCart"
                  style="margin: 0 auto; display: flex; align-items: center"
                  >Voir le panier ({{ totalProductsCart }} articles)</a-button
                >
              </a-menu-item>
            </a-menu>
          </a-dropdown>

          <a-popover placement="bottom">
            <template slot="content">
              <div>Déconnexion</div>
            </template>
            <i
              aria-label="icon: logout"
              class="anticon anticon-logout"
              title=""
              @click="logout"
            >
              <svg
                viewBox="64 64 896 896"
                data-icon="logout"
                width="30px"
                height="30px"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class=""
              >
                <path
                  d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"
                ></path>
              </svg>
            </i>
          </a-popover>
        </div>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
const menus = {
  top: [
    {
      key: "/accueil",
      title: "Accueil",
      link: "Home",
      icon: "home",
    },
    {
      key: "/produits",
      title: "Produits",
      link: "Products",
      icon: "unordered-list",
    },
    {
      key: "/panier",
      title: "Panier",
      link: "Cart",
      icon: "shopping-cart",
    },
    {
      key: "/commandes",
      title: "Commandes",
      link: "Orders",
      icon: "file-done",
    },
    {
      key: "/fichiers",
      title: "Fichiers",
      link: "Files",
      icon: "file",
    },
  ],
  bottom: [
    {
      key: "/mes-informations",
      title: "Mes informations",
      link: "Profile",
      icon: "user",
    },
    {
      key: "/contact",
      title: "Mes contacts",
      link: "Contact",
      icon: "contacts",
    },
  ],
};

export default {
  name: "Layout",
  data() {
    return {
      cartDetail: {},
      currentRoute: ["/accueil"],
      gammes: null,
      hoverCart: false,
      isMounted: false,
      linesCartInfo: [],
      menus,
    };
  },
  watch: {
    $route(to) {
      this.currentRoute = [to.path];
    },
  },
  computed: {
    ...mapState([
      "headerTitle",
      "cartStatus",
      "cart",
      "linesCart",
      "linesCartLength",
    ]),
    totalProductsCart() {
      let num = 0;
      this.linesCart.forEach((line) => {
        num = num + line.QTE;
      });
      return num;
    },
  },
  methods: {
    ...mapActions([
      "removeToken",
      "checkcartInfo",
      "getLinesCart",
      "getEnteteCart",
      "getProducts",
      "getCountries",
    ]),
    recheckToken() {
      const tokenInfos = JSON.parse(sessionStorage.getItem("tokenInfos"));

      if (tokenInfos) {
        const token = tokenInfos.TOKEN;
        const date = new Date(token.EXPIRATION).getTime();
        const now = new Date().getTime();
        if (date <= now) {
          this.logout();
        } else {
          if (this.$store.state.token === null) {
            this.$store.state.token = token;
          }
        }
      } else {
        this.removeToken("tokenInfos");
      }
    },
    goToCart() {
      this.$router.push("/panier");
    },
    logout() {
      this.removeToken("tokenInfos");
      window.Kommunicate.logout();
    },
    onCollapse() {
      //console.log(collapsed, type);
    },
    onBreakpoint() {
      //console.log(broken);
    },
    setLibGamme(id) {
      let res;
      setTimeout(() => {
        this.gammes.forEach((el) => {
          if (id == el.id) {
            res = el.lib;
            return;
          }
        });
        return res;
      }, 1000);
    },
    setColorGamme(id) {
      let res;
      // setTimeout(() => {
      // }, 1000);
      this.gammes.forEach((el) => {
        if (id == el.id) {
          res = el.color;
          return;
        }
      });
      return res;
    },
  },
  // async created() {},
  async mounted() {
    this.isMounted = false;
    const tokenInfos = JSON.parse(sessionStorage.getItem("tokenInfos"));
    if (tokenInfos) {
      const token = tokenInfos.TOKEN;
      await this.getProducts(token);
      this.gammes = JSON.parse(localStorage.getItem("gammesInfos"));
      await this.checkcartInfo(token);
      await this.getCountries(token);

      if (localStorage.getItem("cartInfos")) {
        const cart = localStorage.getItem("cartInfos");
        let cartId = JSON.parse(cart).PANIER_ID;
        const params = {
          token: token,
          id: cartId,
        };
        const entete = await this.getEnteteCart(params);
        if (entete.code === 0) {
          if (!entete.CLOTURE) {
            this.linesCartInfo = await this.getLinesCart(params);
          } else {
            localStorage.removeItem("cartInfos");
            localStorage.removeItem("linesCartInfos");
          }
        }
      }
      this.isMounted = true;
    }
  },
  updated() {
    // console.log("updated Layout");
    this.recheckToken();
  },
};
</script>

<style lang="scss" scoped>
body .ant-layout-sider-zero-width-trigger {
  background-color: #002043;
}
.cart-product {
  margin: 8px auto;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 4px 0 0 4px;
}
#layout {
  width: 100%;
  height: 100%;
  section {
    color: #002043;
    background-color: #fff;
  }

  .ant-dropdown-link,
  .ant-dropdown-link:hover {
    color: unset;
  }
  .ant-layout-sider {
    height: 100%;
    z-index: 10;
    &-below {
      position: absolute;
    }
    &-zero-width-trigger {
      top: 75px !important;
    }
    color: #fff;
    background-color: rgba(0, 32, 67, 1);
  }
  .ant-menu-dark.ant-menu-inline {
    background-color: #002043;
  }

  .ant-layout-content {
    min-height: unset;
    background-color: #fff;
  }

  .ant-dropdown-menu-item {
    color: #002043;
    background-color: #fff;
  }
  .ant-dropdown-menu-item:hover {
    color: #fff;
    background-color: #002043;
  }
  .cart {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 1;
    color: #fff;
  }
  .cartLength {
    position: absolute;
    border: 2px solid;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #002043;
    font-size: large;
    font-weight: 900;
  }
  .layout {
    &-header {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
      justify-content: space-between;
      align-items: center;
      height: 75px;
      background: #002043;
      border-bottom: 1px solid #002043;
      padding: 0 2% 0 20%;
      .anticon-logout {
        margin-left: 30px;
        color: #fff;
        cursor: pointer;
      }
      &-actions {
        display: flex;
        flex-direction: row;
        height: 75px;
        align-items: center;
      }
      &-title {
        .title,
        .subtitle {
          text-align: left;
          line-height: 1.5;
          margin: 0;
          padding: 0;
          color: #fff;
        }
        .title {
          font-weight: 500;
          font-size: x-large;
          span {
            margin-right: 10px;
          }
        }
        .subtitle {
          font-weight: 300;
        }
      }
    }
    &-content {
      margin-top: 75px;
      background: #fff;
      height: 100%;
    }
    &-menu-link {
      color: #fff;
    }
  }
  .logo {
    margin: 16px;
    &-picture {
      //height: 50px;
      width: 80%;
      margin: auto;
      background-color: #002043;
    }
    &-title {
      color: #fff;
      text-transform: uppercase;
    }
  }
}
</style>