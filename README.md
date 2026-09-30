# Project Manager 📋

A modern and responsive project and task management application built with React and TypeScript.

The application provides a complete workspace for managing teams, projects, tasks, notifications, reminders, and analytics, with role-based access control and a responsive SaaS-style interface.

> **Current status:** Frontend completed. Backend integration is planned for the next phase.

---

## ✨ Features

### Authentication & Authorization

- User registration and login
- Role-based access control
- Manager and Member roles
- Protected routes
- Team-based data isolation
- Managers have full access to their workspace
- Members can view projects, tasks, and users
- Members can only change the status of tasks assigned to them

### 👥 Team & User Management

- Create and manage a team
- Add team members
- View team members
- Manage user profiles
- Role-based permissions

### 📁 Project Management

- Create projects
- Edit projects
- Delete projects
- View project details
- Associate projects with teams
- Display project creation dates

### ✅ Task Management

- Create and manage tasks
- Assign tasks to team members
- Task priorities:
  - Low
  - Medium
  - High

- Task statuses:
  - Todo
  - In Progress
  - Done

- Due dates
- Task descriptions
- Permission-based task status updates

### 🔎 Search & Filtering

- Search tasks by title
- Filter tasks by:
  - Status
  - Priority
  - Assignee
  - Due date range

### 🔔 Notifications & Reminders

- Task assignment notifications
- Task status change notifications
- Project creation notifications
- Read/unread notification state
- Upcoming task reminders
- Task reminder modal

### 📊 Dashboard & Analytics

- Project overview
- Task statistics
- Task status analytics
- Task priority analytics
- Data visualization using charts

### 🎨 UI & UX

- Responsive design
- Mobile-friendly sidebar
- Reusable UI components
- Light mode
- Dark mode
- Persistent theme preference
- Accessible interactive elements
- Responsive modals and forms
- Consistent design system

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Redux Toolkit
- React Hook Form
- Yup
- Recharts
- date-fns
- react-icons
- Sass Modules
- Vite

### Data Persistence

The current frontend version uses `localStorage` for client-side data persistence.

Backend integration with a real database is planned for the next development phase.

---

## 🔐 Roles & Permissions

The application currently supports two roles:

### Manager

Managers have full access to their team workspace.

They can:

- Manage team members
- Create, edit, and delete projects
- Create, edit, and delete tasks
- Assign tasks
- Manage users
- View dashboard analytics
- Manage notifications and reminders

### Member

Members have limited access.

They can:

- View projects
- View tasks
- View team members
- View dashboard information
- Change the status of tasks assigned to them

Members cannot create, edit, or delete projects and tasks.

---

## 🎨 Theme System

The application supports both Light and Dark themes.

Theme colors are managed through CSS custom properties, while Sass variables provide the styling interface used throughout the application.

The selected theme is persisted using `localStorage`.

---

## 📱 Responsive Design

The interface is designed to work across different screen sizes:

- Desktop
- Tablet
- Mobile

The layout includes a responsive sidebar, adaptive forms, responsive cards, modals, and dashboard sections.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/mirzakhani2003-del/Project-Manager.git
```

Navigate to the project directory:

```bash
cd project-manager
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local development URL shown by Vite.

---

## 📦 Production Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🎯 Project Goals

This project was built to practice and demonstrate:

- Modern React development
- TypeScript
- State management with Redux Toolkit
- Form handling and validation
- Role-based authorization
- Responsive UI development
- Reusable component design
- Data visualization
- Theme management
- Client-side data persistence

The project will eventually be extended into a full-stack application by connecting the React frontend to an ASP.NET Core backend.

---

## 📄 License

This project is for educational and portfolio purposes.
