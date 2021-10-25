# Luhn

Validation and control key generation for credit cards (and more) using Luhn algorithm.

Project utilises Terraform (v1.0.9) for provisioning cloud resources. Powered by TypeScript, ESlint, Prettier and Husky.

## What gets provisioned?

- API Gateway
- Lambda

## Deployment 🚀

- Run `yarn lint` to lint TS code using both ESLint and Prettier working together
- Run `yarn script:build-layer` this will run a bash script to zip up production dependencies and add them to the lamba as a layer
- Run `yarn build` to run TSC to compile TS code to plain JS
- Run `yarn cleanup` to remove generated files after deployment steps
- Run `yarn tf:init` to get aws provider plugin downloaded
- Run `yarn tf:plan` to see changes that will be made
- Run `yarn tf:apply` to actually make those changes to your provider
- Visit AWS and see all your services provisioned via terraform
- Run `yarn tf:destroy` to destroy all the services that were built

You can also simply call `yarn deploy:all` to both zip up an archive and provision the resources together. Similarly you could run `yarn update:all` to destroy all resources and re-provision them.
