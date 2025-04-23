
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Settings } from "lucide-react";
  
  export default function Clientes() {
    return (
      <main className="sm:ml-14 p-4">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                  Settings
                </CardTitle>
                <Settings className="ml-auto" />
              </div>
              <CardDescription>
                Settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-bold">Settings</p>
            </CardContent>
          </Card>
  
        </section>
  
      </main>
    );
  }
  