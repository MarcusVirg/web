terraform {
  required_version = "~> 1.14.0"

  backend "s3" {}

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.22.0"
    }
  }
}

provider "cloudflare" {}
