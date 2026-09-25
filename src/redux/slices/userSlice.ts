import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import { storage } from "../../utils/storage";

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: storage.getUsers(),
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );

      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
