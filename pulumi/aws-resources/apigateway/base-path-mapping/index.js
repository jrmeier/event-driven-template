'use strict'
const pulumi = require('@pulumi/pulumi')
const aws = require('@pulumi/aws')
const awsx = require('@pulumi/awsx')

const env = pulumi.getStack()
const config = new pulumi.Config()
const aws_region = config.require('aws_region')
const s3_backend = `pulumi-state-workflows-${aws_region}`
const caller_identity = aws.getCallerIdentity({})
const account_id = caller_identity.then((current) => current.accountId)
const domainName = config.require('domainName')
const apiRestId = config.require('apiRestId')

const apiRestBasePathMapping = new aws.apigateway.BasePathMapping(
  'apiRestBasePathMapping',
  {
    restApi: apiRestId,
    stageName: env,
    domainName: domainName
  }
)
