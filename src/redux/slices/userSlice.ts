import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import { storage } from "../../utils/storage";

interface UserState {
  users: User[] | null;
}

const initialState: UserState = {
  users: storage.getUsers(),
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users?.push(action.payload);
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
