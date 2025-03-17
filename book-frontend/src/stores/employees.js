import { defineStore } from "pinia";
import axios from "axios";

export const useNhanVienStore = defineStore("nhanVienStore", {
  state: () => ({
    employees: [],
  }),
  actions: {
    async fetchEmployees() {
      const res = await axios.get("http://localhost:3000/api/nhanvien/account");
      this.employees = res.data;
    },

    async addEmployee(employee) {
      await axios.post("http://localhost:3000/api/nhanvien/register", employee);
      await this.fetchEmployees();
    },

    async updateEmployee(employee) {
      await axios.put(`http://localhost:3000/api/nhanvien/account/${employee._id}`, employee);
      await this.fetchEmployees();
    },

    async deleteEmployee(id) {
      await axios.delete(`http://localhost:3000/api/nhanvien/account/${id}`);
      await this.fetchEmployees();
    },
  },
});
