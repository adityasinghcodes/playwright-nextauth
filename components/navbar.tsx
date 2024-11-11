import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions/authActions";
import CurrentRole from "./current-role";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="flex justify-between items-center py-3 px-4 fixed top-0 left-0 right-0 z-50 bg-slate-100">
      <Link href="/" className="text-xl font-bold">
        E2E testing
      </Link>
      {!session ? (
        <div className="flex gap-2 justify-center">
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/auth/signin"
          >
            Sign In
          </Link>
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/auth/signup"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <CurrentRole />
          <form action={handleSignOut}>
            <Button variant="default" type="submit">
              Sign Out
            </Button>
          </form>
        </div>
      )}
    </nav>
  );
}
