import { Dispatch, SetStateAction } from "react";
import { TaskRow } from "./task-row";

const action = [
  {
    job: "todo",
    color: "bg-[#f9f3ff]",
  },
  {
    job: "in-progress",
    color: "bg-[#fbf4e4]",
  },
  {
    job: "completed",
    color: "bg-[#e8f5f7]",
  },
];
interface TaskWrapperProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export function TaskWrapper({ tasks, setTasks }: TaskWrapperProps) {
  return (
    <div className="grid grid-cols-3 gap-4 ">
      {action.map((s) => (
        <TaskRow
          status={s}
          key={s.job}
          tasks={tasks.filter((t) => t.status == s.job)}
        />
      ))}
    </div>
  );
}
