import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../../types/task";
import { storage } from "../../utils/storage";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: storage.getTasks(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );

      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const taskAction = taskSlice.actions;
export default taskSlice.reducer;
