import type { Priority, Status } from "../../../types/task";
import type { User } from "../../../types/user";
import styles from "./filterTask.module.scss";

interface FilterTaskState {
  search: string;
  status: Status | "all";
  priority: Priority | "all";
  assignedTo: string | "all";
  dueDateFrom: string;
  dueDateTo: string;
}

interface FilterTaskProps {
  filters: FilterTaskState;
  users: User[];
  onClear: () => void;
  onChange: (filters: FilterTaskState) => void;
}

const FilterTask = ({ filters, users, onClear, onChange }: FilterTaskProps) => {
  const handleChange = (field: keyof FilterTaskState, value: string) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <section className={styles.container}>
      <div className={styles.field}>
        <label htmlFor="search">Search Task</label>
        <input
          type="text"
          id="search"
          placeholder="Search by task title"
          onChange={(event) => handleChange("search", event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="status">Status</label>
        <select
          className={styles.select}
          id="task-status"
          onChange={(event) => handleChange("status", event.target.value)}
        >
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-priority">
          Priority
        </label>
        <select
          className={styles.select}
          id="task-priority"
          onChange={(event) => handleChange("priority", event.target.value)}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-assignee">
          Assigned To
        </label>
        <select
          className={styles.select}
          id="task-assignee"
          onChange={(event) => handleChange("assignedTo", event.target.value)}
        >
          <option value="all">All Members</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-due-from">
          Due Date From
        </label>
        <input
          className={styles.input}
          id="task-due-from"
          type="date"
          onChange={(event) => handleChange("dueDateFrom", event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-due-to">
          Due Date To
        </label>
        <input
          className={styles.input}
          id="task-due-to"
          type="date"
          onChange={(event) => handleChange("dueDateTo", event.target.value)}
        />
      </div>

      <button className={styles.button} type="button" onClick={onClear}>
        Clear Filters
      </button>
    </section>
  );
};

export default FilterTask;
