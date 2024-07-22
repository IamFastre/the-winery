"use server";
import { createClient } from "@/supabase/server";
import { getProfile } from "./user";
import XRegExp from "xregexp";

/* ========================================================================== */
/*                                   Reading                                  */
/* ========================================================================== */

export async function getFeedPosts(amount:number = 5) {
  const supabase = createClient();

  return await supabase
    .from('posts')
    .select()
    .limit(amount)
    .order('timestamp', { ascending: false });
}

export async function getUserPosts(identifier:string) {
  const supabase = createClient();

  return await supabase
    .from('posts')
    .select()
    .eq('author', identifier.toLowerCase())
    .order('timestamp', { ascending: false });
}

/* ========================================================================== */
/*                                   Writing                                  */
/* ========================================================================== */

export async function createPost(title:string, content:string) {
  const supabase = createClient();
  const { data:user, error } = await getProfile();

  if (!user || error)
    return { data: null, error };

  if (content.replaceAll(XRegExp(`\\P{L}+`, `gu`), "").length < 16) 
    return { data: null, error: {} };

  return await supabase
    .from('posts')
    .insert([{ title, content, author: user.identifier }])
    .select();
}

export async function createDraft(title:string, content:string) {
  const supabase = createClient();
  const { data:user, error } = await getProfile();

  if (!user || error)
    return { data: null, error };

  if (content.replaceAll(XRegExp(`\\P{L}+`, `gu`), "").length < 16) 
    return { data: null, error: {} };

  return await supabase
    .from('drafts')
    .insert([{ title, content, author: user.identifier }])
    .select();
}
