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

class RequestError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RequestError'
  }
}

export function getDynamoDbInstance(): AWS.DynamoDB {
  return new AWS.DynamoDB(serviceConfig)
}

export function throwRequestError(
  key: string,
  expected: string,
  actual: string
) {
  throw new RequestError(
    `${key} is supposed to be ${expected}, but ${actual} was sent instead`
  )
}
