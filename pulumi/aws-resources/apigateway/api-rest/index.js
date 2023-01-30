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

// Create API Rest
const apiRest = new aws.apigateway.RestApi('apiRest', {
  name: `ac-service-api-${env}`,
  endpointConfiguration: {
    types: 'EDGE'
  }
})

const apiCert = config.require('apiCertArn')

const apiRestDomainName = new aws.apigateway.DomainName('apiRestDomainName', {
  certificateArn: apiCert,
  domainName: domainName
})

const zoneId = config.require('zoneId')

const apiRestDomainRecord = new aws.route53.Record(
  'apiRestDomainRecord',
  {
    name: apiRestDomainName.domainName,
    type: 'A',
    zoneId: zoneId,
    aliases: [
      {
        evaluateTargetHealth: true,
        name: apiRestDomainName.cloudfrontDomainName,
        zoneId: apiRestDomainName.cloudfrontZoneId
      }
    ]
  },
  {
    dependsOn: [apiRestDomainName]
  }
)

exports.apiRestId = apiRest.id
exports.apiRootId = apiRest.rootResourceId
