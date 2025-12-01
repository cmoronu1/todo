import { CalendarDaysIcon, ListChecks, ListFilter, Share } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { AddTask } from "../task/addInput";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}
export function Header({ tasks, setTasks }: HeaderProps) {
  return (
    <header className=" p-2 rounded-2xl flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full border border-border">
          <ListChecks size={26} />
        </div>
        <h1 className="text-2xl font-bold">Chika Moronu</h1>
      </div>
      <div className="flex gap-4 items-center">
        <div className="border-0 rounded-[0.4rem] h-10 w-12 flex items-center justify-center bg-[#f3f4f6]">
          <Switch />
        </div>

        <Button size={"icon-lg"} variant={"secondary"}>
          <ListFilter />
        </Button>
        <Button size={"icon-lg"} variant={"secondary"}>
          <CalendarDaysIcon />
        </Button>
        <Button size={"lg"}>
          <Share />
          Export xlxs
        </Button>
        <AddTask taskData={tasks} setTaskData={setTasks} />
      </div>
    </header>
  );
}
