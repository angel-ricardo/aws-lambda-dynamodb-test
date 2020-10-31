import { expect } from 'chai'
import { spy, SinonSpy } from 'sinon'
import * as AWS from 'aws-sdk'
import * as AWSMock from 'aws-sdk-mock'
import { name } from 'faker'
import { DynamoUserRepository } from '../../../../src/user/infraestructure/database/DynamoUserRepository'
import { User } from '../../../../src/user/domain/entity/User'
import { UserName } from '../../../../src/user/domain/value-object/UserName'

let dynamoDb: AWS.DynamoDB
let dynamo_stub: SinonSpy<any[], any>
let user: User

describe('User::Infraestructure::Database::DynamoUserRepository', () => {
  before(() => {
    user = new User(
      new UserName(name.firstName(), name.lastName())
    )
    dynamo_stub = spy()
    AWSMock.setSDKInstance(AWS)

    AWSMock.mock('DynamoDB', 'putItem', function(params, callback) {
      dynamo_stub('putItem')
      callback(null, 'successfully put item in database')
    })

    AWSMock.mock('DynamoDB', 'getItem', function(params, callback) {
      dynamo_stub('getItem')
      callback(null, {
        Item: {
          'id': {
            S: user.getId().toString()
          },
          'name': {
            S: user.getName().toString()
          }
        }        
      })
    })

    dynamoDb = new AWS.DynamoDB()
  })

  it('calls to repository create method', async () => {
    let repository = new DynamoUserRepository(dynamoDb)
    await repository.create(user)
    expect(dynamo_stub.calledWith('putItem')).to.be.true
  })

  it('calls to repository get method and returns user', async () => {
    let repository = new DynamoUserRepository(dynamoDb)
    const response = await repository.get(user.getId())
    
    expect(dynamo_stub.calledWith('getItem')).to.be.true
    expect(response.getId().toString()).to.equals(user.getId().toString())
    expect(response.getName().toString()).to.equals(user.getName().toString())
  })

})