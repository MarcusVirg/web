#!/usr/bin/env bash

set -euo pipefail

if [[ $# -ne 2 ]]; then
	echo "Usage: $0 <common|home> <saved-plan>" >&2
	exit 64
fi

stack="$1"
case "$stack" in
	common | home) ;;
	*)
		echo "Stack must be common or home." >&2
		exit 64
		;;
esac

: "${TF_STATE_BUCKET:?Set TF_STATE_BUCKET to the R2 state bucket name.}"
: "${TF_VAR_cloudflare_account_id:?Set TF_VAR_cloudflare_account_id.}"
: "${AWS_ACCESS_KEY_ID:?Set AWS_ACCESS_KEY_ID to the bucket-scoped R2 access key.}"
: "${AWS_SECRET_ACCESS_KEY:?Set AWS_SECRET_ACCESS_KEY to the bucket-scoped R2 secret.}"

repository_directory="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
stack_directory="${repository_directory}/infra/${stack}"
plan_path="$(cd "$(dirname "$2")" && pwd)/$(basename "$2")"

if [[ ! -f "$plan_path" ]]; then
	echo "Saved plan does not exist: ${plan_path}" >&2
	exit 66
fi

state_backup="$(mktemp "${TMPDIR:-/tmp}/personal-web-${stack}-state.XXXXXX")"
trap 'rm -f "$state_backup"' EXIT

terraform -chdir="$stack_directory" state pull >"$state_backup"

timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
endpoint="https://${TF_VAR_cloudflare_account_id}.r2.cloudflarestorage.com"
backup_key="backups/${stack}/${timestamp}.tfstate"

aws s3 cp "$state_backup" "s3://${TF_STATE_BUCKET}/${backup_key}" \
	--endpoint-url "$endpoint" \
	--no-progress

echo "Backed up current state to r2://${TF_STATE_BUCKET}/${backup_key}"
terraform -chdir="$stack_directory" apply "$plan_path"
