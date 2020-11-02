import { DynamoUserRepository } from '../../database/DynamoUserRepository'
import { LambdaRequest } from './LambdaRequest'
import { LambdaReponse } from './LambdaResponse'
import { IUserRepository } from '../../../domain/IUserRepository'
import {
  getDynamoDbInstance,
  throwRequestError
} from '../../../../shared/infraestructure/lambda/lambda-config'
import { UserUpdater } from '../../../aplication/update-user/UserUpdater'
import { User } from '../../../domain/entity/User'

const database = getDynamoDbInstance()

function validateRequest(event: LambdaRequest) {
  if (typeof event.userId !== 'string')
    throwRequestError('userId', 'string', typeof event.userId)

  if (typeof event.firstName !== 'string')
    throwRequestError('firtsName', 'string', typeof event.userId)

  if (typeof event.lastName !== 'string')
    throwRequestError('firtsName', 'string', typeof event.userId)
}

exports.handler = async (event: LambdaRequest): Promise<LambdaReponse> => {
  let userRespository: IUserRepository = new DynamoUserRepository(database)
  let userUpdater: UserUpdater = new UserUpdater(userRespository)

  try {
    validateRequest(event)

    const user: User = await userUpdater.invoke({
      userId: event.userId,
      firstName: event.firstName,
      lastName: event.lastName
    })

    return {
      success: {
        user: {
          id: user.getId().toString(),
          name: user.getName().toString()
        }
      }
    }
  } catch (error) {
    return {
      error: {
        message: 'User was not updated',
        reason: new String(error).toString()
      }
    }
  }
}
