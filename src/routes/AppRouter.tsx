import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/landing";
import Register from "../pages/register";
import Login from "../pages/login";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../pages/dashboard";
import Projects from "../pages/projects";
import Tasks from "../pages/tasks";
import Users from "../pages/users";
import Profile from "../pages/profile";
import ProjectDetails from "../pages/projectDetails";
import Notifications from "../pages/notifications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "projects",
            element: <Projects />,
          },
          {
            path: "projects/:projectId",
            element: <ProjectDetails />,
          },
          {
            path: "tasks",
            element: <Tasks />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/notifications",
            element: <Notifications />,
          },
        ],
      },
    ],
  },
]);

export default router;
