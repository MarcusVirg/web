output "zone_id" {
  description = "Cloudflare zone ID for marcusv.me."
  value       = cloudflare_zone.primary.id
}

output "zone_status" {
  description = "Zone activation status."
  value       = cloudflare_zone.primary.status
}

output "name_servers" {
  description = "Nameservers to configure at Namecheap."
  value       = cloudflare_zone.primary.name_servers
}

output "state_bucket_name" {
  description = "R2 bucket containing Terraform state."
  value       = cloudflare_r2_bucket.terraform_state.name
}
