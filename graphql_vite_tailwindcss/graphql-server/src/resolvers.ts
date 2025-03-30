import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import task from "./models/task";
import User from "./models/user";

const resolvers = {
  Query: {
    getTasks: async () => {
      return await task.find();
    },
    // me: (parent, args, contextValue) => {
    //   if (!contextValue.user) return null;

    //   return contextValue.user;
    // },
    me: async (_: any, __: any, { userId }: { userId: string }) => {
      if (!userId) throw new Error("Not authenticated");
      return await User.findById(userId);
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

    register: async (
      _: any,
      {
        name,
        email,
        password,
      }: { name: string; email: string; password: string }
    ) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      const token = jwt.sign({ userId: user.id }, "SECRET_KEY", {
        expiresIn: "1d",
      });
      return { id: user.id, name, email, token };
    },
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");
      const token = jwt.sign({ userId: user.id }, "SECRET_KEY", {
        expiresIn: "1d",
      });
      return { id: user.id, name: user.name, email, token };
    },
  },
};

export default resolvers;
