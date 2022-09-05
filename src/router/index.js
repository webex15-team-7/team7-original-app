import { createRouter, createWebHistory } from "vue-router"
import SignIn from "../views/SignIn.vue"
import SignUp from "../views/SignUp.vue"

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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
