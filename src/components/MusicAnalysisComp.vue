<template>
  <div>ああああああ</div>
  <div>
    <selectedMusic @my-click="onedMusic = $event" />
    {{ oneMusic }}
    <div>aaaa</div>
    <button @click="button">コンソール</button>
  </div>
</template>

<script>
import selectedMusic from "./SpotifyAPIcomp.vue"

export default {
  components: {
    selectedMusic,
  },

  data: function () {
    return {
      selectedMusic: [],
    }
  },
  // props: {
  //   selectedMusic: Object,
  // },
  methods: {
    button() {
      console.log(selectedMusic)
    },
  },
}
</script>
