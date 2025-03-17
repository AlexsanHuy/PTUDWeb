<template>
  <div
    class="auth-container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card p-5 shadow-lg rounded login-card">
      <h3 class="text-center mb-3 fw-bold">
        {{ isRegister ? "📝 Đăng Ký" : "🔐 Đăng Nhập" }}
      </h3>

      <transition name="fade">
        <div v-if="errorMessage" class="alert alert-danger text-center">
          {{ errorMessage }}
        </div>
      </transition>
      <transition name="fade">
        <div v-if="successMessage" class="alert alert-success text-center">
          {{ successMessage }}
        </div>
      </transition>

      <div v-if="isRegister">
        <div class="input-group mb-2">
          <span class="input-group-text"><i class="fas fa-user"></i></span>
          <input
            v-model="registerForm.hoLot"
            type="text"
            class="form-control"
            placeholder="Họ Lót"
          />
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text"><i class="fas fa-user"></i></span>
          <input
            v-model="registerForm.ten"
            type="text"
            class="form-control"
            placeholder="Tên"
          />
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text"
            ><i class="fas fa-calendar-alt"></i
          ></span>
          <input
            v-model="registerForm.ngaySinh"
            type="date"
            class="form-control"
          />
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text"
            ><i class="fas fa-venus-mars"></i
          ></span>
          <select v-model="registerForm.gioiTinh" class="form-control">
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text"
            ><i class="fas fa-map-marker-alt"></i
          ></span>
          <input
            v-model="registerForm.diaChi"
            type="text"
            class="form-control"
            placeholder="Địa Chỉ"
          />
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text"><i class="fas fa-phone"></i></span>
          <input
            v-model="registerForm.sdt"
            type="text"
            class="form-control"
            placeholder="Số Điện Thoại"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="fas fa-key"></i></span>
          <input
            v-model="registerForm.matKhau"
            type="password"
            class="form-control"
            placeholder="Mật khẩu"
          />
        </div>

        <button
          class="btn btn-primary w-100 mb-2 shadow-sm btn-hover"
          @click="handleRegister"
        >
          Đăng Ký
        </button>
        <p class="text-center">
          Đã có tài khoản? <a href="#" @click.prevent="toggleForm">Đăng nhập</a>
        </p>
      </div>

      <div v-else>
        <div class="input-group mb-2">
          <span class="input-group-text"><i class="fas fa-phone"></i></span>
          <input
            v-model="loginForm.sdt"
            type="text"
            class="form-control"
            placeholder="Số Điện Thoại"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="fas fa-key"></i></span>
          <input
            v-model="loginForm.matKhau"
            type="password"
            class="form-control"
            placeholder="Mật Khẩu"
          />
        </div>

        <button
          class="btn btn-success w-100 mb-2 shadow-sm btn-hover"
          @click="handleLogin"
        >
          Đăng Nhập
        </button>
        <p class="text-center">
          Chưa có tài khoản?
          <a href="#" @click.prevent="toggleForm">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const isRegister = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const loginForm = ref({ sdt: "", matKhau: "" });
const registerForm = ref({
  hoLot: "",
  ten: "",
  ngaySinh: "",
  gioiTinh: "Nam",
  diaChi: "",
  sdt: "",
  matKhau: "",
});

const toggleForm = () => {
  isRegister.value = !isRegister.value;
  errorMessage.value = "";
  successMessage.value = "";
};

const handleLogin = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const response = await axios.post(
      "http://localhost:3000/api/docgia/login",
      loginForm.value
    );
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.userId);
    localStorage.setItem("userName", response.data.userName);
    router.push("/home");
  } catch (error) {
    errorMessage.value = "⚠️ Số điện thoại hoặc mật khẩu không đúng!";
  }
};

const handleRegister = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  try {
    await axios.post(
      "http://localhost:3000/api/docgia/register",
      registerForm.value
    );
    successMessage.value = "✅ Đăng ký thành công! Hãy đăng nhập.";
    isRegister.value = false;
  } catch (error) {
    errorMessage.value = "⚠️ Đăng ký thất bại. Vui lòng kiểm tra lại!";
  }
};
</script>

<style scoped>
.auth-container {
  background: url("@/assets/background.jpg") no-repeat center center;
  background-size: cover;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 30px;
}

.btn-hover {
  transition: all 0.3s ease-in-out;
}
.btn-hover:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
