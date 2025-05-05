
  import Page from "@/components/times/index";

  import { ProvedorTimes } from "@/app/data/contexts/ContextoTimes";
  import { ProvedorCategories } from "@/app/data/contexts/ContextoCategories";
  import { ProvedorEntries } from "@/app/data/contexts/ContextoEntries";

  export default function Times() {

    return (
      <main className="sm:ml-14 p-4">
        <ProvedorEntries>
          <ProvedorCategories>
            <ProvedorTimes>
                <Page />
            </ProvedorTimes>
          </ProvedorCategories>
        </ProvedorEntries>
      </main>
    );
  }
  