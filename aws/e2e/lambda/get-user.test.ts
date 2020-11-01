import * as AWS from 'aws-sdk'
import * as CONFIG from './config'
import { LambdaRequest } from '../../../app/src/user/infraestructure/lambda/get-user/LambdaRequest'
import { expect } from 'chai'
import { USER_ID, USER_NAME } from './create-user.test'
import { User } from '../../../app/src/user/domain/entity/User'
import { UserName } from '../../../app/src/user/domain/value-object/UserName'

AWS.config.update(CONFIG.AWS_CONFIG)
let lambda = new AWS.Lambda(CONFIG.AWS_SERVICE_CONFIG)

// TEST PARAMS
const FUNCTION_NAME: string = 'get-user'
let function_payload: LambdaRequest
let function_params: AWS.Lambda.InvocationRequest

// TEST EXPORT

// TEST DEFINITIONS
describe('User::Infraestructure::Lambda::GetUser', function () {
  this.timeout(60000)

  it('success invocation usign valid id', async function () {
    function_payload = {
      userId: USER_ID
    }

    function_params = {
      FunctionName: FUNCTION_NAME,
      Payload: JSON.stringify(function_payload)
    }

    let response = await lambda.invoke(function_params).promise()

    const RESPONSE_PAYLOAD = JSON.parse(response.Payload.toString())
    expect(RESPONSE_PAYLOAD).to.have.property('success')
    expect(RESPONSE_PAYLOAD.success).to.have.property('user')
    expect(RESPONSE_PAYLOAD.success.user).to.have.property('id')
    expect(RESPONSE_PAYLOAD.success.user).to.have.property('name')
    expect(RESPONSE_PAYLOAD.success.user.id).to.be.an('string')
    expect(RESPONSE_PAYLOAD.success.user.id).to.be.equals(USER_ID)
    expect(RESPONSE_PAYLOAD.success.user.name).to.be.an('string')
    expect(RESPONSE_PAYLOAD.success.user.name).to.be.equals(USER_NAME)
  })

  it('failed invocation usign not existing id', async function () {
    function_payload = {
      userId: new User(new UserName('Angel', 'Ricardo')).getId().toString()
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
    expect(RESPONSE_PAYLOAD.error.message).to.equal('User not found')
    expect(RESPONSE_PAYLOAD.error.reason).to.equal(
      `UserNotFoundError: with userId = ${function_payload.userId}`
    )
  })
})
