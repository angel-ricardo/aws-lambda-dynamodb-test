import { User } from '../../domain/entity/User'
import { IUserRepository } from '../../domain/IUserRepository'
import { UserName } from '../../domain/value-object/UserName'
import { UserCreatorRequest } from './UserCreatorRequest'

export class UserCreator {
  private repository: IUserRepository

  constructor(respository: IUserRepository) {
    this.repository = respository
  }

  async invoke(request: UserCreatorRequest): Promise<User> {
    const user = new User(new UserName(request.firstName, request.lastName))
    await this.repository.create(user)
    return user
  }
}
