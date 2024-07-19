"use server";
import { cropAvatar, getAvatarUrl } from "@/utils/server";
import { createClient } from "@/supabase/server";

import { AuthData, AuthError } from "./types";

/* ========================================================================== */
/*                                   Reading                                  */
/* ========================================================================== */

export async function getProfile() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user || error)
    return { data: null, error };

  return await supabase
    .from('profiles')
    .select()
    .eq('id', user.id)
    .single();
}

export async function getPublicProfile(identifier:string) {
  const supabase = createClient();

  return await supabase
    .from('profiles')
    .select('username, display_name, avatar, bio, created_at')
    .eq('identifier', identifier.toLowerCase())
    .single();
}

/* ========================================================================== */
/*                                  Updating                                  */
/* ========================================================================== */

export async function editProfile(partialUser:{ display_name?: string | null; bio?: string; }) {
  const supabase = createClient();
  const { data:{ user }, error } = await supabase.auth.getUser();

  if (!user || error)
    return { data: null, error };

  const trimmed = {
    display_name: partialUser.display_name?.trim() as string | null | undefined,
    bio: partialUser.bio?.trim(),
  };

  if (trimmed.display_name === "")
    trimmed.display_name = null;

  return await supabase
    .from('profiles')
    .update(trimmed)
    .eq('id', user.id)
    .select()
    .single();
}

export async function editAvatar(base64Image:string) {
  // const supabase = createClient();
  const { data:user, error } = await getProfile();

  if (!user)
    // return { data: null, error };
    return null;

  const cropped = (await cropAvatar(base64Image));

  if (!cropped)
    // return { data: null, error: null };
    return null;

  const blob = await (await fetch(cropped)).blob();
  const file = new File([blob], `${user.identifier}-avatar@256px`, { type: 'image/png' });

  // ! TEMPORARY
  return cropped;

  // return await supabase.storage
  //   .from('avatars')
  //   .upload(file.name, file);
}

/* ========================================================================== */
/*                                Authorization                               */
/* ========================================================================== */

const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[?!@#$%~^&()\[\]\{\}\.\,\-\+\*\/=\\]).{1,}$/;

function getURL() {
  let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000/';
  url = url.startsWith('http') ? url : `https://${url}`;
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
}

export async function signUp(username:string, email:string, password:string) {
  const supabase = createClient();
  const avatar   = await getAvatarUrl(username);

  let data:AuthData | null = null;
  let error:AuthError | null = null;

  if (emailRegex.test(email) && password.length > 7 && passwordRegex.test(password)) {
    const { data: dt, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getURL(),
        data: { username, avatar }
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

  let data:AuthData | null = null;
  let error:AuthError | null = null;

  if (emailRegex.test(email) && password.length > 7 && passwordRegex.test(password)) {
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
