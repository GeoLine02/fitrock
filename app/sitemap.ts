import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const isProduction = process.env.NODE_ENV === "production";

  return [
    {
      url: `${isProduction ? process.env.NEXT_PUBLIC_FRONT_END_URL : "http://localhost:3000"}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${isProduction ? process.env.NEXT_PUBLIC_FRONT_END_URL : "http://localhost:3000"}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${isProduction ? process.env.NEXT_PUBLIC_FRONT_END_URL : "http://localhost:3000"}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${isProduction ? process.env.NEXT_PUBLIC_FRONT_END_URL : "http://localhost:3000"}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
