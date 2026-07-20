output "worker_name" {
  description = "Worker name used by Wrangler."
  value       = cloudflare_worker.home.name
}

output "d1_database_id" {
  description = "D1 ID injected into the generated Wrangler configuration."
  value       = cloudflare_d1_database.comments.id
}

output "d1_database_name" {
  description = "D1 database name."
  value       = cloudflare_d1_database.comments.name
}

output "custom_domains" {
  description = "Production domains managed by Terraform."
  value       = sort([for domain in cloudflare_workers_custom_domain.home : domain.hostname])
}
