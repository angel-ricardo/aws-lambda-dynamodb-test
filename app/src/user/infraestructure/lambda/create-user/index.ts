import { DynamoUserRepository } from '../../database/DynamoUserRepository';
import { UserCreator } from '../../../aplication/create-user/UserCreator';
import { LambdaRequest } from './LambdaRequest';
import { LambdaReponse } from './LambdaResponse';
import { IUserRepository } from '../../../domain/IUserRepository';
import { getDynamoDbInstance } from '../../../../shared/infraestructure/lambda/lambda-config';

const database = getDynamoDbInstance()

exports.handler = async (event: LambdaRequest) : Promise<LambdaReponse> => {    
  let userRespository : IUserRepository = new DynamoUserRepository(database)  
  let userCreator     : UserCreator     = new UserCreator(userRespository)

  try {
    
    await userCreator.invoke({ 
      firstName : event.firstName,
      lastName  : event.lastName 
    })

    return {
      success: `User: ${ event.firstName } ${ event.lastName } has been registered in db`
    }
  }
  catch(error) {
    return {
      error: `User was not registered, reason: ${error}`
    }
  }

}