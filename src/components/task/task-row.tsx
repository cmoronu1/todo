import { CircleCheck, CircleEllipsis, ListChecks, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { TaskCard } from "./task-card";
import { cn } from "@/lib/utils";

interface TaskRowProps {
  tasks: Task[];
  status: {
    job: string;
    color: string;
  };
}

function RenameTask(status: string) {
  switch (status) {
    case "todo":
      return { name: "To Do", icon: <ListChecks className="bg-[#cfb7e8] text-white rounded-[0.2rem]" /> };
    case "in-progress":
      return { name: "In Progress", icon: <CircleEllipsis className="bg-[#f7be37] text-white rounded-full" /> };
    case "completed":
      return { name: "Complete", icon: <CircleCheck className="bg-[#75c5c2] text-white rounded-full" /> };
    default:
      return {};
  }
}


export function TaskRow({ tasks, status }: TaskRowProps) {

    const nameAndIcon = RenameTask(status.job);

  return (
    <Card className="bg-[#f7f7f7]">
      <CardHeader
        className={cn(
          "flex flex-row justify-between items-center rounded-t-xl",
          status.color
        )}
      >
        <div className="flex gap-4 my-1">
          <Button className=" bg-white text-black" size={"sm"}>
            {nameAndIcon.icon}
            {nameAndIcon.name}
          </Button>
          <Button className=" bg-white text-black" size={"icon-sm"}>
            ({tasks.length})
          </Button>
        </div>
        <Button className="my-1  bg-white text-black" size={"icon-sm"}>
          <Plus />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </CardContent>
    </Card>
  );
}
