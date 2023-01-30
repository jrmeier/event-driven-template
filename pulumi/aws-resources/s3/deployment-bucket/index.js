'use strict'
const pulumi = require('@pulumi/pulumi')
const aws = require('@pulumi/aws')
const awsx = require('@pulumi/awsx')

const env = pulumi.getStack()
const config = new pulumi.Config()
const aws_region = config.require('aws_region')
const s3_backend = `pulumi-state-workflows-${aws_region}`

const bucket = new aws.s3.Bucket('bucket', {
  bucket: `denimsocial-ac-service-serverless-${env}`,
  acl: 'private',
  tags: {
    Managed: 'Pulumi'
  }
})
