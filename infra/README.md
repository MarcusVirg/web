# Cloudflare infrastructure

Terraform owns the Cloudflare zone, DNS records, state bucket, Worker container,
D1 database, and custom domains. Wrangler owns Worker code, assets, bindings,
secrets, versions, and deployments. Do not manage a resource in both tools.

Install Terraform 1.14.x, Node.js/npm, the AWS CLI, and OpenSSL before starting.

## 1. Authenticate

Find the Cloudflare account ID in **Account home > Account details**, then export
it for Terraform:

```sh
export TF_VAR_cloudflare_account_id="your-32-character-account-id"
```

Terraform uses a custom Cloudflare API token. Create one under **My Profile >
API Tokens > Create Custom Token**. During bootstrap, scope it to the intended
account and grant only:

- Account: Workers Scripts Edit, D1 Edit, and Workers R2 Storage Edit.
- Zone: Zone Edit, DNS Edit, Zone Settings Edit, and Workers Routes Edit.

Zone creation requires the Zone permissions to cover all zones in the selected
account. After `marcusv.me` exists in Cloudflare, replace the bootstrap token
with narrower common/home tokens scoped to that zone. Load a token without
committing it:

```sh
read -r -s CLOUDFLARE_API_TOKEN
export CLOUDFLARE_API_TOKEN
```

Wrangler can use that environment variable too. For day-to-day Wrangler use,
an encrypted OAuth profile is more convenient:

```sh
npm exec --workspace sites/home -- wrangler auth create personal
npm exec --workspace sites/home -- wrangler auth activate personal "$PWD/sites/home"
```

`CLOUDFLARE_API_TOKEN` takes precedence over the activated Wrangler profile.

## 2. Bootstrap common and R2 state

The state bucket cannot be its own backend until it exists, so the first common
apply intentionally uses local state:

```sh
terraform -chdir=infra/common init -backend=false
terraform -chdir=infra/common fmt -check
terraform -chdir=infra/common validate
terraform -chdir=infra/common plan -out=.terraform/common-bootstrap.tfplan
terraform -chdir=infra/common apply .terraform/common-bootstrap.tfplan
```

Review the saved plan before applying it. The apply creates the zone, TXT
records, HTTPS settings, R2 bucket, backup retention, and backup lifecycle.
If the zone is already in Cloudflare, import its zone ID before planning instead
of trying to create it:

```sh
terraform -chdir=infra/common import cloudflare_zone.primary "your-zone-id"
```

In **R2 > Manage API Tokens**, create an **Object Read & Write** token scoped
only to `marcusv-terraform-state`. This token is for the S3-compatible state
backend and is separate from `CLOUDFLARE_API_TOKEN`:

```sh
export AWS_ACCESS_KEY_ID="your-r2-access-key-id"
read -r -s AWS_SECRET_ACCESS_KEY
export AWS_SECRET_ACCESS_KEY
export TF_STATE_BUCKET="marcusv-terraform-state"
```

Create the ignored backend configuration and replace the account ID placeholder:

```sh
cp infra/common/backend.hcl.example infra/common/backend.hcl
```

Migrate and verify the common state:

```sh
terraform -chdir=infra/common init -migrate-state -backend-config=backend.hcl
terraform -chdir=infra/common state pull
terraform -chdir=infra/common output name_servers
```

Only remove local `terraform.tfstate*` files after `state pull` succeeds.

## 3. Initialize home

Copy the home backend template, replace its account ID placeholder, and initialize:

```sh
cp infra/home/backend.hcl.example infra/home/backend.hcl
terraform -chdir=infra/home init -backend-config=backend.hcl
terraform -chdir=infra/home fmt -check
terraform -chdir=infra/home validate
```

Custom domains require both an active zone and an already-deployed Worker. The
first home apply therefore creates only the Worker container and D1:

```sh
terraform -chdir=infra/home plan \
  -var='custom_domains_enabled=false' \
  -out=.terraform/home-bootstrap.tfplan
terraform -chdir=infra/home apply .terraform/home-bootstrap.tfplan
```

## 4. Initialize D1 and deploy the Worker

Generate a strong admin token in an ignored secrets file:

```sh
printf 'COMMENT_ADMIN_TOKEN=' >sites/home/.env.production
openssl rand -hex 32 >>sites/home/.env.production
```

Apply the schema and make the first deployment. The configuration script reads
the real D1 ID from the home Terraform output and refuses to deploy if it cannot:

```sh
npm run --workspace sites/home cloudflare:d1:migrate
npm run --workspace sites/home cloudflare:deploy:first
```

The first deployment uploads `COMMENT_ADMIN_TOKEN` as a Worker secret. Later
deployments preserve it and use:

```sh
npm run --workspace sites/home cloudflare:deploy
```

For local D1 and Worker development:

```sh
printf 'COMMENT_ADMIN_TOKEN=local-development-only\n' >sites/home/.dev.vars
npm run --workspace sites/home cloudflare:d1:migrate:local
npm run --workspace sites/home cloudflare:dev
```

## 5. Activate DNS and custom domains

Set the nameservers printed by `infra/common` at Namecheap. When the common
output reports `active`, create the custom domains with the normal home plan:

```sh
terraform -chdir=infra/common plan -refresh-only \
  -out=.terraform/common-refresh.tfplan
terraform show infra/common/.terraform/common-refresh.tfplan
./infra/scripts/apply.sh common infra/common/.terraform/common-refresh.tfplan
terraform -chdir=infra/common output zone_status
terraform -chdir=infra/home plan -out=.terraform/home.tfplan
terraform show infra/home/.terraform/home.tfplan
./infra/scripts/apply.sh home infra/home/.terraform/home.tfplan
```

The apply wrapper refuses to apply unless it first uploads a timestamped copy of
the current state to `backups/<stack>/` in R2. Use the same saved-plan pattern and
wrapper for future common changes.

## Routine checks

```sh
terraform -chdir=infra/common fmt -check
terraform -chdir=infra/common validate
terraform -chdir=infra/home fmt -check
terraform -chdir=infra/home validate
npm run --workspace sites/home cloudflare:types
npm run --workspace sites/home cloudflare:dry-run
```

R2 backend credentials and Cloudflare API tokens must remain in the environment
or a password manager. Never put them in `backend.hcl`, `.tfvars`, Wrangler
configuration, or source control.
