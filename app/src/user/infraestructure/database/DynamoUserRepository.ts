import { DynamoDB } from 'aws-sdk'
import { User } from '../../domain/entity/User'
import { UserId } from '../../domain/value-object/UserId'
import { IUserRepository } from '../../domain/IUserRepository'
import { UserName } from '../../domain/value-object/UserName'

export class DynamoUserRepository implements IUserRepository {
  protected database: DynamoDB
  protected readonly TABLE_NAME: string

  constructor(database: DynamoDB) {
    this.database = database
    this.TABLE_NAME = 'Client'
  }

  public async create(user: User): Promise<void> {
    const params: DynamoDB.PutItemInput = {
      TableName: this.TABLE_NAME,
      Item: {
        id: { S: user.getId().toString() },
        name: { S: user.getName().toString() }
      }
    }
    try {
      await this.database.putItem(params).promise()
    } catch (error) {
      throw new Error(error)
    }
  }

  public async get(id: UserId): Promise<User | null> {
    const params: DynamoDB.GetItemInput = {
      TableName: 'Client',
      Key: {
        id: { S: id.toString() }
      }
    }

    try {
      const response = await this.database.getItem(params).promise()

      if (response.Item === undefined) return null

      const name: string = response.Item.name.S
      const [firstName, lastName] = name.split(' ')

      return new User(
        new UserName(firstName, lastName),
        new UserId(response.Item.id.S)
      )
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update(user: User): Promise<void> {
    const params: DynamoDB.UpdateItemInput = {
      TableName: 'Client',
      Key: {
        id: { S: user.getId().toString() }
      },
      UpdateExpression: 'set #name = :name',
      ConditionExpression: 'id = :id',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: {
        ':name': { S: user.getName().toString() },
        ':id': { S: user.getId().toString() }
      }
    }

    await this.database.updateItem(params).promise()
  }

  public async delete(id: UserId): Promise<boolean> {
    const params: DynamoDB.DeleteItemInput = {
      TableName: 'Client',
      Key: {
        id: { S: id.toString() }
      },
      ReturnValues: 'ALL_OLD'
    }

    const response = await this.database.deleteItem(params).promise()

    return response.Attributes !== undefined
  }
}
