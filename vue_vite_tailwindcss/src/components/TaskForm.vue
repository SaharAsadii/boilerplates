<template>
  <form @submit.prevent="handleSubmit" class="mb-4 flex">
    <input
      v-model="task"
      placeholder="New task"
      class="border p-2 flex-1 rounded-l"
    />
    <button type="submit" class="bg-blue-500 text-white px-4 rounded-r">
      Add
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const task = ref("");
const emit = defineEmits<{
  (e: "add-task", task: string): void;
}>();

const handleSubmit = () => {
  if (!task.value.trim()) return;
  emit("add-task", task.value);
  task.value = "";
};
</script>
