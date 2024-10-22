import { result } from '@/utils/api';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type UserPosts = Tables<'posts'>[];
export type UserPostsParams = { id:string };

export async function getUserPosts(what:'author_uuid' | 'author', value:string) {
  const supabase = createClient();

  const res = await supabase
    .from('posts')
    .select('*')
    .eq(what, value)
    .order('timestamp', { ascending: false });

  return result<UserPosts | null>(res.data, res.error);
}
