variable "cloudflare_account_id" {
  description = "Cloudflare account that owns the zone and R2 bucket."
  type        = string
}

variable "domain" {
  description = "Authoritative DNS zone for the personal site."
  type        = string
  default     = "marcusv.me"
}

variable "state_bucket_name" {
  description = "R2 bucket used exclusively for Terraform state and backups."
  type        = string
  default     = "infra"

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$", var.state_bucket_name))
    error_message = "state_bucket_name must be a valid lowercase R2 bucket name."
  }
}
