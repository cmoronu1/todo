import { Form, Plus, PlusCircle } from "lucide-react";
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
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { accessedDynamicData } from "next/dist/server/app-render/dynamic-rendering";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AddTaskProps {
  taskData: Task[];
  setTaskData: Dispatch<SetStateAction<Task[]>>;
  selected: string;
}
export function AddFilteredTask({
  taskData,
  setTaskData,
  selected,
}: AddTaskProps) {
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

  useEffect(() => {
    if (selected) {
      setForm((p) => ({ ...p, status: selected as string as TaskStatus }));
    }
  }, [form.status]);

  function HandleAdd() {
    setTaskData((p) => [...p, form]);
    toast.success("Task added successfully");
    setForm((p) => ({
      id: "",
      name: "",
      startDate: "",
      endDate: "",
      priority: "" as string as TaskPriorities,
      status: "" as string as TaskStatus,
      description: "",
      users: [{ name: "", src: "" }],
    }));
    selected = "";
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-white text-black" size="icon-sm">
          <Plus />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Fill in the all the data below</AlertDialogTitle>
        <AlertDialogTitle>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <h2 className="text-[#181818] not-sm:text-[0.7em]">Task Title</h2>
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
              <h2 className="text-[#181818] not-sm:text-[0.7em]">Start Date</h2>
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
              <h2 className="text-[#181818] not-sm:text-[0.7em]">End Date</h2>
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
              <h2 className="text-[#181818] not-sm:text-[0.7em]">User</h2>
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
            <div className="flex gap-4 not-sm:grid not-sm:grid-cols-2 not-sm:gap-3">
              {/* <RadioGroup className="flex flex-row not-sm:flex-col">
                <h2 className="text-[#181818] not-sm:text-[0.9em]">Priority</h2>
                {["Low", "Medium", "Important", "Urgent"].map((member) => (
                  <div
                    key={member}
                    className="flex gap-2 items-center not-sm:text-[0.6em] not-sm:justify-between"
                  >
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
              </RadioGroup> */}
              <Select
                value={form.priority}
                onValueChange={(value) =>
                  setForm((p) => ({
                    ...p,
                    priority: value as unknown as TaskPriorities,
                  }))
                }
              >
                <SelectTrigger className="w-[180px] not-sm:w-full">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    {["Low", "Medium", "Important", "Urgent"].map((member) => (
                      <SelectItem
                        key={member}
                        value={member}
                        // onFocus={()=>setForm((p)=>({...p, priority : member as unknown as TaskPriorities}))}
                      >
                        {member}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <RadioGroup className="flex flex-row not-sm:flex-col">
                <h2 className="text-[#181818] not-sm:text-[0.9em]">Status</h2>
                {["todo", "in-progress", "completed"].map((member) => (
                  <div
                    key={member}
                    className="capitalize flex items-center gap-2 not-sm:text-[0.6em] justify-between"
                  >
                    {member == "todo"
                      ? "To Do"
                      : member == "completed"
                      ? "Complete"
                      : member.replace("-", " ")}
                    <RadioGroupItem
                      value={member}
                      disabled={selected != member ? true : false}
                      checked={selected == member ? true : false}
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          status: member as unknown as TaskStatus,
                        }))
                      }
                    />
                  </div>
                ))}
              </RadioGroup> */}
              <Select
                value={form.status}
                onValueChange={(value) =>
                  setForm((p) => ({
                    ...p,
                    status: value as unknown as TaskStatus,
                  }))
                }
              >
                <SelectTrigger className="w-[180px] not-sm:w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    {["todo", "in-progress", "completed"].map((member) => (
                      <SelectItem
                        key={member}
                        value={member}
                        // onFocus={()=>setForm((p)=>({...p, status : member as unknown as TaskStatus}))}
                      >
                        {member == "todo"
                          ? "To Do"
                          : member == "completed"
                          ? "Complete"
                          : "In Progress"}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-col gap-1">
          <span className="text-[#181818] text-xl font-medium not-sm:text-[0.9em]">
            Description
          </span>
          <Textarea
            className="not-sm:w-[90%]"
            placeholder="Enter Description here"
            onChange={(event) =>
              setForm((p) => ({ ...p, description: event?.target.value }))
            }
          />
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="not-sm:w-[90%]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="not-sm:w-[90%]"
            onClick={HandleAdd}
            disabled={disabled}
          >
            Add Task
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
