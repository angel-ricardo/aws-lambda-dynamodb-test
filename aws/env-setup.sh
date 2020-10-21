#!/bin/bash

# CREATE S3 BUCKET TO STORE NODE PACKAGED CODE (.zip)
aws s3api create-bucket \
  --bucket javascript.code.itl \
  --endpoint-url=http://localhost:4566 \
  --profile localstack

# UPLOAD CODE
aws s3api put-object \
  --bucket javascript.code.itl \
  --key application-code.zip \
  --body built.zip \
  --endpoint-url=http://localhost:4566 \
  --profile localstack

# CREATES CloudFormation: stack includes dynamodb databases and lambda functions 
aws cloudformation create-stack \
  --endpoint-url=http://localhost:4566 \
  --stack-name sample-stack \
  --template-body file://aws/cloudformation.yaml \
  --profile localstack

# ATTACH POLICIES TO CURRENT ROLE (due to lack localstack support for AWS::IAM::ManagedPolicy)
ROLE_NAME=`aws iam list-roles \
              --endpoint-url=http://localhost:4566 \
              --profile localstack \
          | py -c "import sys, json; print(json.load(sys.stdin)['Roles'][0]['RoleName'])"`

aws iam put-role-policy \
  --role-name $ROLE_NAME \
  --policy-name CloudWatchLogPolicy \
  --policy-document file://aws/iam/CloudWatchLogPolicy.json \
  --endpoint-url=http://localhost:4566 \
  --profile localstack

aws iam put-role-policy \
  --role-name $ROLE_NAME \
  --policy-name BasicDBOperations \
  --policy-document file://aws/iam/BasicDBOperations.json \
  --endpoint-url=http://localhost:4566 \
  --profile localstack