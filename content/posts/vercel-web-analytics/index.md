+++
date = '2025-12-23T00:00:00+08:00'
draft = false
title = 'Getting started with Vercel Web Analytics'
categories = ["技术分享", "Vercel"]
tags = ["Vercel", "Web Analytics", "教程"]
summary = "A comprehensive guide to getting started with Vercel Web Analytics, including installation, configuration, and deployment instructions for various frameworks."
+++

# Getting started with Vercel Web Analytics

This guide will help you get started with using Vercel Web Analytics on your project, showing you how to enable it, add the package to your project, deploy your app to Vercel, and view your data in the dashboard.

**Select your framework to view instructions on using the Vercel Web Analytics in your project**.

## Prerequisites

- A Vercel account. If you don't have one, you can [sign up for free](https://vercel.com/signup).
- A Vercel project. If you don't have one, you can [create a new project](https://vercel.com/new).
- The Vercel CLI installed. If you don't have it, you can install it using the following command:

### Install Vercel CLI

```bash
# Using pnpm
pnpm i vercel

# Using yarn
yarn i vercel

# Using npm
npm i vercel

# Using bun
bun i vercel
```

## Enable Web Analytics in Vercel

On the [Vercel dashboard](/dashboard), select your Project and then click the **Analytics** tab and click **Enable** from the dialog.

> **💡 Note:** Enabling Web Analytics will add new routes (scoped at `/_vercel/insights/*`) after your next deployment.

## Add `@vercel/analytics` to your project

Using the package manager of your choice, add the `@vercel/analytics` package to your project:

### Install @vercel/analytics

```bash
# Using pnpm
pnpm i @vercel/analytics

# Using yarn
yarn i @vercel/analytics

# Using npm
npm i @vercel/analytics

# Using bun
bun i @vercel/analytics
```

## Add the Analytics component to your app

### For Next.js (pages directory)

The `Analytics` component is a wrapper around the tracking script, offering more seamless integration with Next.js, including route support.

If you are using the `pages` directory, add the following code to your main app file:

**TypeScript version (pages/_app.tsx):**
```typescript
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
```

**JavaScript version (pages/_app.js):**
```javascript
import { Analytics } from "@vercel/analytics/next";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
```

### For Next.js (app directory)

The `Analytics` component is a wrapper around the tracking script, offering more seamless integration with Next.js, including route support.

Add the following code to the root layout:

**TypeScript version (app/layout.tsx):**
```typescript
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**JavaScript version (app/layout.jsx):**
```javascript
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### For Remix

The `Analytics` component is a wrapper around the tracking script, offering a seamless integration with Remix, including route detection.

Add the following code to your root file:

**TypeScript version (app/root.tsx):**
```typescript
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/remix";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Analytics />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

**JavaScript version (app/root.jsx):**
```javascript
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/remix";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Analytics />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

### For Nuxt

The `Analytics` component is a wrapper around the tracking script, offering more seamless integration with Nuxt, including route support.

Add the following code to your main component.

**TypeScript version (app.vue):**
```typescript
<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
</script>

<template>
  <Analytics />
  <NuxtPage />
</template>
```

**JavaScript version (app.vue):**
```javascript
<script setup>
import { Analytics } from '@vercel/analytics/nuxt';
</script>

<template>
  <Analytics />
  <NuxtPage />
</template>
```

### For SvelteKit

The `injectAnalytics` function is a wrapper around the tracking script, offering more seamless integration with SvelteKit.js, including route support.

Add the following code to the main layout:

**TypeScript version (src/routes/+layout.ts):**
```typescript
import { dev } from "$app/environment";
import { injectAnalytics } from "@vercel/analytics/sveltekit";

injectAnalytics({ mode: dev ? "development" : "production" });
```

**JavaScript version (src/routes/+layout.js):**
```javascript
import { dev } from "$app/environment";
import { injectAnalytics } from "@vercel/analytics/sveltekit";

injectAnalytics({ mode: dev ? "development" : "production" });
```

### For Astro

The `Analytics` component is a wrapper around the tracking script, offering more seamless integration with Astro, including route support.

Add the following code to your base layout:

**TypeScript version (src/layouts/Base.astro):**
```typescript
---
import Analytics from '@vercel/analytics/astro';
{/* ... */}
---

<html lang="en">
	<head>
      <meta charset="utf-8" />
      <!-- ... -->
      <Analytics />
	</head>
	<body>
		<slot />
    </body>
</html>
```

**JavaScript version (src/layouts/Base.astro):**
```javascript
---
import Analytics from '@vercel/analytics/astro';
{/* ... */}
---

<html lang="en">
	<head>
      <meta charset="utf-8" />
      <!-- ... -->
      <Analytics />
	</head>
	<body>
		<slot />
    </body>
</html>
```

> **💡 Note:** The `Analytics` component is available in version `@vercel/analytics@1.4.0` and later.
> If you are using an earlier version, you must configure the `webAnalytics` property of the Vercel adapter in your `astro.config.mjs` file as shown below.
> For further information, see the [Astro adapter documentation](https://docs.astro.build/en/guides/integrations-guide/vercel/#webanalytics).

**astro.config.mjs (TypeScript version):**
```typescript
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true, // set to false when using @vercel/analytics@1.4.0
    },
  }),
});
```

**astro.config.mjs (JavaScript version):**
```javascript
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true, // set to false when using @vercel/analytics@1.4.0
    },
  }),
});
```

### For Plain HTML

For plain HTML sites, you can add the following script to your `.html` files:

```html
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

> **💡 Note:** When using the HTML implementation, there is no need to install the `@vercel/analytics` package. However, there is no route support.

### For Other Frameworks

Import the `inject` function from the package, which will add the tracking script to your app. **This should only be called once in your app, and must run in the client**.

> **💡 Note:** There is no route support with the `inject` function.

Add the following code to your main app file:

**TypeScript version (main.ts):**
```typescript
import { inject } from "@vercel/analytics";

inject();
```

**JavaScript version (main.js):**
```javascript
import { inject } from "@vercel/analytics";

inject();
```

### For Create React App

The `Analytics` component is a wrapper around the tracking script, offering more seamless integration with React.

> **💡 Note:** When using the plain React implementation, there is no route support.

Add the following code to the main app file:

**TypeScript version (App.tsx):**
```typescript
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div>
      {/* ... */}
      <Analytics />
    </div>
  );
}
```

**JavaScript version (App.jsx):**
```javascript
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div>
      {/* ... */}
      <Analytics />
    </div>
  );
}
```

### For Vue

The `Analytics` component is a wrapper around the tracking script, offering more seamless integration with Vue.

> **💡 Note:** Route support is automatically enabled if you're using `vue-router`.

Add the following code to your main component:

**TypeScript version (src/App.vue):**
```typescript
<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <Analytics />
  <!-- your content -->
</template>
```

**JavaScript version (src/App.vue):**
```javascript
<script setup>
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <Analytics />
  <!-- your content -->
</template>
```

## Deploy your app to Vercel

Deploy your app using the following command:

```bash
vercel deploy
```

If you haven't already, we also recommend [connecting your project's Git repository](/docs/git#deploying-a-git-repository), which will enable Vercel to deploy your latest commits to main without terminal commands.

Once your app is deployed, it will start tracking visitors and page views.

> **💡 Note:** If everything is set up properly, you should be able to see a Fetch/XHR request in your browser's Network tab from `/_vercel/insights/view` when you visit any page.

## View your data in the dashboard

Once your app is deployed, and users have visited your site, you can view your data in the dashboard.

To do so, go to your [dashboard](/dashboard), select your project, and click the **Analytics** tab.

After a few days of visitors, you'll be able to start exploring your data by viewing and [filtering](/docs/analytics/filtering) the panels.

Users on Pro and Enterprise plans can also add [custom events](/docs/analytics/custom-events) to their data to track user interactions such as button clicks, form submissions, or purchases.

Learn more about how Vercel supports [privacy and data compliance standards](/docs/analytics/privacy-policy) with Vercel Web Analytics.

## Next steps

Now that you have Vercel Web Analytics set up, you can explore the following topics to learn more:

- [Learn how to use the `@vercel/analytics` package](/docs/analytics/package)
- [Learn how to set update custom events](/docs/analytics/custom-events)
- [Learn about filtering data](/docs/analytics/filtering)
- [Read about privacy and compliance](/docs/analytics/privacy-policy)
- [Explore pricing](/docs/analytics/limits-and-pricing)
- [Troubleshooting](/docs/analytics/troubleshooting)
