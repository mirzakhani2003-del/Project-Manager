import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../../types/project";
import { storage } from "../../utils/storage";

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: storage.getProjects(),
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id,
      );

      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload,
      );
    },
  },
});

export const projectAction = projectSlice.actions;
export default projectSlice.reducer;
