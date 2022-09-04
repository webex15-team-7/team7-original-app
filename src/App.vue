<template>
  <SingUpComponent />
  <SingInComponent />
</template>

<script>
import SingUpComponent from "./components/SignUp.vue"
import SingInComponent from "./components/SignInComponent.vue"

export default {
  components: {
    SingUpComponent,
    SingInComponent,
  },
  data() {},
  methods: {},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
