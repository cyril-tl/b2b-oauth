<template>
  <div class="stepper">
    <a-steps class="stepper-steps" :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-action">
      <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">
        Précédent
      </a-button>
      <a-button
        v-if="current < steps.length - 1 && cartLength > 0"
        type="primary"
        @click="next"
      >
        Suivant
      </a-button>
    </div>
    <div class="steps-content" v-if="steps[current].content === 'cart'">
      <cart @updateTitle="setTitle()" />
    </div>
    <div class="steps-content" v-else>
      <delivery />
    </div>
  </div>
</template>

<script>
import Cart from "@/components/Cart";
import Delivery from "@/components/Delivery";
import { mapState } from "vuex";
export default {
  components: {
    Cart,
    Delivery,
  },
  data() {
    return {
      current: 0,
      linesCart: [],
      steps: [
        {
          title: "Panier",
          content: "cart",
        },
        {
          title: "Livraison",
          content: "",
        },
      ],
    };
  },
  computed: {
    ...mapState(["linesCartLength"]),
    cartLength() {
      if (this.linesCartLength > 0) return this.linesCartLength;
      else return 0;
    },
    totalProductsCart() {
      let num = 0;
      this.linesCart.forEach((line) => {
        num = num + line.QTE;
      });
      return num;
    },
  },
  methods: {
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    async setTitle() {
      let titleHeader = {
        title: "Panier",
        subTitle: "Vous avez ... articles dans votre panier",
        icon: '<i aria-label="icon: shopping-cart" class="anticon anticon-shopping-cart"><svg viewBox="0 0 1024 1024" data-icon="shopping-cart" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg></i>',
      };
      await this.$store.dispatch("setHeaderTitle", titleHeader);
      const tokenInfos = JSON.parse(sessionStorage.getItem("tokenInfos"));
      if (tokenInfos) {
        const token = tokenInfos.TOKEN;
        const cart = localStorage.getItem("cartInfos");
        if (cart) {
          let cartId = JSON.parse(cart).PANIER_ID;
          const params = {
            token: token,
            id: cartId,
          };
          const entete = await this.$store.dispatch("getEnteteCart", params);
          if (entete.code === 0) {
            if (!entete.CLOTURE) {
              this.linesCart = await this.$store.dispatch(
                "getLinesCart",
                params
              );
              let nbProd = this.totalProductsCart;

              // this.$store.state.linesCartLength = nbProd;
              if (nbProd !== 0) {
                if (nbProd == 1) {
                  titleHeader = {
                    title: "Panier",
                    subTitle:
                      "Vous avez " + nbProd + " article dans votre panier",
                    icon: '<i aria-label="icon: shopping-cart" class="anticon anticon-shopping-cart"><svg viewBox="0 0 1024 1024" data-icon="shopping-cart" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg></i>',
                  };
                } else {
                  titleHeader = {
                    title: "Panier",
                    subTitle:
                      "Vous avez " + nbProd + " articles dans votre panier",
                    icon: '<i aria-label="icon: shopping-cart" class="anticon anticon-shopping-cart"><svg viewBox="0 0 1024 1024" data-icon="shopping-cart" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg></i>',
                  };
                }
              } else {
                titleHeader = {
                  title: "Panier",
                  subTitle: "Vous n'avez aucun article dans votre panier",
                  icon: '<i aria-label="icon: shopping-cart" class="anticon anticon-shopping-cart"><svg viewBox="0 0 1024 1024" data-icon="shopping-cart" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg></i>',
                };
              }
            } else {
              this.linesCart = [];
              localStorage.removeItem("cartInfos");
              localStorage.removeItem("linesCartInfos");
            }
          }
        } else {
          // this.$store.state.linesCart = [];
          this.$store.state.linesCartLength = 0;
          titleHeader = {
            title: "Panier",
            subTitle: "Vous n'avez aucun article dans votre panier",
            icon: '<i aria-label="icon: shopping-cart" class="anticon anticon-shopping-cart"><svg viewBox="0 0 1024 1024" data-icon="shopping-cart" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg></i>',
          };
        }
        await this.$store.dispatch("setHeaderTitle", titleHeader);
      }
    },
  },
  mounted() {
    this.setTitle();
  },
  updated() {
    this.setTitle();
  },
};
</script>
<style lang="scss" scoped>
.stepper {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-steps {
    width: 64%;
    margin-top: 50px;
  }
}
.steps-content {
  width: 90%;
  height: 100%;
}

.steps-action {
  margin: 20px auto;
}
</style>