import { defineStore } from "pinia";

interface Task {
  id: number;
  text: string;
}

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]") as Task[],
  }),

  actions: {
    addTask(task: string) {
      this.tasks.push({ id: Date.now(), text: task });
      this.saveTasks();
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveTasks();
    },
    editTask(id: number, newText: string) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.text = newText;
        this.saveTasks();
      }
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
  },

  getters: {
    taskCount: (state) => state.tasks.length,
  },
});
