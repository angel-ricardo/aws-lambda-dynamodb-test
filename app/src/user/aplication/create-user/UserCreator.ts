import { User                } from "../../domain/entity/User"
import { IUserRepository     } from "../../domain/IUserRepository"
import { UserName            } from "../../domain/value-object/UserName"
import { UserCreatorRequest } from "./UserCreatorRequest"

export class UserCreator {

  private repository: IUserRepository

  constructor(respository: IUserRepository) 
  {
    this.repository = respository
  }
 
  async invoke(request: UserCreatorRequest) : Promise<void> 
  {
    await this.repository.create(
      new User(
        new UserName(request.firstName, request.lastName)
      )
    )
  }

}
