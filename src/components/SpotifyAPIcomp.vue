<template>
  <div class="myTracks" style="text-align: center">
    <h1>MusicAnalysis</h1>
    <div v-if="!auth">
      <button @click="spotifyLogin" class="button">Start!</button>
    </div>
    <div v-else>
      <!-- <select v-model="selected">
        <option value="time">再生時間</option>
        <option value="acousticness">アコースティック感</option>
        <option value="danceability">踊りやすさ</option>
        <option value="energy">エネルギー感</option>
        <option value="energy">ライブ感</option>
        <option value="tempo">テンポ感</option>
      </select> -->
      <div v-if="myTracks != null">
        <ul style="list-style: none">
          <li v-for="(val, k) in myTracks" :key="k">
            <img :src="val.url" class="Trackimg" />
            <div>曲名:{{ val.name }}</div>
            <!-- <div>再生時間:{{ val.time }}秒</div> -->
            <div>アコースティック感:{{ val.acousticness }}/1</div>
            <div>踊りやすさ:{{ val.danceability }}/1</div>
            <div>過激さ:{{ val.energy }}/1</div>
            <!-- <div>ライブ感:{{ val.liveness }}</div> -->
            <div>テンポ感(BPM平均):{{ val.tempo }}</div>
          </li>
        </ul>
      </div>
      <div v-if="myTracks != null">
        <ul style="list-style: none">
          <li>----------------------------------</li>
          <div>あなたのおすすめの曲をおしえて！</div>
          <li v-for="(val, k) in myTracks" v-bind:key="k">
            <div>{{ val.name }}</div>
            <div>
              <input type="checkbox" v-model="tracks[k].isDone" />
              <!-- <div>{{ tracks[k].isDone }}</div> -->
              <!-- <div>{{ tracks[k].name }}</div> -->
            </div>
          </li>
        </ul>
        <div>あなたの活動している地域は？？</div>
        <select v-model="selectedPlace">
          <option value="">都道府県選択</option>
          <option v-for="(pref, index) in prefList" :key="index">
            {{ pref.name }}
          </option>
        </select>
      </div>
      <button @click="MusicSelect" class="button">この曲をおすすめする</button>
      <div>
        <div>-----------------------------------</div>
        <div>都道府県ごとのおすすめ曲！</div>
        <div>
          <div>知りたい都道府県</div>
          <select v-model="getplace">
            <option value="">都道府県選択</option>
            <option v-for="(pref, index) in prefList" :key="index">
              {{ pref.name }}
            </option>
          </select>
        </div>
        <button @click="getFirecaseData" class="button">取得</button>
        <div>
          <div v-if="result !== []">
            <div>聞かれている曲</div>
            <div v-for="(resultval, i) in result" v-bind:key="i">
              <div>曲名:{{ resultval.text }}</div>
            </div>
            <ul style="list-style: none"></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div></div>
</template>

<script>
import axios from "axios"
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { PREFS } from "./todouhukenlist"

export default {
  data: function () {
    return {
      auth: 0,
      init: 0,
      tracks: null,
      myTracks: null,
      selected: "",
      // selectedMusic: null,
      // isDone: [],
      selectedMusic: [],
      prefList: [],
      prefs: [],
      selectedPlace: 100,
      result: [],
      getplace: 1,
    }
  },
  watch: {
    isDone: {
      handleError: function () {
        console.log("watch!!!")
      },
    },
  },
  props: {
    routeParams: Object,
  },

  computed: {
    selection: function () {
      return this.test
    },
  },
  created() {
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace("#", "?"))
      this.auth = 1
    }
    this.prefs = PREFS
    for (let i = 0; i < this.prefs.length; i++) {
      this.prefList.push(this.prefs[i])
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
          // console.log(res.data)
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
              isDone: false,
              ID: this.tracks[i].id,
            })
          })
      }
      this.myTracks = tracks
      console.log(this.myTracks)
      console.log(typeof this.myTracks)
      // console.log(this.myTracks)
      // console.log(this.tracks)
    },

    MusicSelect() {
      for (let i = 0; i < this.tracks.length; i++) {
        if (this.tracks[i].isDone == true) {
          this.selectedMusic.push(this.tracks[i].name)
          this.selectedMusic.push(this.tracks[i].id)
          this.selectedMusic.push(this.selectedPlace)
        }
      }
      console.log(this.selectedMusic)
      if (
        this.selectedMusic.length === 3 &&
        this.selectedPlace != 100 &&
        this.selectedPlace != ""
      ) {
        addDoc(collection(db, "favoriteMusic"), {
          text: this.selectedMusic[0],
          id: this.selectedMusic[1],
          place: this.selectedMusic[2],
        }).then(this.selectedMusic.splice(0))
      } else {
        alert("音楽1曲と場所を選択してください")
        this.selectedMusic = []
      }

      // console.log(this.selectedPlace)
    },
    async getFirecaseData() {
      if (this.result.length == 0) {
        const q = query(
          collection(db, "favoriteMusic"),
          where("place", "==", this.getplace)
        )
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.result.push(doc.data())
          // console.log(doc.id, " => ", doc.data())
        })
        console.log(this.result)
        console.log(typeof this.result)
      } else {
        this.result = []
        const q = query(
          collection(db, "favoriteMusic"),
          where("place", "==", this.getplace)
        )
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.result.push(doc.data())
          // console.log(doc.id, " => ", doc.data())
        })
        console.log(this.result)
        console.log(typeof this.result)
      }
    },
  },
}
</script>

<style>
body {
  background-color: rgb(222, 207, 195);
}

.button {
  flex-grow: 1;
  list-style: none;
  text-align: center;
  cursor: pointer;
  border-radius: 25%;
  box-shadow: 8px 7px 7px 5px rgb(44 48 49 / 45%);
  width: 30%;
  height: 50%;
  padding: 2vh;
}

.Trackimg {
  flex-grow: 1;
  list-style: none;
  text-align: center;
  cursor: pointer;
  border-radius: 25%;
  box-shadow: 8px 9px 10px 5px rgb(44 48 49 / 45%);
  width: 30vh;
  height: 30vh;
  padding: 2vh;
}
</style>
