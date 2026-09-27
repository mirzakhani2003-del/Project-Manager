import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import type { Priority, Status, Task } from "../../../types/task";
import * as yup from "yup";
import styles from "./taskForm.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { User } from "../../../types/user";
import { v4 as uuid } from "uuid";
import { taskAction } from "../../../redux/slices/taskSlice";
import { useEffect, useState } from "react";

interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  assignedTo: string;
  status: Status;
}

const taskSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  priority: yup
    .mixed<Priority>()
    .oneOf(["low", "medium", "high"], "Select a valid priority")
    .required("Priority is required"),
  dueDate: yup.string().required("Due date is required"),
  assignedTo: yup.string().required("Please assign the task to a team member"),
  status: yup
    .mixed<Status>()
    .oneOf(["todo", "in-progress", "done"], "Select a valid status")
    .required("Status is required"),
});

interface TaskFormProps {
  projectId: string;
  initialData?: TaskFormData;
  taskId?: string;
}

const TaskForm = ({ projectId, initialData, taskId }: TaskFormProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const users = useAppSelector((state) => state.users.users);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const [editingMode, setEditingMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setEditingMode(true);
    }
  }, [initialData, reset]);

  if (!currentUser) {
    return;
  }

  const teamUsers = users.filter((user) => user.teamId === currentUser.teamId);

  const createTask = (data: TaskFormData, currentUser: User) => {
    if (currentUser.role !== "manager") {
      throw new Error("Only managers can create tasks.");
    }

    const newTask: Task = {
      id: uuid(),
      title: data.title,
      description: data.description,
      assignedTo: data.assignedTo,
      createdAt: new Date().toISOString(),
      dueDate: data.dueDate,
      priority: data.priority,
      status: "todo",
      projectId: projectId,
    };

    return newTask;
  };

  const updateTask = (
    taskId: string,
    data: TaskFormData,
    currentUser: User,
  ) => {
    if (currentUser.role !== "manager") {
      throw new Error("Only managers can Edit projects.");
    }

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      throw new Error("Project not found.");
    }

    const updatedTask: Task = {
      ...task,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      assignedTo: data.assignedTo,
      status: data.status ?? task.status,
    };

    return updatedTask;
  };

  const onSubmit = (data: TaskFormData) => {
    try {
      if (editingMode && taskId) {
        const updatedTask = updateTask(taskId, data, currentUser);
        dispatch(taskAction.updateTask(updatedTask));
        window.alert("Chnges saved !");
      } else {
        const newTask = createTask(data, currentUser);
        dispatch(taskAction.addTask(newTask));
        reset();
        window.alert("Task added to project.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("root", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" {...register("title")} />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Desctiption</label>
        <textarea id="description" {...register("description")} />
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.field}>
          <label htmlFor="priority">Priority</label>
          <select id="priority" defaultValue="medium" {...register("priority")}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className={styles.error}>{errors.priority.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="dueDate">Due Date</label>
          <input type="date" id="dueDate" {...register("dueDate")} />
          {errors.dueDate && (
            <p className={styles.error}>{errors.dueDate.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="assignedTo">Assigned To</label>
          <select id="assignedTo" defaultValue="" {...register("assignedTo")}>
            <option value="" disabled>
              Select a team member
            </option>
            {teamUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.assignedTo && (
            <p className={styles.error}>{errors.assignedTo.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            {...register("status")}
            disabled={editingMode ? false : true}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In-progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && (
            <p className={styles.error}>{errors.status.message}</p>
          )}
        </div>
      </div>

      {errors.root && <p className={styles.error}>{errors.root.message}</p>}

      <button type="submit" className={styles.button}>
        {editingMode ? "Save Changes" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
