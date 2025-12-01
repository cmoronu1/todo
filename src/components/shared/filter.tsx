import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction } from "react";

interface FilterProps {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>

}

export function Filter({search, setSearch}: FilterProps){
    return(
        <header className=" bg-[#E8F5F7] p-2 rounded-2xl flex justify-between items-center">
            <div className="flex items-center gap-2 border border-border bg-white max-w-xs w-full rounded-lg px-4 py-1">
                <Search className=" w-4 h-4" />
                <Input value={search} onChange={(e)=> setSearch(e.target.value)} className="flex-1 border-0" placeholder="Search for To-Do" />
            </div>
        </header>
    )
}