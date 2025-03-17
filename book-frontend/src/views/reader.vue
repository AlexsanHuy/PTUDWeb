<template>
  <div class="container mt-4">
    <h1 class="mb-4"><i class="fas fa-user-circle"></i> Quản lý Đọc Giả</h1>

    <div class="input-group mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="🔍 Tìm kiếm đọc giả..."
      />
    </div>

    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Họ Lót</th>
          <th>Tên</th>
          <th>Ngày Sinh</th>
          <th>Giới Tính</th>
          <th>Địa Chỉ</th>
          <th>Số Điện Thoại</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reader, index) in filteredReaders" :key="reader._id">
          <td>{{ index + 1 }}</td>
          <td>{{ reader.hoLot }}</td>
          <td>{{ reader.ten }}</td>
          <td>{{ formatDate(reader.ngaySinh) }}</td>
          <td>{{ reader.gioiTinh }}</td>
          <td>{{ reader.diaChi }}</td>
          <td>{{ reader.sdt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDocGiaStore } from "@/stores/readers";

const docGiaStore = useDocGiaStore();
const readers = ref([]);
const searchQuery = ref("");

onMounted(async () => {
  await docGiaStore.fetchReaders();
  readers.value = docGiaStore.readers;
});

const filteredReaders = computed(() => {
  return readers.value.filter(
    (reader) =>
      reader.hoLot.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      reader.ten.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
};
</script>
