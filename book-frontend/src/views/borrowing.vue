<template>
  <div class="container mt-4">
    <h1 class="mb-4"><i class="fas fa-exchange-alt"></i> Theo Dõi Mượn Sách</h1>

    <div class="input-group mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="🔍 Tìm kiếm..."
      />
    </div>

    <h3><i class="fas fa-book"></i> Danh Sách Mượn Sách</h3>
    <table class="table table-bordered table-striped text-center">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Độc Giả</th>
          <th>Sách</th>
          <th>Ngày Mượn</th>
          <th>Ngày Trả</th>
          <th>Trạng Thái</th>
          <th>Xác Nhận Trả</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(borrow, index) in filteredBorrowings" :key="borrow._id">
          <td>{{ index + 1 }}</td>
          <td>{{ borrow.maDocGia?.hoLot }} {{ borrow.maDocGia?.ten }}</td>
          <td>{{ borrow.maSach?.tenSach }}</td>
          <td>{{ formatDate(borrow.ngayMuon) }}</td>
          <td>{{ formatDate(borrow.ngayTra) }}</td>
          <td>
            <span class="badge" :class="statusClass(borrow.trangThai)">
              {{ borrow.trangThai }}
            </span>
          </td>
          <td>
            <button
              v-if="
                borrow.trangThai !== 'Đã trả' &&
                borrow.trangThai !== 'Đang mượn'
              "
              class="btn btn-primary btn-sm mx-2"
              @click="confirmBorrowing(borrow)"
            >
              <i class="fas fa-check"></i> Xác Nhận
            </button>
            <button
              v-if="borrow.trangThai !== 'Đã trả'"
              class="btn btn-success btn-sm"
              @click="markAsReturned(borrow)"
            >
              <i class="fas fa-check"></i> Đã Trả
            </button>
            <button
              v-if="borrow.trangThai === 'Đã trả'"
              class="btn btn-danger btn-sm"
              @click="deleteBorrowing(borrow)"
            >
              <i class="fas fa-trash"></i> Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const borrowings = ref([]);
const searchQuery = ref("");

onMounted(async () => {
  await fetchBorrowings();
});

const fetchBorrowings = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/muonsach/muon");
    if (Array.isArray(response.data)) {
      borrowings.value = response.data.map((borrow) => ({
        ...borrow,
        maDocGia: borrow.maDocGia || {},
        maSach: borrow.maSach || {},
      }));
    } else {
      console.error("Dữ liệu trả về không hợp lệ:", response.data);
    }
  } catch (error) {
    console.error("Lỗi tải danh sách mượn sách:", error);
  }
};

const confirmBorrowing = async (borrow) => {
  try {
    borrow.trangThai = "Đang mượn";
    await axios.put(`http://localhost:3000/api/muonsach/muon/${borrow._id}`, {
      trangThai: "Đang mượn",
    });
    await axios.put(`http://localhost:3000/api/sach/${borrow.maSach._id}`, {
      $inc: { soLuong: -1 },
    });
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error);
  }
};

const markAsReturned = async (borrow) => {
  try {
    borrow.trangThai = "Đã trả";
    await axios.put(`http://localhost:3000/api/muonsach/muon/${borrow._id}`, {
      ngayTra: Date.now(),
      trangThai: "Đã trả",
    });
    await axios.put(`http://localhost:3000/api/sach/${borrow.maSach._id}`, {
      $inc: { soLuong: 1 },
    });
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error);
  }
};

const deleteBorrowing = async (borrow) => {
  try {
    await axios.delete(`http://localhost:3000/api/muonsach/muon/${borrow._id}`);
    await fetchBorrowings();
  } catch (error) {
    console.error("Lỗi xóa mượn sách:", error);
  }
};

const filteredBorrowings = computed(() => {
  return borrowings.value.filter(
    (borrow) =>
      (borrow.maDocGia?.hoLot || "")
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      (borrow.maDocGia?.ten || "")
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      (borrow.maSach?.tenSach || "")
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
  );
});

const formatDate = (dateString) => {
  return dateString ? new Date(dateString).toLocaleDateString("vi-VN") : "N/A";
};

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

.btn-success {
  transition: all 0.3s ease-in-out;
}
.btn-success:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
