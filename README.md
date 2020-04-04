# AWS CDK Example - Ghost blog installation on EC2 instance 
[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Made With Love](https://img.shields.io/badge/Made%20With-Love-orange.svg)](https://github.com/chetanraj/awesome-github-badges)
[![Top Language](https://img.shields.io/github/languages/top/pabloariasmora/aws-cdk-ghost)](https://img.shields.io/github/languages/top/pabloariasmora/aws-cdk-ghost)

## Overview
This repository contains an example of a project for the [AWS Cloud Development Kit](https://aws.amazon.com/cdk/), [here](https://cdkworkshop.com) is a tutorial in case that you are not familiar with it. 
Currently only in TypeScript, there is a guide on how to read TypeScript code and translate it to Python [here](https://docs.aws.amazon.com/cdk/latest/guide/multiple_languages.html).

This is an open source application designed to showcase the usage of AWS CDK. Once deployed it will run and AWS EC2 t2.micro Instance with [Ghost](https://ghost.org/) installed. For more details please check the infrastructure design.

You're welcome to [report issues](https://github.com/pabloariasmora/aws-cdk-ghost/issues/new) with the documentation here or, if you have a moment, to submit a Pull Request with your suggested changes.

## Requirements
- AWS CDK - 1.31.0 (build 8f3ac79)
- NPM - 6.14.4
- Node - v13.12.0

## How to run the example 

First, install CDK CLI globally

```$bash
npm install -g aws-cdk
```

Install required modules
```$bash
npm install
npm run build
```

Don't forget to provide region and account information as environment variables.

```$bash
export ACCOUNT_ID=”XXXXXXXXXXXX" AWS_REGION=”us-east-1"
```

Deployment - Replace the profile with your AWS profile. If you don’t have any profile setup yet follow the instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

```$bash
cdk deploy  --profile my-profile // Deploys the Infrastructure
```

Afterwards

```$bash
cdk destroy
```

## License Summary

This sample code is made available under a modified MIT license. See the [LICENSE.md](LICENSE.md) file.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUITING.md) for details on our code of conduct, and the process for submitting pull requests to us.
See the list of [contributors](https://github.com/pabloariasmora/aws-cdk-ghost/contributors) who participated in this project.

## Infrastructure Design

![infra diagram](https://raw.githubusercontent.com/pabloariasmora/aws-cdk-ghost/master/docs/img/infra.svg?sanitize=true)