#!/bin/bash

# ARRAY WITH FUNCTION NAMES
declare -a function_names=("create-user" 
                           "get-user" 
                           "update-user"
                          )

# UPDATE LAMBDA CODE USING AWS CLI
for function_name in "${function_names[@]}"
do
   aws lambda update-function-code \
    --function-name $function_name \
    --zip-file fileb://built.zip \
    --endpoint-url=http://localhost:4566
done