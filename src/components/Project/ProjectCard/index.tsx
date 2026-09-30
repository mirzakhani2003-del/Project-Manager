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
    <article
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{project.title}</h3>
        </div>

        <p className={styles.description}>{project.description}</p>

        <div className={styles.footer}>
          <span className={styles.date}>
            Created on {format(new Date(project.createdAt), "MMM d, yyyy")}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
