import { useAppSelector } from "../../../redux/hooks";
import EmptyState from "../../Common/EmptyState";
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
    <div className={styles.list}>
      {teamProjects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description="There are no projects in your team yet."
        />
      ) : (
        teamProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      )}
    </div>
  );
};

export default ProjectList;
