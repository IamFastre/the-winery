"use server";
import { createClient } from "@/supabase/server";

export async function getPosts(amount:number = 5) {
  const supabase = createClient();
  // const user = supabase.auth.getUser();

  return await supabase
    .from('posts')
    .select()
    .limit(amount)
    .order('id', { ascending: false });
}

export async function getUser(uuid:string) {
  const supabase = createClient();
  // const user = supabase.auth.getUser();

  return await supabase
    .from('users')
    .select()
    .eq('id', uuid)
    .select("username, avatar")
    .single();
}
