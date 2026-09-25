import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Team } from "../../types/team";
import { storage } from "../../utils/storage";

interface TeamState {
  teams: Team[];
}

const initialState: TeamState = {
  teams: storage.getTeams(),
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    addTeam: (state, action: PayloadAction<Team>) => {
      state.teams.push(action.payload);
    },
  },
});

export const teamsActions = teamSlice.actions;
export default teamSlice.reducer;
