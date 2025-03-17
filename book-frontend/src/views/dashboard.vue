<template>
  <div class="container mt-4">
    <h1 class="mb-4">📊 Dashboard</h1>
    <div class="row">
      <div class="col-md-4">
        <div class="card text-white bg-primary mb-3">
          <div class="card-header"><i class="fas fa-book"></i> Số sách</div>
          <div class="card-body">
            <h4 class="card-title">{{ totalBooks }}</h4>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-white bg-success mb-3">
          <div class="card-header">
            <i class="fas fa-user-circle"></i> Độc giả
          </div>
          <div class="card-body">
            <h4 class="card-title">{{ totalReaders }}</h4>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-white bg-danger mb-3">
          <div class="card-header">
            <i class="fas fa-exchange-alt"></i> Số lượt mượn
          </div>
          <div class="card-body">
            <h4 class="card-title">{{ totalBorrowings }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const totalBooks = ref(0);
const totalReaders = ref(0);
const totalBorrowings = ref(0);

onMounted(async () => {
  const books = await axios.get("http://localhost:3000/api/sach/list");
  const readers = await axios.get("http://localhost:3000/api/docgia/account");
  const borrowings = await axios.get("http://localhost:3000/api/muonsach/muon");

  totalBooks.value = books.data.length;
  totalReaders.value = readers.data.length;
  totalBorrowings.value = borrowings.data.length;
});
</script>
