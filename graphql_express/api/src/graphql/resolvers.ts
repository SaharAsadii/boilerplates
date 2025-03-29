import bcrypt from "bcryptjs";
import task from "../models/task";
import User from "../models/user";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utility/auth";

const resolvers = {
  Query: {
    getTasks: async () => {
      return await task.find();
    },
    me: async ({ user }: { user: { id: string } }) => {
      if (!user) {
        throw new Error("Not authenticated");
      }

      return User.findById(user.id);
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
        username,
        fullName,
        password,
      }: { fullName: string; username: string; password: string }
    ) => {
      const existingUser = await User.findOne({ username });
      console.log({ username, fullName, password });
      if (await existingUser) {
        throw new Error("Username already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        fullName,
        username,
        password: hashedPassword,
      };
      await User.create(newUser);
      return {
        token: generateAccessToken(newUser),
        refreshToken: generateRefreshToken(newUser),
      };
    },
    login: async (
      _: any,
      { username, password }: { username: string; password: string }
    ) => {
      console.log({ username, password });
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        throw new Error("User not found");
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      return {
        token: generateAccessToken(existingUser),
        refreshToken: generateRefreshToken(existingUser),
      };
    },

    refreshToken: async (_: any, { token }: { token: string }) => {
      try {
        const userData = verifyRefreshToken(token);
        if (typeof userData !== "object" || !("userId" in userData)) {
          throw new Error("Invalid token payload");
        }
        const existingUser = await User.findById(userData.userId);
        if (!existingUser) {
          throw new Error("User not found");
        }
        return {
          token: generateAccessToken(existingUser),
          refreshToken: generateRefreshToken(existingUser),
        };
      } catch (error) {
        throw new Error("Invalid refresh token");
      }
    },
  },
};

export default resolvers;
