<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Task Manager</h1>
    <p class="text-gray-600 mb-4">Total Tasks: {{ taskCount }}</p>
    <TaskForm @add-task="addTask" />
    <TaskList :tasks="tasks" @delete-task="deleteTask" @edit-task="editTask" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/task-store";
import TaskForm from "../components/TaskForm.vue";
import TaskList from "../components/TaskList.vue";

const taskStore = useTaskStore();
const { tasks, taskCount } = storeToRefs(taskStore);
const { addTask, deleteTask, editTask } = taskStore;
</script>
