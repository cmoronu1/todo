import { PlusCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { accessedDynamicData } from "next/dist/server/app-render/dynamic-rendering";

interface AddTaskProps {
  taskData: Task[];
  setTaskData: Dispatch<SetStateAction<Task[]>>;
}
export function AddTask({ taskData, setTaskData }: AddTaskProps) {
  const [form, setForm] = useState<Task>({
    id: "",
    name: "",
    startDate: "",
    endDate: "",
    users: [],
    priority: "" as string as TaskPriorities,
    status: "" as string as TaskStatus,
    description: "",
  });

  const disabled = useMemo(() => {
    const filteredObject = Object.fromEntries(
      Object.entries(form).filter(([Key, value]) => Key != "description")
    );

    
    return !Object.values(filteredObject).every((v) => v?.length > 0);
  }, [form]);

  function HandleAdd() {
    setTaskData((p) => [...p, form]);
    toast.success("Task added successfully");
    setForm((p) => ({
      ...p,
      priority: "" as string as TaskPriorities,
      status: "" as string as TaskStatus,
      description: "",
      users: [{name:'',src:''}],
    }));
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="lg">
          <PlusCircle /> Add Task
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Fill in the all the data below</AlertDialogTitle>
        <AlertDialogTitle>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <h2 className="text-blue-600 not-sm:text-[0.7em]">Task Title</h2>
              <span>
                <Input
                  className="h-6 rounded-none"
                  type={"text"}
                  required
                  onChange={(event) =>
                    setForm((p) => ({
                      ...p,
                      name: event.target.value,
                      id:
                        "task-" + String(taskData.length + 1).padStart(3, "0"),
                    }))
                  }
                />
              </span>
            </div>
            <div className="flex gap-2">
              <h2 className="text-blue-600 not-sm:text-[0.7em]">Start Date</h2>
              <span>
                <Input
                  className="h-6 rounded-none"
                  type={"date"}
                  required
                  onChange={(event) =>
                    setForm((p) => ({ ...p, startDate: event.target.value }))
                  }
                />
              </span>
            </div>
            <div className="flex gap-2">
              <h2 className="text-blue-600 not-sm:text-[0.7em]">End Date</h2>
              <span>
                <Input
                  className="h-6 rounded-none"
                  type={"date"}
                  required
                  onChange={(event) =>
                    setForm((p) => ({ ...p, endDate: event.target.value }))
                  }
                />
              </span>
            </div>
            <div className="flex gap-2">
              <h2 className="text-blue-600 not-sm:text-[0.7em]">User</h2>
              <span>
                <Input
                  className="h-6 rounded-none"
                  type={"text"}
                  required
                  onChange={(event) =>
                    setForm((p) => ({
                      ...p,
                      users: [{ name: event.target.value, src: "" }],
                    }))
                  }
                />
              </span>
            </div>
            <RadioGroup className="flex flex-row not-sm:flex-col">
              <h2 className="text-blue-600 not-sm:text-[0.7em]">Priority</h2>
              {["Low", "Medium", "Important", "Urgent"].map((member) => (
                <div key={member} className="flex gap-2 items-center not-sm:text-[0.6em] justify-between">
                  {member}
                  <RadioGroupItem
                    value={member}
                    onClick={() =>
                      setForm((d) => ({
                        ...d,
                        priority: member as unknown as TaskPriorities,
                      }))
                    }
                  />
                </div>
              ))}
            </RadioGroup>
            <RadioGroup className="flex flex-row ">
              <h2 className="text-blue-600 not-sm:text-[0.7em]">Status</h2>
              {["todo", "in-progress", "completed"].map((member) => (
                <div
                  key={member}
                  className="capitalize flex items-center gap-2 not-sm:text-[0.6em]"
                >
                  {member == "todo"
                    ? "To Do"
                    : member == "completed"
                    ? "Complete"
                    : member.replace("-", " ")}
                  <RadioGroupItem
                    value={member}
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        status: member as unknown as TaskStatus,
                      }))
                    }
                  />
                </div>
              ))}
            </RadioGroup>
          </div>
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-col gap-1">
          <span className="text-[#165dfc] text-xl font-medium not-sm:text-[0.7em]">
            Description
          </span>
          <Textarea className="not-sm:w-[90%]"
            placeholder="Enter Description here"
            onChange={(event) =>
              setForm((p) => ({ ...p, description: event?.target.value }))
            }
          />
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="not-sm:w-[90%]">Cancel</AlertDialogCancel>
          <AlertDialogAction className="not-sm:w-[90%]"onClick={HandleAdd} disabled={disabled}>
            Add Task
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
