<template>
  <ul>
    <li
      v-for="task in tasks"
      :key="task.id"
      class="flex justify-between items-center p-2 border-b"
    >
      <span>{{ task.text }}</span>
      <div class="flex gap-2">
        <button @click="edit(task.id)" class="text-blue-500">
          <font-awesome-icon :icon="['fas', 'edit']" />
        </button>
        <button @click="emit('delete-task', task.id)" class="text-red-500">
          <font-awesome-icon :icon="['fas', 'trash']" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface Task {
  id: number;
  text: string;
}

defineProps<{ tasks: Task[] }>();
const emit = defineEmits<{
  (e: "delete-task", id: number): void;
  (e: "edit-task", id: number, newText: string): void;
}>();

const edit = (id: number) => {
  const newText = prompt("Edit task:");
  if (newText) emit("edit-task", id, newText);
};
</script>
