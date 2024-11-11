"use client";

import { useSession } from "next-auth/react";
export default function CurrentRole() {
  const { data: session } = useSession({ required: true });
  if (!session) return <p>Not signed in</p>;
  return <p>Current role: {session.user.role}</p>;
}
