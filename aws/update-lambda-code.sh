#!/bin/bash

# CREATE
aws lambda update-function-code \
    --function-name create-user \
    --zip-file fileb://built.zip \
    --endpoint-url=http://localhost:4566 \
    --profile localstack