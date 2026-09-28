import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import styles from "./taskPriorityChart.module.scss";

interface TaskPriorityChartProps {
  low: number;
  medium: number;
  high: number;
  isManager: boolean;
}

const TaskPriorityChart = ({
  low,
  medium,
  high,
  isManager,
}: TaskPriorityChartProps) => {
  const data = [
    {
      name: "Low",
      value: low,
    },
    {
      name: "Medium",
      value: medium,
    },
    {
      name: "High",
      value: high,
    },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#EF4444"];

  const hasTasks = data.some((item) => item.value > 0);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        {isManager ? "Tasks Priority" : "Your Tasks Priority"}
      </h2>

      {!hasTasks ? (
        <p className={styles.empty}>No task data available.</p>
      ) : (
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};

export default TaskPriorityChart;
