<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="width: 400px">
      <h3 class="text-center">
        {{ isRegister ? "📝 Đăng Ký Admin" : "🔐 Đăng Nhập Admin" }}
      </h3>

      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="alert alert-success">
        {{ successMessage }}
      </div>

      <div v-if="isRegister">
        <div class="mb-2">
          <label class="form-label"><i class="fas fa-user"></i> Họ Tên</label>
          <input
            v-model="registerForm.hoTen"
            type="text"
            class="form-control"
            placeholder="Nhập họ tên"
          />
        </div>
        <div class="mb-2">
          <label class="form-label"
            ><i class="fas fa-map-marker-alt"></i> Địa Chỉ</label
          >
          <input
            v-model="registerForm.diaChi"
            type="text"
            class="form-control"
            placeholder="Nhập địa chỉ"
          />
        </div>
        <div class="mb-2">
          <label class="form-label"
            ><i class="fas fa-briefcase"></i> Chức Vụ</label
          >
          <select v-model="registerForm.chucVu" class="form-control">
            <option value="Admin">Admin</option>
            <option value="Nhân viên">Nhân viên</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="form-label"
            ><i class="fas fa-phone"></i> Số Điện Thoại</label
          >
          <input
            v-model="registerForm.sdt"
            type="text"
            class="form-control"
            placeholder="Nhập số điện thoại"
          />
        </div>
        <div class="mb-2">
          <label class="form-label"><i class="fas fa-lock"></i> Mật Khẩu</label>
          <input
            v-model="registerForm.matKhau"
            type="password"
            class="form-control"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <button class="btn btn-success w-100 mb-2" @click="handleRegister">
          Đăng Ký
        </button>
        <p class="text-center">
          Đã có tài khoản?
          <a href="#" @click.prevent="isRegister = false">Đăng nhập</a>
        </p>
      </div>

      <div v-else>
        <div class="mb-3">
          <label class="form-label"
            ><i class="fas fa-phone"></i> Số Điện Thoại</label
          >
          <input
            v-model="loginForm.sdt"
            type="text"
            class="form-control"
            placeholder="Nhập số điện thoại"
          />
        </div>
        <div class="mb-3">
          <label class="form-label"><i class="fas fa-lock"></i> Mật Khẩu</label>
          <input
            v-model="loginForm.matKhau"
            type="password"
            class="form-control"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <button class="btn btn-primary w-100 mb-2" @click="handleLogin">
          Đăng Nhập
        </button>
        <p class="text-center">
          Bạn là Admin?
          <a href="#" @click.prevent="isRegister = true">Đăng ký Admin</a>
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

const loginForm = ref({
  sdt: "",
  matKhau: "",
});

const registerForm = ref({
  hoTen: "",
  diaChi: "",
  chucVu: "Nhân viên",
  sdt: "",
  matKhau: "",
});

const handleLogin = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  try {
    const response = await axios.post(
      "http://localhost:3000/api/nhanvien/login",
      loginForm.value
    );
    localStorage.setItem("adminToken", response.data.token);
    router.push("/dashboard");
  } catch (error) {
    errorMessage.value = "⚠️ Số điện thoại hoặc mật khẩu không đúng!";
  }
};

const handleRegister = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  try {
    await axios.post(
      "http://localhost:3000/api/nhanvien/register",
      registerForm.value
    );
    successMessage.value = "✅ Đăng ký Admin thành công! Hãy đăng nhập.";
    isRegister.value = false;
  } catch (error) {
    errorMessage.value = "⚠️ Đăng ký thất bại. Vui lòng kiểm tra lại!";
  }
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
}
</style>
