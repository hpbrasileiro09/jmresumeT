
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DollarSign, Users, Percent, BadgeDollarSign } from "lucide-react";

export default function Categories() {
  return (
    <main className="sm:ml-14 p-4">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
              Categories
              </CardTitle>
              <Users className="ml-auto" />
            </div>
            <CardDescription>
            Categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">Categories</p>
          </CardContent>
        </Card>

      </section>

    </main>
  );
}
