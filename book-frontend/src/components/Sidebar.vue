<template>
  <div class="sidebar">
    <h4 class="text-center logo">
      <i class="fas fa-book"></i> Quản lý Thư Viện
    </h4>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item" v-for="item in menuItems" :key="item.to">
        <RouterLink
          :to="item.to"
          class="nav-link"
          :class="{ active: $route.path === item.to }"
        >
          <i :class="item.icon"></i> {{ item.label }}
        </RouterLink>
      </li>
    </ul>
    <div class="bottom-section">
      <h4 class="text-center">Xin chào!</h4>
      <button class="btn btn-danger w-100" @click="logout">
        <i class="fas fa-sign-out-alt"></i> Đăng xuất
      </button>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: "fas fa-tachometer-alt" },
  { to: "/books", label: "Quản lý Sách", icon: "fas fa-book" },
  { to: "/readers", label: "Độc giả", icon: "fas fa-user-graduate" },
  { to: "/employees", label: "Nhân viên", icon: "fas fa-user-tie" },
  { to: "/publishers", label: "Nhà xuất bản", icon: "fas fa-building" },
  { to: "/borrowing", label: "Mượn Sách", icon: "fas fa-exchange-alt" },
];

const logout = () => {
  localStorage.removeItem("adminToken");
  router.push("/");
};
</script>

<style scoped>
/* Sidebar đẹp hơn với gradient */
.sidebar {
  width: 260px;
  height: 100vh;
  background: linear-gradient(135deg, #343a40, #212529);
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Logo */
.logo {
  font-weight: bold;
  color: #f8f9fa;
}

/* Navigation */
.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  color: white;
  transition: all 0.3s ease-in-out;
}

.nav-link:hover {
  background: #007bff;
  color: white;
  transform: scale(1.05);
}

.nav-link.active {
  background: #007bff;
  font-weight: bold;
  transform: scale(1.1);
}

.bottom-section {
  text-align: center;
}

.btn-danger {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  background: #dc3545;
  transform: scale(1.05);
}
</style>
