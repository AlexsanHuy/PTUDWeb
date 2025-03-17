import { defineStore } from "pinia";
import axios from "axios";

export const useDocGiaStore = defineStore("docGiaStore", {
  state: () => ({
    readers: [],
  }),
  actions: {
    async fetchReaders() {
      const res = await axios.get("http://localhost:3000/api/docgia/account");
      this.readers = res.data;
    },

    async addReader(reader) {
      await axios.post("http://localhost:3000/api/docgia/register", reader);
      await this.fetchReaders();
    },

    async updateReader(reader) {
      await axios.put(`http://localhost:3000/api/docgia/account/${reader._id}`, reader);
      await this.fetchReaders();
    },
  },
});
