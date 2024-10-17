import { NextRequest } from 'next/server';

import { badRequest, ErrorAPI, notFound, result, success } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type UserInfo = Tables<'profiles'> & { mail_confirmed: boolean };
export type UserInfoParams = { id:string } | { username:string };

export async function getUserInfo(what:'id' | 'identifier', value:string) {
  'use server';
  const supabase = createClient();

  const userRes = await supabase
    .from('profiles')
    .select('*')
    .eq(what, value)
    .single();

  if (userRes.error)
    return result(null, userRes.error);
  
  const confRes = await supabase.rpc('is_confirmed', { id: userRes.data.id });
  
  if (confRes.error)
    return result(null, confRes.error);

  return result<UserInfo>({ ...userRes.data, mail_confirmed: confRes.data }, null);
}

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.has('id')) {
    const id = params.get('id')!;
    const res = await getUserInfo('id', id);

    if (res.error)
      return notFound(res.error, headers);

    return success<UserInfo>(res.data, headers);
  }

  if (params.has('username')) {
    const username = params.get('username')!;
    const res = await getUserInfo('identifier', username.toLowerCase());

    if (res.error)
      return notFound(res.error, headers);

    return success<UserInfo>(res.data, headers);
  }

  return badRequest("Missing 'id' or 'username' parameter", headers);
}
