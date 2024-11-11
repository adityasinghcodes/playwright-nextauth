"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function NormalPage() {
  const { data: session, update } = useSession();
  const { toast } = useToast();

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Settings Page
        </h1>
        <p className="text-gray-600 text-center">
          This page can be accessed by any user.
        </p>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() => {
              session?.user && update({ ...session.user, role: "user" });
              toast({
                title: "Success",
                description: "Role has been changed to user.",
              });
            }}
            className="w-full"
          >
            Change role to user
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              session?.user && update({ ...session.user, role: "admin" });
              toast({
                title: "Success",
                description: "Role has been changed to admin.",
              });
            }}
            className="w-full"
          >
            Change role to admin
          </Button>
          <Button className="w-full">
            <Link href="/">Go to home page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
