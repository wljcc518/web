import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const gitHubPagesBasePath = process.env.GITHUB_PAGES_BASE_PATH ?? "/web";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: isGitHubPages,
  basePath: isGitHubPages ? gitHubPagesBasePath : "",
  assetPrefix: isGitHubPages && gitHubPagesBasePath
    ? `${gitHubPagesBasePath}/`
    : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
