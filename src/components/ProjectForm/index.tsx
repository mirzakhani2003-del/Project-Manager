import { useForm } from "react-hook-form";
import styles from "./projectForm.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { User } from "../../types/user";
import type { Project } from "../../types/project";
import { v4 as uuid } from "uuid";
import { projectAction } from "../../redux/slices/projectSlice";
import { useEffect, useState } from "react";

interface ProjectFormData {
  title: string;
  description: string;
}

interface ProjectFormProps {
  projectId?: string;
  initialData?: ProjectFormData;
}

const projectSchema = yup.object({
  title: yup
    .string()
    .required("Title is required !")
    .min(3, "Title ,ust be at least 3 chracters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
});

const ProjectForm = ({ initialData, projectId }: ProjectFormProps) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const projects = useAppSelector((state) => state.projects.projects);
  const dispatch = useAppDispatch();

  const [editingMode, setEditingMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: yupResolver(projectSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setEditingMode(true);
    }
  }, [initialData, reset]);

  const createProject = (data: ProjectFormData, currentUser: User) => {
    if (currentUser.role !== "manager") {
      throw new Error("Only managers can create projects.");
    }

    const newProject: Project = {
      id: uuid(),
      title: data.title,
      description: data.description,
      createdAt: new Date().toISOString(),
      teamId: currentUser.teamId,
    };

    return newProject;
  };

  const updateProject = (
    projectId: string,
    data: ProjectFormData,
    currentUser: User,
  ) => {
    if (currentUser.role !== "manager") {
      throw new Error("Only managers can create projects.");
    }

    const project = projects.find((project) => project.id === projectId);

    if (!project) {
      throw new Error("Project not found.");
    }

    const updatedProject: Project = {
      ...project,
      title: data.title,
      description: data.description,
    };

    return updatedProject;
  };

  const onSubmit = (data: ProjectFormData) => {
    try {
      if (!currentUser) {
        return;
      }

      if (editingMode && projectId) {
        const updatedProject = updateProject(projectId, data, currentUser);
        dispatch(projectAction.updateProject(updatedProject));
        window.alert("Chnges saved !");
      } else {
        const newProject = createProject(data, currentUser);
        dispatch(projectAction.addProject(newProject));
        reset();
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
        <label htmlFor="description">Description</label>
        <textarea rows={4} id="description" {...register("description")} />
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </div>

      {errors.root && <p className={styles.formError}>{errors.root.message}</p>}

      <button className={styles.button} type="submit">
        {editingMode === true ? "Save Change" : "Create Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
