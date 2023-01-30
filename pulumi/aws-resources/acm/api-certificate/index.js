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

// Create Certificate
const apiCert = new aws.acm.Certificate('apiCert', {
  domainName: domainName,
  tags: {
    Managed: 'Pulumi'
  },
  validationMethod: 'DNS'
})

const validationRecord = apiCert.domainValidationOptions[0].resourceRecordName
const validationRecordType =
  apiCert.domainValidationOptions[0].resourceRecordType
const validationRecordValue =
  apiCert.domainValidationOptions[0].resourceRecordValue

const zoneId = config.require('zoneId')

const apiCertValidationRecord = new aws.route53.Record(
  'apiCertValidationRecord',
  {
    zoneId: zoneId,
    name: validationRecord,
    type: validationRecordType,
    ttl: 300,
    records: [validationRecordValue]
  }
)

const apiCertValidation = new aws.acm.CertificateValidation(
  'apiCertValidation',
  {
    certificateArn: apiCert.arn,
    validationRecordFqdns: [apiCertValidationRecord.fqdn]
  }
)

exports.apiCertArn = apiCert.arn
