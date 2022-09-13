<template>
  <div class="myTracks" style="text-align: center">
    <h1>最近よく聴く曲の情報</h1>
    <div v-if="!auth">
      <button @click="spotifyLogin">認証</button>
    </div>
    <div v-else>
      <select v-model="selected">
        <option value="time">再生時間</option>
        <option value="acousticness">アコースティック感</option>
        <option value="danceability">踊りやすさ</option>
        <option value="energy">エネルギー感</option>
        <option value="energy">ライブ感</option>
        <option value="tempo">テンポ感</option>
      </select>
      <div v-if="myTracks != null">
        <ul style="list-style: none">
          <li v-for="(val, k) in myTracks" :key="k">
            <img :src="val.url" />
            <div>曲名:{{ val.name }}</div>
            <div>再生時間:{{ val.time }}秒</div>
            <div>アコースティック感:{{ val.acousticness }}</div>
            <div>踊りやすさ:{{ val.danceability }}</div>
            <div>エネルギー感:{{ val.energy }}</div>
            <div>ライブ感:{{ val.liveness }}</div>
            <div>テンポ感(BPM平均):{{ val.tempo }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"

export default {
  data: function () {
    return {
      auth: 0,
      init: 0,
      tracks: null,
      myTracks: null,
      selected: "",
    }
  },
  props: {
    routeParams: Object,
  },

  created() {
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace("#", "?"))
      this.auth = 1
    }
  },
  updated() {
    // 認証後、初回のみ実行
    if (this.auth && !this.init) {
      this.init = 1
      this.getmyTracks()
    }
  },
  methods: {
    spotifyLogin() {
      const endpoint = "https://accounts.spotify.com/authorize"
      const response_type = "token"
      // Client ID
      const client_id = "eb73d4ebcfbd4ab9b721c4ce9fe9940b"
      const redirect_uri = "http://localhost:8080/SpotifyAPI"
      const scope = "user-top-read"
      location.href =
        endpoint +
        "?response_type=" +
        response_type +
        "&client_id=" +
        client_id +
        "&redirect_uri=" +
        redirect_uri +
        "&scope=" +
        scope
    },
    async getmyTracks() {
      const endpoint = "https://api.spotify.com/v1/me/top/tracks"
      const data = {
        headers: {
          Authorization:
            this.routeParams.token_type + " " + this.routeParams.access_token,
        },
      }
      // 自分がよく聴く曲を取得する
      const tracks = []
      await axios
        .get(endpoint, data)
        .then((res) => {
          this.tracks = res.data.items
        })
        .catch((err) => {
          console.error(err)
        })

      // 取得した曲のデータを一つ一つ取得する
      for (let i = 0; i < this.tracks.length; i++) {
        await axios
          .get(
            "https://api.spotify.com/v1/audio-features/" + this.tracks[i].id,
            data
          )
          .then((res2) => {
            tracks.push({
              url: this.tracks[i].album.images[1].url,
              name: this.tracks[i].name,
              time: this.tracks[i].duration_ms,
              acousticness: res2.data.acousticness,
              danceability: res2.data.danceability,
              energy: res2.data.energy,
              liveness: res2.data.liveness,
              tempo: res2.data.tempo,
            })
          })
      }
      this.myTracks = tracks
    },
  },
  watch: {
    // ソート条件が変わったらソート実行
    selected() {
      this.myTracks.sort((a, b) => {
        return a[this.selected] < b[this.selected] ? 1 : -1
      })
    },
  },
}
</script>
