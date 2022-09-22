import { createRouter, createWebHistory } from "vue-router"
import SignIn from "../views/SignIn.vue"
import SignUp from "../views/SignUp.vue"
import SpotifyAPI from "../views/SpotifyAPI"
import MusicAnalysis from "../views/MusicAnalysis"

const routes = [
  {
    path: "/",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/SpotifyAPI",
    name: "SpotifyAPI",
    component: SpotifyAPI,
    props: (route) => {
      return { routeParams: route.query }
    },
  },
  {
    path: "/MusicAnalysis",
    name: "MusicAnalysis",
    component: MusicAnalysis,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
