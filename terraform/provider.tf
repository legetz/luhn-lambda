terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.32.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = ">= 2.2.0"
    }
  }

  required_version = "~> 1.0.9"
}

provider "aws" {
  profile     = var.aws_profile
  region      = var.aws_region
  max_retries = 1
}
