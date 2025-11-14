// import { NextRequest } from 'next/server';

import { notFound, success } from '@/utils/api';
import { createClient } from '@/supabase/admin';

export async function GET() {
  const supabase = createClient();

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const posts = await supabase
    .from('posts')
    .select('*', { count:'estimated' });

  const profiles = await supabase
    .from('profiles')
    .select('*', { count:'estimated' });

  const user = await supabase
    .from('profiles')
    .select('username, finesse')
    .order('finesse', { ascending:false })
    .limit(1)
    .single();

  if (posts.error || profiles.error || user.error)
    return notFound(posts.error || profiles.error || user.error!);

  const string = `Found: ${posts.count} posts, ${profiles.count} profiles, and 0 bitches you got. `
    + `User with highest finesse u:${user.data.username} (${user.data.finesse}Wp)`;

  return success(string, headers);
}
