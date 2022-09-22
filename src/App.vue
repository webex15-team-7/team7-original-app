<template>
  <div>
    <div class="nav__bar">
      <div class="nav__items"></div>
    </div>
    <div>
      <router-link to="/">Sign in</router-link>
      <router-link to="/SignUp">Sign up</router-link>
      <router-link to="/SpotifyAPI">SpotifyAPI</router-link>
      <router-link to="/MusicAnalysis">MusicAnalysis</router-link>
    </div>
    <router-view />
  </div>
</template>

<script></script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
.nav__bar {
  display: flex;
  justify-content: space-between;
  max-height: 5.5em;
  max-width: 1600px;
  margin: -60px 0 0 0;
  background: rgb(0, 0, 0);
  opacity: 80%;
}
</style>

<!-- spotifyから曲をとってきて画面に表示させる機能はゼミでやったやつ。geek-twitterでもある？ -->
