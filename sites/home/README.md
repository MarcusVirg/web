# Personal Site

## Website Infrastructure

The website itself is a static site running little Javascript.

Cloudflare Workers serves the generated Astro assets and the comment API. The
comment system uses Cloudflare D1 for storage and rate limiting. Terraform owns
the durable Cloudflare resources; see [`../../infra/README.md`](../../infra/README.md)
for authentication, initialization, deployment, and DNS cutover instructions.
