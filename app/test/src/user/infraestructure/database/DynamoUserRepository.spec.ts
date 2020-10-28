import { expect } from 'chai'
import { spy, SinonSpy } from 'sinon'
import * as AWS from 'aws-sdk'
import * as AWSMock from 'aws-sdk-mock'
import { name } from 'faker'
import { DynamoUserRepository } from '../../../../../src/user/infraestructure/database/DynamoUserRepository'
import { User } from '../../../../../src/user/domain/entity/User'
import { UserName } from '../../../../../src/user/domain/value-object/UserName'

let dynamoDb: AWS.DynamoDB
let dynamo_stub: SinonSpy<any[], any>

describe('User::Infraestructure::Database::DynamoUserRepository', () => {
  beforeEach(() => {
    dynamo_stub = spy()  
    AWSMock.setSDKInstance(AWS)
    AWSMock.mock('DynamoDB', 'putItem', function(params, callback) {
      dynamo_stub()
      callback(null, 'successfully put item in database')
    })
    dynamoDb = new AWS.DynamoDB()    
  })

  it('calls to repository create method', async () => {
    let repository = new DynamoUserRepository(dynamoDb)
    await repository.create(
      new User(
        new UserName(name.firstName(), name.lastName()))
    )    
    expect(dynamo_stub.calledOnce).to.be.true
  })
})