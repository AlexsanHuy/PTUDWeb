<template>
  <div>
    <Appbar />
    <RouterView />
  </div>
</template>

<script setup>
import Appbar from "@/components/Appbar.vue";
import { RouterView } from "vue-router";
</script>
