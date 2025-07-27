import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"

export const SortIcon = ({show=false,desc=false})=>{
    
    if(!show) return '';
    return( desc ? <ChevronUpIcon className="w-5 h-5 bg-green-100/50 rounded"/>:<ChevronDownIcon className="w-5 h-5 bg-green-100/50 rounded"/>)
}