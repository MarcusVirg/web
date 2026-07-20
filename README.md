# Marcus Virginia Web monorepo

The home site is deployed as a Cloudflare Worker with static assets. Cloudflare
infrastructure is managed in `infra/common` and `infra/home`; start with
[`infra/README.md`](infra/README.md).

Need this package override until [this issue](https://github.com/sveltejs/vite-plugin-svelte/issues/1053#issuecomment-2550024545) is resolved

```json
"overrides": {
  "esrap": "~1.2.0"
}
```
