<h1 align="center">
  <a href="https://wacht.dev" style="text-decoration:none;">@wacht/backend</a>
</h1>

<p align="center">Backend SDK for Wacht APIs, server authentication, gateway authorization, and webhook verification.</p>

<p align="center">
  <a href="https://docs.wacht.dev">Documentation</a> |
  <a href="https://www.npmjs.com/package/@wacht/backend">npm</a> |
  <a href="https://github.com/wacht-platform">GitHub</a>
</p>

## What this package provides

`@wacht/backend` includes both:

- An API client for Wacht backend resources
- Server-side auth primitives for session/API-key/OAuth token verification

It is designed to run in server runtimes with `fetch` support.

## Install

```bash
pnpm add @wacht/backend
```

## Client usage

Create explicit client instances:

```ts
import { WachtClient } from "@wacht/backend";

const client = new WachtClient({
  apiKey: process.env.WACHT_API_KEY!,
});

const users = await client.users.listUsers({ limit: 10, offset: 0 });
```

Or use a named client store:

```ts
import { createClientStore, WachtClient } from "@wacht/backend";

const store = createClientStore();

new WachtClient({
  name: "primary",
  apiKey: process.env.WACHT_API_KEY!,
  store,
});

const client = store.get("primary");
```

## Server authentication utilities

- `authenticateRequest`
- `getAuth`
- `requireAuth`
- `getAuthFromToken`
- `requireAuthFromToken`
- `verifyAuthToken`

`parseFrontendApiUrlFromPublishableKey` is available to derive the frontend API URL from a publishable key when needed.

## Gateway authorization

```ts
import { gateway } from "@wacht/backend";

const result = await gateway.checkPrincipalAuthz({
  principalType: "api_key",
  principalValue: "wk_live_xxx",
  method: "GET",
  resource: "/v1/private",
});
```

## Webhook verification

```ts
import { verifyWebhookSignature } from "@wacht/backend";

const event = verifyWebhookSignature(rawBody, headers, webhookSecret);
```

## Development

```bash
pnpm build
pnpm test
pnpm lint
```

## License

Apache License 2.0. See [LICENSE.md](./LICENSE.md).
