<template>
  <div>
    <img class="image"
      src="https://www.equipaliterie.fr/wp-content/uploads/2021/01/ambiance-1600x800-ELEGANCE-1600x630-1.jpg"
      alt="image de fond">
  </div>
</template>

<script>
export default {
  name: "Background",
  mounted() {
    // console.log('chargement du background');
  }
};
</script>
<style lang="scss" scoped>
.image {
  position: fixed;
  display: block;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;

  filter: blur(8px);
  -webkit-filter: blur(8px);
  -moz-filter: blur(8px);
  -o-filter: blur(8px);
  -ms-filter: blur(8px);

  transform: scale(1.11);
  z-index: -1;
}
</style>