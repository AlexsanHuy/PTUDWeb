<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow">
    <div class="container">
      <RouterLink to="/home" class="navbar-brand d-flex align-items-center">
        <i class="fas fa-book me-2 text-white"></i>
        <span class="fw-bold">Hệ Thống Mượn Sách</span>
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li v-if="isLoggedIn">
            <RouterLink to="/home" class="nav-link"
              ><i class="fas fa-book-open"></i> Mượn Sách</RouterLink
            >
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <RouterLink to="/profile" class="nav-link"
              ><i class="fas fa-user"></i> Thông tin cá nhân</RouterLink
            >
          </li>

          <li v-if="isLoggedIn" class="nav-item">
            <RouterLink to="/history" class="nav-link"
              ><i class="fas fa-history"></i> Lịch sử mượn</RouterLink
            >
          </li>

          <template v-if="isLoggedIn">
            <li class="nav-item">
              <span class="nav-link fade-in">
                <i class="fas fa-user"></i> Xin chào, {{ userName }}</span
              >
            </li>
            <li class="nav-item">
              <button class="btn btn-danger btn-sm ms-2" @click="logout">
                <i class="fas fa-sign-out-alt"></i> Đăng xuất
              </button>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);
const userName = ref("");

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem("token");
  userName.value = localStorage.getItem("userName") || "";
};

onMounted(() => {
  checkLoginStatus();
  window.addEventListener("storage", checkLoginStatus);
});

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  isLoggedIn.value = false;
  router.push("/");
};
</script>

<style scoped>
.logo {
  width: 35px;
  height: 35px;
}

.fade-in {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-link {
  transition: all 0.3s ease-in-out;
}

.nav-link:hover {
  color: #007bff !important;
  transform: scale(1.05);
}

.btn-outline-light:hover {
  background: #007bff !important;
  color: white !important;
  border-color: #007bff !important;
}
</style>
