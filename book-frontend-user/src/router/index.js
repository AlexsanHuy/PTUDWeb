import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login.vue";
import Home from "@/views/book.vue";
import Profile from "@/views/profile.vue";
import History from "@/views/history.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/home", component: Home, meta: { requiresAuth: true } },
  { path: "/profile", component: Profile, meta: { requiresAuth: true } },
  { path: "/history", component: History, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
