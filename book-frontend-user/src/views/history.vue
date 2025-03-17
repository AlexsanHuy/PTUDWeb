<template>
  <div class="container mt-4">
    <h1 class="mb-4 text-center">
      <i class="fas fa-history"></i> Lịch Sử Mượn Sách
    </h1>

    <table class="table table-bordered table-striped">
      <thead class="table-warning text-center">
        <tr>
          <th>#</th>
          <th>Tên Sách</th>
          <th>Ngày Mượn</th>
          <th>Ngày Trả</th>
          <th>Trạng Thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(borrow, index) in borrowHistory" :key="borrow._id">
          <td class="text-center">{{ index + 1 }}</td>
          <td>{{ borrow.maSach.tenSach }}</td>
          <td class="text-center">{{ formatDate(borrow.ngayMuon) }}</td>
          <td class="text-center">{{ formatDate(borrow.ngayTra) }}</td>
          <td class="text-center">
            <span class="badge" :class="statusClass(borrow.trangThai)">
              {{ borrow.trangThai }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const borrowHistory = ref([]);

onMounted(async () => {
  await fetchBorrowHistory();
});

const fetchBorrowHistory = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/muonsach/muon/" +
        localStorage.getItem("userId")
    );
    borrowHistory.value = response.data;
  } catch (error) {
    console.error("Lỗi tải lịch sử mượn sách:", error);
  }
};

const formatDate = (date) => new Date(date).toLocaleDateString("vi-VN");

const statusClass = (status) => {
  return {
    "bg-primary text-white": status === "Chờ xác nhận",
    "bg-success text-white": status === "Đã trả",
    "bg-warning text-dark": status === "Đang mượn",
    "bg-danger text-white": status === "Quá hạn",
  };
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
