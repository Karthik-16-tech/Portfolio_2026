// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Vercel sets VERCEL=1; build:vercel is used when testing the Vercel static output locally.
const isVercel =
  process.env.VERCEL === "1" || process.env.npm_lifecycle_event === "build:vercel";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
    ...(isVercel
      ? {
          prerender: {
            enabled: true,
            crawlLinks: true,
          },
        }
      : {}),
  },
});
