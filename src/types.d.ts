type TaskStatus = "todo" | "in-progress" | "completed";
type TaskPriorities = "Medium" | "Important" | "Urgent" | "Low";

type Task = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  users: User[];
  priority: TaskPriorities;
  status: TaskStatus;
  description?: string;
};

type User = {
  name: string;
  src: string;
};