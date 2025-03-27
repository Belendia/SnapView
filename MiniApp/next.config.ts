import type { NextConfig } from "next";
import "@/lib/env-check";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "am"],
    defaultLocale: "en",
  },
};

export default nextConfig;
