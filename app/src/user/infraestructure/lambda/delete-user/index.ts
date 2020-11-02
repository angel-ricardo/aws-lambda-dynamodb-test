import { DynamoUserRepository } from '../../database/DynamoUserRepository'
import { LambdaRequest } from './LambdaRequest'
import { LambdaReponse } from './LambdaResponse'
import { IUserRepository } from '../../../domain/IUserRepository'
import {
  getDynamoDbInstance,
  throwRequestError
} from '../../../../shared/infraestructure/lambda/lambda-config'
import { UserDeleter } from '../../../aplication/delete-user/UserDeleter'
import { User } from '../../../domain/entity/User'

const database = getDynamoDbInstance()

function validateRequest(event: LambdaRequest) {
  if (typeof event.userId !== 'string')
    throwRequestError('userId', 'string', typeof event.userId)
}

exports.handler = async (event: LambdaRequest): Promise<LambdaReponse> => {
  let userRespository: IUserRepository = new DynamoUserRepository(database)
  let userDeleter: UserDeleter = new UserDeleter(userRespository)

  try {
    validateRequest(event)

    await userDeleter.invoke({
      userId: event.userId
    })

    return {
      success: {
        message: `User with id = ${event.userId} was successfully removed`
      }
    }
  } catch (error) {
    return {
      error: {
        message: 'User was not deleted',
        reason: new String(error).toString()
      }
    }
  }
}
