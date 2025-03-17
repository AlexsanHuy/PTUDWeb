<template>
  <div class="container mt-4">
    <h1 class="mb-4"><i class="fas fa-building"></i> Quản lý Nhà Xuất Bản</h1>

    <div class="input-group mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="🔍 Tìm kiếm nhà xuất bản..."
      />
    </div>

    <button class="btn btn-primary mb-3" @click="openModal">
      ➕ Thêm Nhà Xuất Bản
    </button>

    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Tên Nhà Xuất Bản</th>
          <th>Địa Chỉ</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(publisher, index) in filteredPublishers"
          :key="publisher._id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ publisher.tenNXB }}</td>
          <td>{{ publisher.diaChi }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              @click="editPublisher(publisher)"
            >
              <i class="fas fa-pencil-alt"></i> Sửa
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="deletePublisher(publisher._id)"
            >
              <i class="fas fa-trash"></i> Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="publisherModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditing ? "Sửa Nhà Xuất Bản" : "Thêm Nhà Xuất Bản" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <input
              v-model="publisherForm.tenNXB"
              type="text"
              class="form-control mb-2"
              placeholder="Tên Nhà Xuất Bản"
            />
            <input
              v-model="publisherForm.diaChi"
              type="text"
              class="form-control mb-2"
              placeholder="Địa Chỉ"
            />
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" @click="savePublisher">
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
import { useNXBStore } from "@/stores/publishers";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const nxbStore = useNXBStore();
const publishers = ref([]);
const searchQuery = ref("");
const isEditing = ref(false);
const publisherForm = ref({ _id: "", tenNXB: "", diaChi: "" });
let modalInstance = null;

onMounted(async () => {
  await nxbStore.fetchNXB();
  publishers.value = nxbStore.publishers;
  modalInstance = new bootstrap.Modal(
    document.getElementById("publisherModal")
  );
});

const filteredPublishers = computed(() => {
  return publishers.value.filter(
    (publisher) =>
      publisher.tenNXB
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      publisher.diaChi.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const openModal = () => {
  publisherForm.value = { _id: "", tenNXB: "", diaChi: "" };
  isEditing.value = false;
  modalInstance.show();
};

const editPublisher = (publisher) => {
  publisherForm.value = { ...publisher };
  isEditing.value = true;
  modalInstance.show();
};

const savePublisher = async () => {
  if (isEditing.value) {
    await nxbStore.updateNXB(publisherForm.value);
  } else {
    await nxbStore.addNXB(publisherForm.value);
  }
  await nxbStore.fetchNXB();
  publishers.value = nxbStore.publishers;
  modalInstance.hide();
};

const deletePublisher = async (id) => {
  await nxbStore.deleteNXB(id);
  await nxbStore.fetchNXB();
  publishers.value = nxbStore.publishers;
};
</script>
