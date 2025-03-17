<template>
  <div class="container mt-4">
    <h1 class="mb-4"><i class="fas fa-user-tie"></i> Quản lý Nhân Viên</h1>

    <!-- Thanh tìm kiếm -->
    <div class="input-group mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="🔍 Tìm kiếm nhân viên..."
      />
    </div>

    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Họ Tên</th>
          <th>Chức Vụ</th>
          <th>Địa Chỉ</th>
          <th>Mật Khẩu</th>
          <th>Số Điện Thoại</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in filteredEmployees" :key="employee._id">
          <td>{{ index + 1 }}</td>
          <td>{{ employee.hoTen }}</td>
          <td>{{ employee.chucVu }}</td>
          <td>{{ employee.diaChi }}</td>
          <td>{{ employee.matKhau }}</td>
          <td>{{ employee.sdt }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              @click="editEmployee(employee)"
            >
              <i class="fas fa-pencil-alt"></i> Sửa
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteEmployee(employee._id)"
            >
              <i class="fas fa-trash"></i> Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="employeeModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditing ? "Sửa Nhân Viên" : "Thêm Nhân Viên" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <input
              v-model="employeeForm.hoTen"
              type="text"
              class="form-control mb-2"
              placeholder="Họ Tên"
            />
            <input
              v-model="employeeForm.chucVu"
              type="text"
              class="form-control mb-2"
              placeholder="Chức Vụ"
            />
            <input
              v-model="employeeForm.diaChi"
              type="text"
              class="form-control mb-2"
              placeholder="Địa Chỉ"
            />
            <input
              v-model="employeeForm.sdt"
              type="text"
              class="form-control mb-2"
              placeholder="Số Điện Thoại"
            />
            <input
              v-model="employeeForm.matKhau"
              type="password"
              class="form-control mb-2"
              placeholder="Mật khẩu"
              v-if="!isEditing"
            />
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" @click="saveEmployee">
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
import { useNhanVienStore } from "@/stores/employees";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const nhanVienStore = useNhanVienStore();
const employees = ref([]);
const searchQuery = ref("");
const isEditing = ref(false);
const employeeForm = ref({
  _id: "",
  hoTen: "",
  chucVu: "",
  sdt: "",
  matKhau: "",
  diaChi: "",
});
let modalInstance = null;

onMounted(async () => {
  await nhanVienStore.fetchEmployees();
  employees.value = nhanVienStore.employees;
  modalInstance = new bootstrap.Modal(document.getElementById("employeeModal"));
});

const filteredEmployees = computed(() => {
  return employees.value.filter(
    (employee) =>
      employee.hoTen.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      employee.chucVu.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      employee.diaChi.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const openModal = () => {
  employeeForm.value = {
    _id: "",
    hoTen: "",
    chucVu: "",
    sdt: "",
    matKhau: "",
    diaChi: "",
  };
  isEditing.value = false;
  modalInstance.show();
};

const editEmployee = (employee) => {
  employeeForm.value = { ...employee };
  isEditing.value = true;
  modalInstance.show();
};

const saveEmployee = async () => {
  if (isEditing.value) {
    await nhanVienStore.updateEmployee(employeeForm.value);
  } else {
    await nhanVienStore.addEmployee(employeeForm.value);
  }
  await nhanVienStore.fetchEmployees();
  employees.value = nhanVienStore.employees;
  modalInstance.hide();
};

const deleteEmployee = async (id) => {
  await nhanVienStore.deleteEmployee(id);
  await nhanVienStore.fetchEmployees();
  employees.value = nhanVienStore.employees;
};
</script>
