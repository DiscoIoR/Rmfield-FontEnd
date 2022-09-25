import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import HomeView from "../views/HomeView.vue";
import Navigation from "../components/navigation/Navigation.vue";
import ArknightsView from "../views/ArknightsView.vue";
import General from "../components/arknights/General.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: IndexView,
    },
    {
      path: "/home",
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

export default router;
