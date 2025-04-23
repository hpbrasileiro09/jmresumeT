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
import { Category } from "@/core/model/Category"

export interface ComboBoxProps {
  categories: Category[]
  category_id: number
  category_nm: string
  handleCategoryId: (value: number) => void
}

export default function Combobox(props: ComboBoxProps) {

    const [open, setOpen] = React.useState(false)

    const [value, setValue] = React.useState(""+props.category_id)

    React.useEffect(() => {
        props.handleCategoryId(parseInt(value)) //props.category_id)
    }, [value]); 
    
    return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? props.categories.find((category: Category) => ""+category.id === value)?.name
            : "Select Category..."}
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
              {props.categories.map((category: Category) => (
                <CommandItem
                  key={""+category.id}
                  value={""+category.id}
                  keywords={[category.name]}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                >
                  {category.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === ""+category.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    )
}