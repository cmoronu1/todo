import { CalendarDays, Flag,  User } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="flex-1">
      <CardHeader className="mt-2">
        <h4 className="font-bold not-lg:text-[0.8em]">{task.name}</h4>
      </CardHeader>
      <CardContent className="gap-2 flex flex-col mb-4">
        <div className="flex items-center gap-3">
          <CalendarDays size={18} />
          <div className="flex gap-1">
            <span className="text-sm">
              {format(new Date(task.startDate), "dd-MMM")}
            </span>
            <span className="text-sm">-</span>
            <span className="text-sm ">
              {format(new Date(task.endDate), "dd-MMM")}
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <User size={18} />
          <div className=" flex -space-x-2">
            <Avatar className=" size-6">
              <AvatarImage
                className="w-full h-full"
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className=" size-6">
              <AvatarImage
                className="w-full h-full"
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar className=" size-6">
              <AvatarImage
                className="w-full h-full"
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Flag size={18} />
          <span className="not-lg:text-[0.8em]">{task.priority}</span>
        </div>
      </CardContent>
    </Card>
  );
}
