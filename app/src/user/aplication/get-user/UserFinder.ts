import { User } from '../../domain/entity/User'
import { IUserRepository } from '../../domain/IUserRepository'
import { UserId } from '../../domain/value-object/UserId'
import { UserFinderRequest } from './UserFinderRequest'

export class UserFinder {
  private repository: IUserRepository

  constructor(respository: IUserRepository) {
    this.repository = respository
  }

  async invoke(request: UserFinderRequest): Promise<User> {
    const userId = new UserId(request.user_id)
    const user = await this.repository.get(userId)
    return user
  }
}
