import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { redirects as redirectRules } from "./redirects";

const nextConfig: NextConfig = {
  // .mdx so blog posts can live at app/blog/<slug>/page.mdx and get routing for free.
  pageExtensions: ["ts", "tsx", "mdx"],

  turbopack: {
    // Pin the workspace root. There is an unrelated package-lock.json in the user's home
    // directory, and Turbopack's multi-lockfile heuristic walks up and picks that one —
    // which puts the whole home directory under filesystem watch and makes the inferred
    // root depend on who checked the repo out. Pinning it here is machine-independent.
    root: import.meta.dirname,
  },

  async redirects() {
    return redirectRules;
  },
};

// Turbopack (default in 16) needs remark/rehype plugins named as strings, not imported
// functions. remark-gfm adds GitHub-flavoured markdown table syntax — without it a pipe
// table in a post renders as a literal line of "|" characters instead of a <table>.
const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
  },
});

export default withMDX(nextConfig);
