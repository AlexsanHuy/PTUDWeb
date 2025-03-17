<template>
  <div class="container mt-4">
    <h1 class="mb-4 text-center">👤 Thông Tin Cá Nhân</h1>

    <div v-if="errorMessage" class="alert alert-danger text-center">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="alert alert-success text-center">
      {{ successMessage }}
    </div>

    <div class="card shadow-lg p-4">
      <div class="row">
        <div class="col-md-6">
          <label class="form-label fw-bold">
            <i class="fas fa-user"></i> Họ Lót
          </label>
          <input v-model="user.hoLot" type="text" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">
            <i class="fas fa-user"></i> Tên
          </label>
          <input v-model="user.ten" type="text" class="form-control" />
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <label class="form-label fw-bold">📅 Ngày Sinh</label>
          <input v-model="user.ngaySinh" type="date" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">⚧ Giới Tính</label>
          <select v-model="user.gioiTinh" class="form-control">
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <label class="form-label fw-bold">🏠 Địa Chỉ</label>
          <input v-model="user.diaChi" type="text" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">📱 Số Điện Thoại</label>
          <input v-model="user.sdt" type="text" class="form-control" />
        </div>
      </div>

      <div class="text-center mt-4">
        <button class="btn btn-primary" @click="updateProfile">
          💾 Cập Nhật
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const user = ref({
  hoLot: "",
  ten: "",
  ngaySinh: "",
  gioiTinh: "Nam",
  diaChi: "",
  sdt: "",
});

const successMessage = ref("");
const errorMessage = ref("");

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const fetchUserProfile = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/docgia/account/" +
        localStorage.getItem("userId")
    );
    user.value = response.data;
    user.value.ngaySinh = formatDateForInput(user.value.ngaySinh);
  } catch (error) {
    errorMessage.value = "⚠️ Không thể tải thông tin!";
  }
};

const updateProfile = async () => {
  try {
    const updatedUser = { ...user.value };
    updatedUser.ngaySinh = new Date(updatedUser.ngaySinh).toISOString();

    await axios.put(
      "http://localhost:3000/api/docgia/account/" +
        localStorage.getItem("userId"),
      updatedUser
    );

    successMessage.value = "✅ Cập nhật thành công!";
    setTimeout(() => (successMessage.value = ""), 3000);
  } catch (error) {
    errorMessage.value = "⚠️ Cập nhật thất bại!";
  }
};

onMounted(() => {
  fetchUserProfile();
});
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: auto;
}
</style>
