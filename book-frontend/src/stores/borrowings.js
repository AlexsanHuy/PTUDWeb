import { defineStore } from "pinia";
import axios from "axios";

export const useMuonSachStore = defineStore("muonSachStore", {
  state: () => ({
    borrowings: [],
  }),
  actions: {
    async fetchBorrowings() {
      const res = await axios.get("http://localhost:3001/api/muonsach/");
      this.borrowings = res.data;
    },

    async addBorrowing(borrowing) {
      await axios.post("http://localhost:3001/api/muonsach/", borrowing);
      await this.fetchBorrowings();
    },

    async updateBorrowing(borrowing) {
      await axios.put(
        `http://localhost:3001/api/muonsach/${borrowing._id}`,
        borrowing
      );
      await this.fetchBorrowings();
    },

    async deleteBorrowing(id) {
      await axios.delete(`http://localhost:3001/api/muonsach/${id}`);
      await this.fetchBorrowings();
    },
  },
});
