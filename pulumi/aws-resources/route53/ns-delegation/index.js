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

const zoneNS = config.requireObject('zoneNS')

const getRootZone = aws.route53.getZone({
  name: 'denim-social.com',
  privateZone: false
})

const subDomainDelegation = new aws.route53.Record(
  `subDomainDelegation-${env}`,
  {
    allowOverwrite: true,
    name: domainName,
    ttl: 172800,
    type: 'NS',
    zoneId: getRootZone.then((rootZone) => rootZone.zoneId),
    records: zoneNS
  }
)
