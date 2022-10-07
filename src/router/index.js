import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import HomeView from "../views/HomeView.vue";
import Navigation from "../components/home/Navigation.vue";
import ArknightsView from "../views/ArknightsView.vue";
import General from "../components/arknights/General.vue";
import Gacha from "../components/arknights/Gacha.vue";
import Diamond from "../components/arknights/Diamond.vue";
import Order from "../components/arknights/Order.vue";
import axios from "axios";

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
        },
        {
          path: 'gacha',
          component: Gacha
        },
        {
          path: 'diamond',
          component: Diamond
        },
        {
          path: 'order',
          component: Order
        }
      ]
    }
  ],
});

router.beforeEach((to, from, next)=>{
  if (to.meta.auth){
    signinLocalCheck().then(res=>{
      if (!res){
        next({
          path: '/',
          query: { redirect: to.fullPath },
        })
      }else {
        next()
      }
    })
  }else {
    next()
  }
})

export default router;

export async function signinLocalCheck(){
  let ret = false
  let token = localStorage.getItem('token')
  if(localStorage.getItem('token') !== null
      && localStorage.getItem('username') !== null){
    await axios({
      url: '/user-api/user/auth/status',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    }).then(res=>{
      if (res.data.code===0){
        ret = true
      }
    })
  }
  return ret
}
