import { supabase } from "@/integrations/supabase/client";

export async function fetchShlokas(limit = 5) {
  const { data, error } = await supabase.from("shlokas").select("*").limit(limit);
  if (error) {
    console.error("Error fetching shlokas:", error);
    return [] as any[];
  }
  return data ?? [];
}
