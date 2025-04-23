
import { Category } from "./Category"

export interface Entry {
    id: number
    category?: Category
    category_id: number
    dt_entry: Date
    vl_entry: number
    nm_entry: string
    ds_category: string     
    ds_subcategory: string     
    status: number     
    fixed_costs: number     
    checked: number     
    ds_detail: string     
    created_at:  Date
    updated_at:  Date
    published: number
    mysql_id: number
}