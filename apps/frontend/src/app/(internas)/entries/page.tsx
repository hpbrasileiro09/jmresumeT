
import { DollarSign } from "lucide-react";

import Janela from "@/components/entries/janela";
import { ProvedorEntries } from "@/app/data/contexts/ContextoEntries";
import { ProvedorCategories } from "@/app/data/contexts/ContextoCategories";

export default function Page() {
  return (
    <main className="sm:ml-14 p-4">
      <ProvedorEntries>
        <ProvedorCategories>
          <Janela />
        </ProvedorCategories>
      </ProvedorEntries>
    </main>
  )
}
