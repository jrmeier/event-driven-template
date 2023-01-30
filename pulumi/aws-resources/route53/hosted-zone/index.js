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

const hostedZone = new aws.route53.Zone('hostedZone', {
  name: domainName
})

exports.hostedZoneNS = hostedZone.nameServers
exports.hostedZoneId = hostedZone.zoneId
