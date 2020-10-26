import * as AWS from 'aws-sdk'
import * as awsConfig from '../../../aws-config.json'

let serviceConfig = {}

if (!awsConfig.production) {
  AWS.config.update(awsConfig.devCredentials)

  serviceConfig = {
    apiVersion: awsConfig.apiVersion,
    endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:${awsConfig.endpointPort}`
  }
}

export function getDynamoDbInstance(): AWS.DynamoDB {
  return new AWS.DynamoDB(serviceConfig)
}
