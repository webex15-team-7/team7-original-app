<template>
  <div class="signup">
    <table>
      <tr>
        <th>メールアドレス：</th>
      </tr>
      <tr>
        <td><input type="email" v-model="mailaddress" /></td>
      </tr>
      <tr>
        <th>パスワード：</th>
      </tr>
      <tr>
        <td><input type="password" v-model="password" /></td>
      </tr>
    </table>
    <button @click="signUp">登録</button>
  </div>
</template>

<script>
import { projectAuth } from "./firebase.js"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default {
  data() {
    return {
      mailaddress: "",
      password: "",
    }
  },
  methods: {
    signUp: function () {
      createUserWithEmailAndPassword(
        projectAuth,
        this.mailaddress,
        this.password
      )
        .then()
        .catch()
    },
  },
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
