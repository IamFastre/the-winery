"use server";
import { createClient } from "@/supabase/server";

import { AuthData, AuthError } from "./types";

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

  return await supabase
    .from('users')
    .select("username, display_name, avatar, bio")
    .eq('identifier', id.toLowerCase())
    .single();
}

export async function getUser() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return await supabase
    .from('users')
    .select()
    .eq('id', data.user?.id ?? "")
    .single();
}

export async function signUp(username:string, email:string, password:string) {
  const supabase = createClient();
  const emRegex  = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;
  const pwRegex  = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[?!@#$%~^&()\[\]\{\}\.\,\-\+\*\/=\\]).{1,}$/;

  let data:AuthData | null = null;
  let error:AuthError | null = null;

  if (emRegex.test(email) && password.length > 7 && pwRegex.test(password)) {
    const { data: dt, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: '/',
        data: { username }
      }
    });

    data  = dt.user ? dt : null;
    error = err ? { name: err.name, code: err.code, status: err.status, message: err.message } : null;
  }

  return {
    data,
    error
  };
}

export async function signIn(email:string, password:string) {
  const supabase = createClient();
  const emRegex  = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;
  const pwRegex  = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[?!@#$%~^&()\[\]\{\}\.\,\-\+\*\/=\\]).{1,}$/;

  let data:AuthData | null = null;
  let error:AuthError | null = null;

  if (emRegex.test(email) && password.length > 7 && pwRegex.test(password)) {
    const { data: dt, error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    data  = dt.user ? dt : null;
    error = err ? { name: err.name, code: err.code, status: err.status, message: err.message } : null;
  }

  return {
    data,
    error
  };
}

export async function createPost(title:string, content:string) {
  const supabase = createClient();
  const { data:user, error: userError } = await getUser();
  let error = userError;

  if (user) {
    const { error: postingError } = await supabase
      .from('posts')
      .insert([{ title, content }]);

    error = postingError;
  }

  return { error };
}

export async function createDraft(title:string, content:string) {
  const supabase = createClient();
  const { data:user, error: userError } = await getUser();
  let error = userError;

  if (user) {
    const { error: postingError } = await supabase
      .from('drafts')
      .insert([{ title, content }]);

    error = postingError;
  }

  return { error };
}
