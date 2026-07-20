variable "cloudflare_account_id" {
  description = "Cloudflare account that owns the home site resources."
  type        = string

  validation {
    condition     = can(regex("^[0-9a-f]{32}$", var.cloudflare_account_id))
    error_message = "cloudflare_account_id must be a 32-character hexadecimal ID."
  }
}

variable "domain" {
  description = "Production domain for the home site."
  type        = string
  default     = "marcusv.me"
}

variable "worker_name" {
  description = "Stable name shared by Terraform and Wrangler."
  type        = string
  default     = "marcusv-home"
}

variable "custom_domains_enabled" {
  description = "Create production custom domains after the first Worker deployment and zone activation."
  type        = bool
  default     = true
}
