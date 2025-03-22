import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Task {
  id: number;
  text: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, updatedText: string) => void;
}

const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      removeTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
      updateTask: (id, updatedText) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, text: updatedText } : t
          ),
        })),
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTaskStore;
