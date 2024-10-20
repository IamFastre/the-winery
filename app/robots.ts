import { MetadataRoute } from "next";
import { getCurrentURL } from "@/utils/server";
 
export default async function robots(): Promise<MetadataRoute.Robots> {
  const currentURL = await getCurrentURL();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${currentURL}/sitemap.xml`,
  };
}
