import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <main className="grow flex items-center justify-center p-4">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="mb-2 text-2xl font-bold">
            Welcome, {session?.user?.name}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            If you are learning something valuable from this video, please like
            and subscribe to my channel.
          </p>
          <div className="flex gap-2 mt-4">
            <Link href="/settings">
              <Button className="w-full">Settings page</Button>
            </Link>
            <Link href="/admin">
              <Button className="w-full">Go to admin</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
