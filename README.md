# @wacht/backend

Runtime-agnostic backend SDK for Wacht.

## Install

```bash
pnpm add @wacht/backend
```

## Create Clients

```ts
import { WachtClient } from "@wacht/backend";

const client = new WachtClient({
  apiKey: process.env.WACHT_API_KEY!,
});

const users = await client.users.listUsers({ limit: 10, offset: 0 });
```

Multiple instances are supported:

```ts
const clientA = new WachtClient({ apiKey: "key-a", name: "a" });
const clientB = new WachtClient({ apiKey: "key-b", name: "b" });
```

## Optional Global Client

```ts
import { initClient, getClient } from "@wacht/backend";

initClient({ apiKey: process.env.WACHT_API_KEY! });
const client = getClient();
```

## Named Client Store

```ts
import { createClientStore, WachtClient } from "@wacht/backend";

const store = createClientStore();
new WachtClient({ apiKey: "wk_live_1", name: "primary", store });

const primary = store.get("primary");
```

## Framework/Auth Primitives

`@wacht/backend` includes server auth primitives used by framework SDKs:
- `getAuth(request, options?)`
- `getAuthFromToken(token, options?)`
- `requireAuth(request, options?)`
- `authenticateRequest(request, options?)`
- `verifyAuthToken(token, options?)`

Utility exports:
- `parseFrontendApiUrlFromPublishableKey(...)`
- `toSessionPrincipalIdentity(...)`
- `toSessionPrincipalMetadata(...)`

## Gateway Authz (API key + OAuth access token)

```ts
import { gateway } from "@wacht/backend";

const authz = await gateway.checkPrincipalAuthz({
  principalType: "api_key",
  principalValue: "wk_live_xxx",
  method: "GET",
  resource: "/v1/private",
});

const principal = gateway.resolveGatewayPrincipalContext(authz);
if (principal) {
  console.log(principal.identity.app_slug);
}
```

OAuth token:

```ts
await gateway.verifyOauthAccessTokenRequest(
  "oauth_access_token",
  "POST",
  "/v1/private",
);
```

## License

Licensed under the Apache License, Version 2.0. See [LICENSE.md](LICENSE.md).
