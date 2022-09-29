# Luhn validation and generation with AWS Lambda

Validation and control key generation for credit cards (and more) using Luhn algorithm.

Project utilises Terraform (v1.3.1) for provisioning cloud resources. Powered by TypeScript, ESlint, Prettier, Jest and Husky.

## What gets provisioned?

- API Gateway
- Lambda

## Preparation

- `nvm use` for setting proper Node.js version (Gallium LTS)
- `yarn install` for installing dependencies
- `yarn prepare` for installing Husky pre-push hook
- Modify `terraform/remote-state.tf` with your S3 bucket details where Terraform remote state is stored
  - Remove this file if you intend to use local state for testing purposes
  - More info at [Terraform S3](https://www.terraform.io/docs/language/settings/backends/s3.html)

## Deployment 🚀

- Run `yarn test` to run Jest tests
- Run `yarn lint` to lint TS code using both ESLint and Prettier working together
- Run `yarn script:build-layer` this will run a bash script to zip up production dependencies and add them to the lamba as a layer
- Run `yarn build` to run TSC to compile TS code to plain JS
- Run `yarn cleanup` to remove generated files after deployment steps
- Run `yarn tf:init` to get aws provider plugin downloaded
- Run `yarn tf:plan` to see changes that will be made
- Run `yarn tf:apply` to actually make those changes to your provider
- Visit AWS and see all your services provisioned via terraform
- Run `yarn tf:destroy` to destroy all the services that were built

You can also simply call `yarn deploy` to run tests, zip up an archive and provision the resources together. Similarly you could run `yarn destroy-deploy` to destroy all resources and re-provision them.

## Invoking Lambda

- Run `aws lambda invoke --region=eu-central-1 --function-name=luhn-generator-dev response.json`
