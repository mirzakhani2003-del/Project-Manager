import styles from "./summaryCard.module.scss";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { RiTaskLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

interface SummaryCardProps {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  teamMembers: number;
  isManager: boolean;
}

const SummaryCard = ({
  totalProjects,
  totalTasks,
  completedTasks,
  teamMembers,
  isManager,
}: SummaryCardProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <span className={styles.label}>
            {isManager ? "My Projects" : "Projects"}
          </span>
          <GoProjectSymlink />
        </div>

        <span className={styles.value}>{totalProjects}</span>
      </div>

      <div className={styles.card}>
        <div className={styles.cardContent}>
          <span className={styles.label}>
            {isManager ? "Tasks" : "Your Tasks"}
          </span>
          <MdOutlineTaskAlt />
        </div>

        <span className={styles.value}>{totalTasks}</span>
      </div>

      <div className={styles.card}>
        <div className={styles.cardContent}>
          <span className={styles.label}>Completed</span>
          <RiTaskLine />
        </div>

        <span className={styles.value}>{completedTasks}</span>
      </div>

      <div className={styles.card}>
        <div className={styles.cardContent}>
          <span className={styles.label}>
            {isManager ? "Team Members" : "Team Mates"}
          </span>
          <FaUser />
        </div>

        <span className={styles.value}>{teamMembers}</span>
      </div>
    </section>
  );
};

export default SummaryCard;
