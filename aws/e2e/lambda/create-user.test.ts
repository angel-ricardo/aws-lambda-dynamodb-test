import * as AWS from 'aws-sdk'
import * as CONFIG from './config'
import { LambdaRequest } from '../../../app/src/user/infraestructure/lambda/create-user/LambdaRequest'
import { expect } from 'chai'

AWS.config.update(CONFIG.AWS_CONFIG)
let lambda = new AWS.Lambda(CONFIG.AWS_SERVICE_CONFIG)

// TEST PARAMS
const FUNCTION_NAME: string = 'create-user'
let function_payload: LambdaRequest
let function_params: AWS.Lambda.InvocationRequest

// TEST EXPORT
export let USER_ID: string
export let USER_NAME: string

// TEST DEFINITIONS
describe('User::Infraestructure::Lambda::CreateUser', function () {
  this.timeout(60000)

  it('success invocation usign valid name', async function () {
    function_payload = {
      firstName: 'Angel',
      lastName: 'Ramirez'
    }

    function_params = {
      FunctionName: FUNCTION_NAME,
      Payload: JSON.stringify(function_payload)
    }

    let response = await lambda.invoke(function_params).promise()

    const RESPONSE_PAYLOAD = JSON.parse(response.Payload.toString())
    expect(RESPONSE_PAYLOAD).to.have.property('success')
    expect(RESPONSE_PAYLOAD.success).to.have.property('message')
    expect(RESPONSE_PAYLOAD.success).to.have.property('id')
    expect(RESPONSE_PAYLOAD.success.message).to.equals(
      `User: ${function_payload.firstName} ${function_payload.lastName} has been registered in db`
    )
    expect(RESPONSE_PAYLOAD.success.id).to.be.an('string')
    USER_ID = RESPONSE_PAYLOAD.success.id
    USER_NAME = `${function_payload.firstName} ${function_payload.lastName}`
  })

  it('failed invocation usign special characters in name', async function () {
    function_payload = {
      firstName: 'Angel',
      lastName: 'Ramírez'
    }

    function_params = {
      FunctionName: FUNCTION_NAME,
      Payload: JSON.stringify(function_payload)
    }

    let response = await lambda.invoke(function_params).promise()

    const RESPONSE_PAYLOAD = JSON.parse(response.Payload.toString())
    expect(RESPONSE_PAYLOAD).to.have.property('error')
    expect(RESPONSE_PAYLOAD.error).to.have.property('message')
    expect(RESPONSE_PAYLOAD.error).to.have.property('reason')
    expect(RESPONSE_PAYLOAD.error.message).to.equal('User was not registered')
    expect(RESPONSE_PAYLOAD.error.reason).to.equal(
      `InvalidArgumentError: ${function_payload.lastName} is not valid as name`
    )
  })
})