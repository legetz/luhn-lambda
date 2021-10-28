terraform {
    backend "s3" {
        bucket = "leo-terraform-state"
        key    = "terraform.tfstate"
        region = "eu-central-1"
    }
}