import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Admin page
        </h1>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p>This is the admin page.</p>
          </div>
          <Button className="w-full">
            <Link href="/">Go to homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
