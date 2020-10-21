import { DynamoDB        } from "aws-sdk";
import { User            } from "../../domain/entity/User";
import { IUserRepository } from "../../domain/IUserRepository";

export class DynamoUserRepository implements IUserRepository {

  protected database : DynamoDB

  constructor(database: DynamoDB)
  {
    this.database = database
  }

  public async create(user: User) : Promise<void> {
    const params = {
      TableName: 'Client',
      Item: {
        'id'   : {S: user.getId().toString() },
        'name' : {S: user.getName().toString() }
      }
    }
    try {
      await this.database.putItem(params).promise()
    }
    catch(error) { throw new Error(error) }
  }

}