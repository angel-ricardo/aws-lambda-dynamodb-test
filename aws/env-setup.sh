#!/bin/bash

# CREATE S3 BUCKET TO STORE NODE PACKAGED CODE (.zip)
aws s3api create-bucket \
  --bucket javascript.code.itl \
  --endpoint-url=http://localhost:4566

# UPLOAD CODE
aws s3api put-object \
  --bucket javascript.code.itl \
  --key application-code.zip \
  --body built.zip \
  --endpoint-url=http://localhost:4566

# CREATES CloudFormation: stack includes dynamodb databases and lambda functions 
aws cloudformation create-stack \
  --endpoint-url=http://localhost:4566 \
  --stack-name sample-stack \
  --template-body file://aws/cloudformation.yaml