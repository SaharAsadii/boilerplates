import task from "../models/task";

const resolvers = {
  Query: {
    getTasks: async () => {
      return await task.find();
    },
  },

  Mutation: {
    addTask: async (_: any, { title }: { title: string }) => {
      const newTask = new task({ title, completed: false });
      await newTask.save();
      return newTask;
    },

    completeTask: async (_: any, { id }: any) => {
      const taskToComplete = await task.findById(id);
      if (!taskToComplete) throw new Error("Task not found");
      taskToComplete.completed = !taskToComplete.completed;
      await taskToComplete.save();
      return taskToComplete;
    },

    deleteTask: async (_: any, { id }: any) => {
      const taskToDelete = await task.findByIdAndDelete(id);
      return taskToDelete;
    },
  },
};

export default resolvers;
