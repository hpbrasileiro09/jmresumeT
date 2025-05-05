
  import Page from "@/components/support/index";
  import { ProvedorCategories } from "@/app/data/contexts/ContextoCategories";
  import { ProvedorSupport } from "@/app/data/contexts/ContextoSupport";

  export default function Support() {

    return (
      <main className="sm:ml-14 p-4">
        <ProvedorSupport>
          <ProvedorCategories>
            <Page />
          </ProvedorCategories>
        </ProvedorSupport>
      </main>
    );
  }
  