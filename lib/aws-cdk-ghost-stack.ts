import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as path from 'path';
import { Asset } from '@aws-cdk/aws-s3-assets';

export class AwsCdkGhostStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create new VPC
    const vpc = new ec2.Vpc(this, 'PublicVPC',{
      cidr: '10.0.0.0/16',
      maxAzs: 2,
      subnetConfiguration: [{
        cidrMask: 26,
        name: 'publicSubnet',
        subnetType: ec2.SubnetType.PUBLIC,
      }],
      natGateways: 0
    });

    // Open port 22 for SSH connection from anywhere
    const GhostInstanceSecurityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc,
      securityGroupName: "aws-cdk-ghost-sg",
      description: 'Allowed ports to access to EC2 Ghost instance',
      allowAllOutbound: true
    });

    GhostInstanceSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow public ssh access')
    GhostInstanceSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow public http access')
    GhostInstanceSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(2368), 'Allow public Ghost access')
    GhostInstanceSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(2369), 'Allow public Ghost access')

    const awsAMI = new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 });

    // Config Script Location
    const asset = new Asset(this, 'Asset', {path: path.join(__dirname, 'configure.sh')});

    // Instance details
    const GhostInstance = new ec2.Instance(this, 'Instance', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: awsAMI,
      securityGroup: GhostInstanceSecurityGroup
    });

    // Setup for Install Script
    const localPath = GhostInstance.userData.addS3DownloadCommand({
      bucket:asset.bucket,
      bucketKey:asset.s3ObjectKey,
    });
    GhostInstance.userData.addExecuteFileCommand({
      filePath:localPath,
      arguments: '--verbose -y'
    });
    asset.grantRead( GhostInstance.role );


  }
}