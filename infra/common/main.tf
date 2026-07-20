resource "cloudflare_zone" "primary" {
  account = {
    id = var.cloudflare_account_id
  }
  name = var.domain
  type = "full"

  lifecycle {
    prevent_destroy = true
  }
}

resource "cloudflare_dns_record" "openai_verification" {
  zone_id = cloudflare_zone.primary.id
  name    = var.domain
  type    = "TXT"
  content = "openai-domain-verification=dv-Wrw3wOpU5vnqndNIkqXhRhiK"
  ttl     = 1
  proxied = false
  comment = "OpenAI domain verification; managed by Terraform"
}

resource "cloudflare_dns_record" "google_verification" {
  zone_id = cloudflare_zone.primary.id
  name    = var.domain
  type    = "TXT"
  content = "google-site-verification=cFFEWSIM8viX6bexrOlzdRsqbvh4MEh7RjliVg7oPOE"
  ttl     = 1
  proxied = false
  comment = "Google domain verification; managed by Terraform"
}

resource "cloudflare_zone_setting" "always_use_https" {
  zone_id    = cloudflare_zone.primary.id
  setting_id = "always_use_https"
  value      = "on"
}

resource "cloudflare_zone_setting" "minimum_tls" {
  zone_id    = cloudflare_zone.primary.id
  setting_id = "min_tls_version"
  value      = "1.2"
}

resource "cloudflare_r2_bucket" "terraform_state" {
  account_id    = var.cloudflare_account_id
  name          = var.state_bucket_name
  location      = "enam"
  storage_class = "Standard"

  lifecycle {
    prevent_destroy = true
  }
}

resource "cloudflare_r2_bucket_lock" "terraform_backups" {
  account_id  = var.cloudflare_account_id
  bucket_name = cloudflare_r2_bucket.terraform_state.name

  rules = [{
    id      = "Retain Terraform state backups for 30 days"
    enabled = true
    prefix  = "backups/"
    condition = {
      type            = "Age"
      max_age_seconds = 2592000
    }
  }]
}

resource "cloudflare_r2_bucket_lifecycle" "terraform_backups" {
  account_id  = var.cloudflare_account_id
  bucket_name = cloudflare_r2_bucket.terraform_state.name

  rules = [{
    id      = "Delete Terraform state backups after 90 days"
    enabled = true
    conditions = {
      prefix = "backups/"
    }
    delete_objects_transition = {
      condition = {
        type    = "Age"
        max_age = 7776000
      }
    }
  }]
}
