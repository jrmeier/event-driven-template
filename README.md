# SERVICE

This is a monorepo managed with yarn and lerna. Each lambda will be independantly versioned and deployed but with the benifits of all the code in a single repository.

## Conventions

Packages (lambda functions) should be in folders named the same as the serverless service name.

Packages ending with "endpoint" are HTTP endpoints and avaliable via API Gateway. Packages ending with "handler" are event driven and called when some event in the bucket happens (ex. file uploaded). See each .severless file for details.

AWS Lambda best practice dictates that we should only be deploying functions within VPC if the
function depends on resources within the VPC (i.e. data). If the Lambda is a pure function
with no side effects or internal resource access it should not be housed within the VPC. This helps to reduce cold start times for the function as well as reducing AWS resource usage.

## Development

`yarn start-db`: Run once if DB_URI isn't on.
`yarn dev`: Runs all serverless endpoints locally.
`yarn dev --printConfig`: for debugging local serverless offline configs.

This project utilizes `serverless-offline` and `serverless-bundle`.

Serverless offline allows for mocking Lambda infrastructure locally.

Serverless bundle uses webpack to bunlde each lambda with latest best configs.

## Development DB_URI

```zsh
brew tap mongodb/brew
brew install mongodb-community@4.4
mongod --config /usr/local/etc/mongod.conf &
```

```zsh

```

## Development Config (VSCODE)

The following helper extensions will keep you sane (me too).

ESLint
Prettier
StandardJS

The following config in your workspace json.

```zsh

  "editor.formatOnSave": false,
  "standard.enable": true,
  "standard.autoFixOnSave": true,
  "standard.run": "onType",
  "javascript.updateImportsOnFileMove.enabled": "always",

```

## How It Works

The directory structure like:

```zsh

package.json
/libs
/packages
  /sample-package
    index.js
    package.json
/services
  /service1
    handler.js
    package.json
    serverless.yml
  /service2
    handler.js
    package.json
    serverless.yml

```

This repo is split into 3 directories. Each with a different purpose:

- packages

  These are internal packages that are used in our services. Each contains a `package.json` and can be optionally published to NPM. Any changes to a package should only deploy the service that depends on it.

- services

  These are Serverless services that are deployed. Has a `package.json` and `serverless.yml`.

- libs

  Any common code that you might not want to maintain as a package. Does NOT have a `package.json`. Any changes here should redeploy all our services.

The `packages/` and `services/` directories are Yarn Workspaces.

### Services

Install an NPM package inside a service.

```bash
yarn add some-npm-package
```

Run a function locally.

```bash
serverless invoke local -f get
```

Run tests in a service.

```bash
yarn test
```

Deploy the service.

```bash
serverless deploy
```

Deploy a single function.

```bash
serverless deploy function -f get
```

To add a new service.

```bash
cd services/
serverless install --url https://github.com/AnomalyInnovations/serverless-nodejs-starter --name new-service
cd new-service
yarn
```

### Packages

Since each package has its own `package.json`, you can manage it just like you would any other NPM package.

To add a new package.

```bash
mkdir packages/new-package
yarn init
```

Packages can also be optionally published to NPM.

### Libs

If you need to add any other common code in your repo that won't be maintained as a package, add it to the `libs/` directory. It does not contain a `package.json`. This means that you'll need to install any NPM packages as dependencies in the root.

To install an NPM package at the root.

```bash
yarn add -W some-npm-package
```

## Deployment

We want to ensure that only the services that have been updated get deployed. This means that, if a change is made to:

- services

  Only the service that has been changed should be deployed. For ex, if you change any code in `service1`, then `service2` should not be deployed.

- packages

  If a package is changed, then only the service that depends on this package should be deployed. For ex, if `sample-package` is changed, then `service1` should be deployed.

- libs

  If any of the libs are changed, then all services will get deployed.

### Deployment Algorithm

To implement the above, use the following algorithm in your CI:

1. Run `lerna ls --since ${prevCommitSHA} -all` to list all packages that have changed since the last successful deployment. If this list includes one of the services, then deploy it.
2. Run `git diff --name-only ${prevCommitSHA} ${currentCommitSHA}` to get a list of all the updated files. If they don't belong to any of your Lerna packages (`lerna ls -all`), deploy all the services.
3. Otherwise skip the deployment.

Based on [Lerna + Yarn](https://serverless-stack.com/chapters/using-lerna-and-yarn-workspaces-with-serverless.html)

### Package Configs

We can share config information from the root into each serverless.yml file.

Example:
`services/service1/serverless.yml`

```yaml
provider:
  name: aws
  stage: prod
  runtime: nodejs12.x
  vpc:
    securityGroupIds: ${file(../../root.yml):securityGroupIds}
    subnetIds: ${file(../../root.yml):subnetIds}

  environment: ${file(../../root.yml):environment}
```

`/root.yml`

```yaml
securityGroupIds:
  - 'sg-xxxxx'
subnetIds:
  - 'subnet-xxxxx1'
  - 'subnet-xxxxx2'
  - 'subnet-xxxxx3'
environment:
  KEY1: value1
  KEY2: value2
```

Please note we utilize [serverless-dotenv-plugin](https://www.serverless.com/plugins/serverless-dotenv-plugin) which will auto populate environment variables when there is a .env file present. We will lean on this in our CI/CD pipeline probably. It also may not work well in our current setup, so we will see....

### Further considerations and findings

During CI/CD setup I played with several options that I'll outline.

Current Approach:
Each folder in services is it's own API GW + lambda.
This allows for fine grained release process, but means there is a lot of URLS instead of one url with /facebook-feed or /messenger-messages.
I took this path because we want individual deploys only when they update.
To make this work we need each serverless.yml to have a different service name otherwise it overwrites each time and yucky.
Having different service names means we can deploy in parralel too, yay!

Approach 1:
One service folder for social-ingress with multiple lambas exposed.
I really liked this b/c it was less cruft, however... packaging individually wasn't enough for AWS/Lerna to know (without some cli fuckery, which i may attempt still) what needed updated so it deployed ALL of them which is a non starter and makes this whole thing pointless.

Approach 2:
Multiple service folders but serverless.yml pointing to social-ingress for the service.
This breaks because it overwrites each time with new service deffinition, lameo...

### FAQ & ISSUES

`[hardsource:e7bf5834] Could not freeze...` Blow away your .webpack
`module not found`... if it's a local file relying on a local package make sure you put the local package into package.json for whatever you're working on, then from top level run `yarn` so it'll wire up.
