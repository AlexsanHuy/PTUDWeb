import { defineStore } from "pinia";
import axios from "axios";

export const useNXBStore = defineStore("nxbStore", {
  state: () => ({
    publishers: [],
  }),
  actions: {
    async fetchNXB() {
      const res = await axios.get("http://localhost:3000/api/nxb/list");
      this.publishers = res.data;
    },

    async addNXB(nxb) {
      await axios.post("http://localhost:3000/api/nxb/add", nxb);
      await this.fetchNXB();
    },

    async updateNXB(nxb) {
      await axios.put(`http://localhost:3000/api/nxb/account/${nxb._id}`, nxb);
      await this.fetchNXB();
    },

    async deleteNXB(id) {
      await axios.delete(`http://localhost:3000/api/nxb/account/${id}`);
      await this.fetchNXB();
    },
  },
});
