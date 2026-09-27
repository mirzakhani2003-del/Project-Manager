import { format } from "date-fns";
import type { Project } from "../../../types/project";
import styles from "./projectCard.module.scss";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <li className={styles.card} onClick={handleClick}>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <p className={styles.date}>
          Created on {format(new Date(project.createdAt), "MMM d, yyyy")}
        </p>
      </div>
    </li>
  );
};

export default ProjectCard;
