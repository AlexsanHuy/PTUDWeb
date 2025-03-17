<template>
  <div class="container mt-4">
    <h1 class="mb-4 text-center">
      <i class="fas fa-book-open"></i> Hệ Thống Mượn Sách
    </h1>

    <div class="input-group mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="🔍 Tìm kiếm sách..."
      />
    </div>

    <h3><i class="fas fa-book"></i> Danh Sách Sách</h3>
    <table class="table table-bordered table-striped">
      <thead class="table-dark text-center">
        <tr>
          <th>#</th>
          <th>Tên Sách</th>
          <th>Đơn Giá</th>
          <th>NXB</th>
          <th>Năm XB</th>
          <th>Số Lượng Còn</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in paginatedBooks" :key="book._id">
          <td class="text-center">
            {{ index + 1 + (currentPage - 1) * itemsPerPage }}
          </td>
          <td>{{ book.tenSach }}</td>
          <td class="text-end">{{ formatCurrency(book.donGia) }}</td>
          <td class="text-center">{{ getNXB(book.maNXB) }}</td>
          <td class="text-center">{{ book.namXuatBan }}</td>
          <td class="text-center">{{ book.soLuong }}</td>
          <td class="text-center">
            <button
              class="btn btn-primary btn-sm"
              @click="borrowBook(book._id)"
              :disabled="book.soLuong === 0"
            >
              <i class="fas fa-book-open"></i> Mượn
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation" class="mt-3">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage">⬅️ Trước</button>
        </li>

        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <button class="page-link" @click="setPage(page)">{{ page }}</button>
        </li>

        <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
          <button class="page-link" @click="nextPage">Tiếp ➡️</button>
        </li>
      </ul>
    </nav>

    <hr />

    <h3><i class="fas fa-book"></i> Sách Đang Mượn</h3>
    <table class="table table-bordered table-striped">
      <thead class="table-warning text-center">
        <tr>
          <th>#</th>
          <th>Tên Sách</th>
          <th>Ngày Mượn</th>
          <th>Hạn Trả</th>
          <th>Trạng Thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(borrow, index) in borrowedBooks" :key="borrow._id">
          <td v-if="borrow.trangThai === 'Đang mượn'" class="text-center">
            {{ index + 1 }}
          </td>
          <td v-if="borrow.trangThai === 'Đang mượn'">
            {{ borrow.maSach.tenSach }}
          </td>
          <td v-if="borrow.trangThai === 'Đang mượn'" class="text-center">
            {{ formatDate(borrow.ngayMuon) }}
          </td>
          <td v-if="borrow.trangThai === 'Đang mượn'" class="text-center">
            {{ formatDate(borrow.ngayTra) }}
          </td>
          <td v-if="borrow.trangThai === 'Đang mượn'" class="text-center">
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
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const books = ref([]);
const borrowedBooks = ref([]);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(5);
const nxbList = ref([]);

onMounted(async () => {
  await fetchBooks();
  await fetchBorrowedBooks();
  await getlistNXB();
});

const fetchBooks = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/sach/list");
    books.value = response.data;
  } catch (error) {
    console.error("Lỗi tải sách:", error);
  }
};

const fetchBorrowedBooks = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/muonsach/muon/" +
        localStorage.getItem("userId")
    );
    borrowedBooks.value = response.data;
  } catch (error) {
    console.error("Lỗi tải sách đã mượn:", error);
  }
};

const filteredBooks = computed(() => {
  return books.value.filter((book) =>
    book.tenSach.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredBooks.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() =>
  Math.ceil(filteredBooks.value.length / itemsPerPage.value)
);

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const setPage = (page) => {
  currentPage.value = page;
};

const borrowBook = async (bookId) => {
  try {
    await axios.post(
      "http://localhost:3000/api/muonsach/muon/" +
        localStorage.getItem("userId") +
        "/" +
        bookId,
      {
        maDocGia: localStorage.getItem("userId"),
        maSach: bookId,
        ngayTra: new Date(new Date().setDate(new Date().getDate() + 14)),
        trangThai: "Chờ xác nhận",
      }
    );
    alert("Chờ xác nhận yêu cầu!");
    await fetchBooks();
    await fetchBorrowedBooks();
  } catch (error) {
    console.error("Lỗi mượn sách:", error);
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

const getlistNXB = async () => {
  const response = await axios.get("http://localhost:3000/api/nxb/list");
  nxbList.value = response.data;
};

const getNXB = (maNXB) => {
  const nxb = nxbList.value.find((nxb) => nxb._id === maNXB);
  return nxb ? nxb.tenNXB : "Không xác định";
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}

.pagination .page-item.active .page-link {
  background-color: white;
  border-color: black;
}

.pagination .page-link {
  color: #007bff;
  transition: all 0.3s ease-in-out;
}

.pagination .page-link:hover {
  background-color: #0056b3;
  color: blue;
}
</style>
