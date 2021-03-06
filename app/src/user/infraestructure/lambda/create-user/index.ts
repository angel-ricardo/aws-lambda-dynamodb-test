import { DynamoUserRepository } from '../../database/DynamoUserRepository'
import { UserCreator } from '../../../aplication/create-user/UserCreator'
import { LambdaRequest } from './LambdaRequest'
import { LambdaReponse } from './LambdaResponse'
import { IUserRepository } from '../../../domain/IUserRepository'
import {
  getDynamoDbInstance,
  throwRequestError
} from '../../../../shared/infraestructure/lambda/lambda-config'

const database = getDynamoDbInstance()

function validateRequest(event: LambdaRequest) {
  if (typeof event.firstName !== 'string')
    throwRequestError('firstName', 'string', typeof event.firstName)

  if (typeof event.lastName !== 'string')
    throwRequestError('lastName', 'string', typeof event.lastName)
}

exports.handler = async (
  event: LambdaRequest | undefined
): Promise<LambdaReponse> => {
  let userRespository: IUserRepository = new DynamoUserRepository(database)
  let userCreator: UserCreator = new UserCreator(userRespository)
  try {
    validateRequest(event)

    const user = await userCreator.invoke({
      firstName: event.firstName,
      lastName: event.lastName
    })

    return {
      success: {
        message: `User: ${event.firstName} ${event.lastName} has been registered in db`,
        id: user.getId().toString()
      }
    }
  } catch (error) {
    return {
      error: {
        message: 'User was not registered',
        reason: new String(error).toString()
      }
    }
  }
}
