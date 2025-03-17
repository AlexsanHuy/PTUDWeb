<template>
  <div class="container mt-4">
    <h1 class="mb-4"><i class="fas fa-book"></i> Quản lý Sách</h1>

    <div class="input-group mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="🔍 Tìm kiếm sách..."
      />
    </div>

    <button class="btn btn-primary mb-3" @click="openModal">
      ➕ Thêm Sách
    </button>

    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Tên Sách</th>
          <th>Đơn Giá</th>
          <th>Nhà Xuất Bản</th>
          <th>Năm Xuất Bản</th>
          <th>Số Lượng</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in filteredBooks" :key="book._id">
          <td>{{ index + 1 }}</td>
          <td>{{ book.tenSach }}</td>
          <td>{{ book.donGia }}</td>
          <td>{{ getNXBName(book.maNXB) }}</td>
          <td>{{ book.namXuatBan }}</td>
          <td>{{ book.soLuong }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="editBook(book)">
              <i class="fas fa-pencil-alt"></i> Sửa
            </button>
            <button class="btn btn-danger btn-sm" @click="deleteBook(book._id)">
              <i class="fas fa-trash"></i> Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal fade" ref="modalRef" id="bookModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditing ? "Sửa Sách" : "Thêm Sách" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <input
              v-model="bookForm.tenSach"
              type="text"
              class="form-control mb-2"
              placeholder="Tên Sách"
            />
            <input
              v-model="bookForm.donGia"
              type="number"
              class="form-control mb-2"
              placeholder="Đơn Giá"
            />
            <input
              v-model="bookForm.soLuong"
              type="number"
              class="form-control mb-2"
              placeholder="Số Lượng"
            />
            <input
              v-model="bookForm.namXuatBan"
              type="number"
              class="form-control mb-2"
              placeholder="Năm Xuất Bản"
            />
            <select v-model="bookForm.maNXB" class="form-control mb-2">
              <option disabled value="">Chọn Nhà Xuất Bản</option>
              <option v-for="nxb in nxbList" :key="nxb._id" :value="nxb._id">
                {{ nxb.tenNXB }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" @click="saveBook">
              {{ isEditing ? "Cập Nhật" : "Thêm" }}
            </button>
            <button class="btn btn-secondary" data-bs-dismiss="modal">
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useSachStore } from "@/stores/books";
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const sachStore = useSachStore();
const books = ref([]);
const nxbList = ref([]);
const searchQuery = ref("");
const isEditing = ref(false);
const modalRef = ref(null);
let modalInstance = null;

const bookForm = ref({
  _id: "",
  tenSach: "",
  donGia: 0,
  soLuong: 1,
  namXuatBan: "",
  maNXB: "",
});

onMounted(async () => {
  await sachStore.fetchBooks();
  books.value = sachStore.books;
  const response = await axios.get("http://localhost:3000/api/nxb/list");
  nxbList.value = response.data;
  if (modalRef.value) {
    modalInstance = new bootstrap.Modal(modalRef.value);
  }
});

const filteredBooks = computed(() => {
  return books.value.filter(
    (book) =>
      book.tenSach.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      getNXBName(book.maNXB)
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
  );
});

const getNXBName = (maNXB) => {
  const nxb = nxbList.value.find((n) => n._id === maNXB);
  return nxb ? nxb.tenNXB : "Không xác định";
};

const openModal = () => {
  bookForm.value = {
    _id: "",
    tenSach: "",
    donGia: 0,
    soLuong: 1,
    namXuatBan: "",
    maNXB: "",
  };
  isEditing.value = false;
  modalInstance.show();
};

const editBook = (book) => {
  bookForm.value = { ...book };
  isEditing.value = true;
  modalInstance.show();
};

const saveBook = async () => {
  if (isEditing.value) {
    await sachStore.updateBook(bookForm.value);
  } else {
    await sachStore.addBook(bookForm.value);
  }
  await sachStore.fetchBooks();
  books.value = sachStore.books;
  modalInstance.hide();
};

const deleteBook = async (id) => {
  await sachStore.deleteBook(id);
  await sachStore.fetchBooks();
  books.value = sachStore.books;
};
</script>
