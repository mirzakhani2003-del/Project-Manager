import { useAppSelector } from "../../redux/hooks";
import ProjectCard from "../ProjectCard";

import styles from "./projectList.module.scss";

const ProjectList = () => {
  const projects = useAppSelector((state) => state.projects.projects);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  if (!currentUser) {
    return;
  }

  const teamProjects = projects.filter(
    (project) => project.teamId === currentUser.teamId,
  );

  return (
    <ul className={styles.list}>
      {teamProjects.length === 0 ? (
        <li className={styles.empty}>No project found</li>
      ) : (
        teamProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      )}
    </ul>
  );
};

export default ProjectList;
