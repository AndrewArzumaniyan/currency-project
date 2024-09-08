import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ConvertVue from "@/views/ConvertVue.vue";


const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/convert',
    component: ConvertVue
  }
]


export default createRouter({
  routes,
  history: createWebHistory()
})