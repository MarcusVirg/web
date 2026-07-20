data "cloudflare_zone" "primary" {
  filter = {
    account = {
      id = var.cloudflare_account_id
    }
    name = var.domain
  }
}

resource "cloudflare_worker" "home" {
  account_id = var.cloudflare_account_id
  name       = var.worker_name
  tags       = ["managed-by:terraform", "project:home"]

  observability = {
    enabled            = true
    head_sampling_rate = 1
    logs = {
      enabled            = true
      head_sampling_rate = 1
      invocation_logs    = true
      persist            = true
    }
  }
}

resource "cloudflare_d1_database" "comments" {
  account_id            = var.cloudflare_account_id
  name                  = "marcusv-home"
  primary_location_hint = "enam"
  read_replication = {
    mode = "disabled"
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "cloudflare_workers_custom_domain" "home" {
  for_each = var.custom_domains_enabled ? toset([var.domain, "www.${var.domain}"]) : toset([])

  account_id = var.cloudflare_account_id
  hostname   = each.value
  service    = cloudflare_worker.home.name
  zone_id    = data.cloudflare_zone.primary.id
}
