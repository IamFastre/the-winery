import { MetadataRoute } from 'next';
import { getCurrentURL } from '@/utils/server';
import { createClient } from '@/supabase/admin'; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentURL = await getCurrentURL();
  const supabase = createClient();
  const userSlugs:string[] = [];
  
  const { data: users } = await supabase
    .from('profiles')
    .select('username')
    .order('created_at', { ascending: true })
    .limit(49_900);

  if (users)
    users.forEach(u => userSlugs.push(u.username));  

  return [
    {
      url: `${currentURL}`,
      priority: 1,
    },
    {
      url: `${currentURL}/getting-started`,
      priority: 0.9,
    },
    {
      url: `${currentURL}/auth/signup`,
      priority: 0.8,
    },
    {
      url: `${currentURL}/auth/login`,
      priority: 0.8,
    },
    {
      url: `${currentURL}/compose`,
      priority: 0.7,
    },
    {
      url: `${currentURL}/profile`,
      priority: 0.7,
    },
    {
      url: `${currentURL}/profile/drafts`,
      priority: 0.6,
    },
    {
      url: `${currentURL}/search`,
      priority: 0.7,
    },
    ...userSlugs.map(slug => ({
      url: `${currentURL}/u/${slug}`,
      priority: 0.75,
    })),
  ];
}
