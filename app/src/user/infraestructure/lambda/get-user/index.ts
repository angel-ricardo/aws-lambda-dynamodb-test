import { DynamoUserRepository } from '../../database/DynamoUserRepository'
import { LambdaRequest } from './LambdaRequest'
import { LambdaReponse } from './LambdaResponse'
import { IUserRepository } from '../../../domain/IUserRepository'
import {
  getDynamoDbInstance,
  throwRequestError
} from '../../../../shared/infraestructure/lambda/lambda-config'
import { UserFinder } from '../../../aplication/get-user/UserFinder'
import { User } from '../../../domain/entity/User'

const database = getDynamoDbInstance()

function validateRequest(event: LambdaRequest) {
  if (typeof event.userId !== 'string')
    throwRequestError('userId', 'string', typeof event.userId)
}

exports.handler = async (event: LambdaRequest): Promise<LambdaReponse> => {
  let userRespository: IUserRepository = new DynamoUserRepository(database)
  let userFinder: UserFinder = new UserFinder(userRespository)

  try {
    validateRequest(event)

    const user: User = await userFinder.invoke({
      user_id: event.userId
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
      error: `User not found, reason: ${error}`
    }
  }
}
