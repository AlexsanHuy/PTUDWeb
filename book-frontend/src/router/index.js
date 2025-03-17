import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/dashboard.vue";
import Books from "@/views/book.vue";
import Readers from "@/views/reader.vue";
import Employees from "@/views/employee.vue";
import Publishers from "@/views/publisher.vue";
import Borrowing from "@/views/borrowing.vue";
import AdminLogin from "@/views/adminlogin.vue";

const routes = [
  { path: "/", component: AdminLogin },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/books", component: Books, meta: { requiresAuth: true } },
  { path: "/readers", component: Readers, meta: { requiresAuth: true } },
  { path: "/employees", component: Employees, meta: { requiresAuth: true } },
  { path: "/publishers", component: Publishers, meta: { requiresAuth: true } },
  { path: "/borrowing", component: Borrowing, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("adminToken");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
