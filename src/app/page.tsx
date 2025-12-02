"use client"
import { Filter } from "@/components/shared/filter";
import { Header } from "@/components/shared/header";
import { TaskWrapper } from "@/components/task/task-wrapper";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AllTask } from "@/data/task";
import { useMemo, useState } from "react";

export default function Home(){
  const [data, setData] = useState<Task[]>([]);
  const [search, setSearch] = useState('')
  const filteredTasks = useMemo(()=> {
    if(search?.length > 0){
      return data.filter((t)=> t.name.toLowerCase().includes(search.toLowerCase()))
    }
    else {
      return data
    }
  }, [search,data])
  return(
    <div className=" flex justify-center bg-gray-200 min-h-dvh items-center">
      <Card className=" xl:max-w-[80%] p-4 gap-2 w-full">
        <Header tasks={data} setTasks={setData} />
        <Separator />
        <Filter search={search} setSearch={setSearch} />
        <TaskWrapper tasks={filteredTasks} setTasks={setData} />
      </Card>
    </div>
  )
}