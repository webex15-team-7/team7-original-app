<template>
  <div class="signin">
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
    <button @click="login">ログイン</button>
    <!-- <p>
      新しいアカウントを作成しますか？
      <router-link to="/signup">新規登録</router-link>
    </p> -->
  </div>
</template>

<script>
import { projectAuth } from "../firebase.js"
import { signInWithEmailAndPassword } from "firebase/auth"

export default {
  data() {
    return {
      mailaddress: "",
      password: "",
    }
  },
  methods: {
    login: function () {
      signInWithEmailAndPassword(projectAuth, this.mailaddress, this.password)
        .then(alert("Success!"))
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
