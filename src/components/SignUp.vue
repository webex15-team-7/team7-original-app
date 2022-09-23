<template>
  <div class="wrapper">
    <div class="big-bg">
      <div class="container">
        <h1>MusicAnalysis</h1>
        <div>
          <div>
            <div>
              <div>メールアドレス</div>
            </div>
            <div>
              <div><input type="email" v-model="mailaddress" /></div>
            </div>
            <div>
              <div>パスワード</div>
            </div>
            <div>
              <div><input type="password" v-model="password" /></div>
            </div>
          </div>
          <router-link to="/">
            <button @click="signUp">登録</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projectAuth } from "../firebase.js"
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
  margin-top: 60px;
}
img {
  max-width: 100%;
}
body {
  overflow-x: hidden;
  margin: 0;
}
h1 {
  font-size: 10vh;
  padding: 0%;
  margin: 0;
}
.big-bg {
  background-size: cover;
  background-position: center top;
  background-image: url(../images/24655357_s.jpg);
  background-blend-mode: multiply;
  min-height: 100vh;
}
.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 80%;
  height: 3.2rem;
}
</style>
