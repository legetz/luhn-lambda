locals {
  name          = "luhn-generator"
  author        = "Leo Jokinen"
  lambda_memory = 128

  tags = {
    Git       = "https://github.com/legetz/luhn-lambda"
    ManagedBy = "Terraform"
  }
}
