
  import Page from "@/components/report/index";

  import { ProvedorReport } from "@/app/data/contexts/ContextoReport";

  export default function Report() {

    return (
      <main className="sm:ml-14 p-4">
        <ProvedorReport>
            <Page />
        </ProvedorReport>  
      </main>
    );
  }
  