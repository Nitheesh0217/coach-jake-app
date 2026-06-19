import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SettingsPageClient from "@/components/sections/settings/SettingsPageClient";
import type { Profile } from "@/types";

async function getSettings() {
  const cookieStore = await cookies();
  const supabase = supabaseServer({
    get: (name) => {
      const val = cookieStore.get(name);
      return val ? { value: val.value } : undefined;
    },
    set: () => {},
    remove: () => {},
  });

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", auth.user.id)
    .single();

  if (error || !profile) {
    redirect("/finish-profile");
  }

  return profile as Profile;
}

export default async function SettingsPage() {
  const profile = await getSettings();

  return <SettingsPageClient profile={profile} />;
}
