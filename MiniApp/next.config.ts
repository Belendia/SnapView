import type { NextConfig } from "next";
import "@/lib/env-check";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/i18n.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
