import type { Priority, Status } from "../../../types/task";
import type { User } from "../../../types/user";
import Button from "../../Common/Button";
import Input from "../../Common/Input";
import Select from "../../Common/Select";
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
    <Input
      label="Search Task"
      id="search"
      type="text"
      placeholder="Search by task title"
      onChange={(event) =>
        handleChange("search", event.target.value)
      }
    />

    <Select
      label="Status"
      id="task-status"
      options={[
        { value: "all", label: "All" },
        { value: "todo", label: "Todo" },
        {
          value: "in-progress",
          label: "In Progress",
        },
        { value: "done", label: "Done" },
      ]}
      onChange={(event) =>
        handleChange("status", event.target.value)
      }
    />

    <Select
      label="Priority"
      id="task-priority"
      options={[
        { value: "all", label: "All" },
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
      ]}
      onChange={(event) =>
        handleChange("priority", event.target.value)
      }
    />

    <Select
      label="Assigned To"
      id="task-assignee"
      options={[
        { value: "all", label: "All Members" },
        ...users.map((user) => ({
          value: user.id,
          label: user.name,
        })),
      ]}
      onChange={(event) =>
        handleChange("assignedTo", event.target.value)
      }
    />

    <Input
      label="Due Date From"
      id="task-due-from"
      type="date"
      onChange={(event) =>
        handleChange("dueDateFrom", event.target.value)
      }
    />

    <Input
      label="Due Date To"
      id="task-due-to"
      type="date"
      onChange={(event) =>
        handleChange("dueDateTo", event.target.value)
      }
    />

    <Button
      type="button"
      variant="secondary"
      onClick={onClear}
    >
      Clear Filters
    </Button>
  </section>
);
};

export default FilterTask;
