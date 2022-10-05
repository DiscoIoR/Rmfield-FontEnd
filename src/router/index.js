import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import HomeView from "../views/HomeView.vue";
import Navigation from "../components/home/Navigation.vue";
import ArknightsView from "../views/ArknightsView.vue";
import General from "../components/arknights/General.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      meta: {
        auth: false
      },
      component: IndexView,
    },
    {
      path: "/home",
      meta: {
        auth: true
      },
      component: HomeView,
      children: [
        {
          path: '',
          component: Navigation
        }
      ]
    },
    {
      path: "/arknights",
      meta: {
        auth: true
      },
      component: ArknightsView,
      children: [
        {
          path: 'general',
          component: General
        }
      ]
    }
  ],
});

router.beforeEach((to, from, next)=>{
  if (to.meta.auth && !signinLocalCheck()){
    next({
      path: '/',
      query: { redirect: to.fullPath },
    })
  }else {
    next()
  }
})

export default router;

export function signinLocalCheck(){
  return localStorage.getItem('token') !== null
      && localStorage.getItem('username') !== null;
}
