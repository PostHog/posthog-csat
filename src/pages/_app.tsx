import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { env } from "~/env";

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined') {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false
  })
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <PostHogProvider client={posthog}>
      <Component {...pageProps} />
    </PostHogProvider>
  );
};

export default MyApp;
