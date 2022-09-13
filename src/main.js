import { createApp } from "vue"
import App from "./App.vue"
import "./firebase.js"
import router from "./router"
// import axios from "axios" //追記
// import VueAxios from "vue-axios"

// createApp(App).use(router).mount("#app")
// createApp(App).use(router, VueAxios, axios).mount("#app")
// ここあっているか不安
const app = createApp(App)
app.use(router)
app.mount("#app")
