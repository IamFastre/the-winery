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

export async function getUserByIdentifier(id:string) {
  const supabase = createClient();
  // const user = supabase.auth.getUser();

  return await supabase
    .from('users')
    .select()
    .eq('identifier', id)
    .select("username, avatar, bio")
    .single();
}
