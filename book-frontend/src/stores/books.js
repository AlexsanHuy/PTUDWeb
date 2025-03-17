import { defineStore } from "pinia";
import axios from "axios";

export const useSachStore = defineStore("sachStore", {
  state: () => ({
    books: [],
  }),
  actions: {
    async fetchBooks() {
      const res = await axios.get("http://localhost:3000/api/sach/list");
      this.books = res.data;
    },

    async addBook(book) {
      await axios.post("http://localhost:3000/api/sach/add", book);
      await this.fetchBooks();
    },

    async updateBook(book) {
      await axios.put(`http://localhost:3000/api/sach/${book._id}`, book);
      await this.fetchBooks();
    },

    async deleteBook(id) {
      await axios.delete(`http://localhost:3000/api/sach/${id}`);
      await this.fetchBooks();
    },
  },
});
