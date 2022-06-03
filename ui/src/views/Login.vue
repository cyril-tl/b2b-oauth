<template>
  <login-form />
</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  components: {
    LoginForm,
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 700px;
  // height: fit-content;
  // margin: auto;
  // padding: 20px;
  border-radius: 5px;
  // align-self: center;
  // display: flex;
  align-items: center;
  // justify-content: center;
  // flex-direction: column;
  //box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

  box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.2);
  &-actions {
    flex-direction: column;
  }
  &-input,
  &-signin {
    width: 600px;
  }
}
</style>