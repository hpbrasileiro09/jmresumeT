import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"

import { cn } from "@/lib/utils"

import { Check, ChevronsUpDown } from "lucide-react"  

import { Button } from "@/components/ui/button"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import React from "react"

import { ICard } from "@/core/model/ICard"

export interface DropdownProps {
  registers: ICard[]
  drop_id: number
  drop_nm: string
  label: string
  handleDropId: (value: number) => void
}

export default function Dropdown(props: DropdownProps) {

    const [open, setOpen] = React.useState(false)

    const [value, setValue] = React.useState(""+props.drop_id)

    React.useEffect(() => {
        props.handleDropId(parseInt(value)) 
    }, [value]); 
    
    return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">{props.label}</p>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? props.registers.find((item: ICard) => ""+item.id === value)?.label
            : "Select ..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command
          filter={(value, search, keywords = []) => {
            const extendValue = value + " " + keywords.join(" ");
            if (extendValue.toLowerCase().includes(search.toLowerCase())) {
              return 1;
            }
            return 0;
          }}>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No registry found.</CommandEmpty>
            <CommandGroup>
              {props.registers.map((item: ICard) => (
                <CommandItem
                  key={""+item.id}
                  value={""+item.id}
                  keywords={[item.label]}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                >
                  {item.label} ({item.id})
                  <Check
                    className={cn(
                      "ml-auto",
                      value === ""+item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    </div>
    )
}