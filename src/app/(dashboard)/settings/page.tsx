import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SettingsProfile } from "./profile";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return <SettingsProfile user={session.user} />;
}
