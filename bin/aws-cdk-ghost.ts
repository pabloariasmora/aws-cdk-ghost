#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkGhostStack } from '../lib/aws-cdk-ghost-stack';

const app = new cdk.App();

new AwsCdkGhostStack(app, 'AwsCdkGhostStack', {
    env: {
        region: process.env.AWS_REGION,
        account: process.env.ACCOUNT_ID
    }
});