import * as AWS from 'aws-sdk'
import * as CONFIG from './config'
import { LambdaRequest } from '../../../app/src/user/infraestructure/lambda/create-user/LambdaRequest'
import { expect } from 'chai'

AWS.config.update(CONFIG.AWS_CONFIG)
let lambda = new AWS.Lambda(CONFIG.AWS_SERVICE_CONFIG)

const FUNCTION_NAME: string = 'create-user'
let function_payload: LambdaRequest
let function_params: AWS.Lambda.InvocationRequest

describe('User::Infraestructure::Lambda::CreateUser', function() {
  this.timeout(15000)

  it('success invocation usign valid name', async function() {
    function_payload = {
      firstName: 'Angel',
      lastName: 'Ramirez'
    }    

    function_params = {
      FunctionName: FUNCTION_NAME,
      Payload: JSON.stringify(function_payload)
     };

    let response = await lambda.invoke(function_params).promise()

    const RESPONSE_PAYLOAD = JSON.parse(response.Payload.toString())
    expect(RESPONSE_PAYLOAD).to.have.property('success')
  })

  it('failed invocation usign special characters in name', async function() {
    function_payload = {
      firstName: 'Angel',
      lastName: 'Ramírez'
    }    

    function_params = {
      FunctionName: FUNCTION_NAME,
      Payload: JSON.stringify(function_payload)
     };

    let response = await lambda.invoke(function_params).promise()

    const RESPONSE_PAYLOAD = JSON.parse(response.Payload.toString())
    expect(RESPONSE_PAYLOAD).to.have.property('error')
  })
})