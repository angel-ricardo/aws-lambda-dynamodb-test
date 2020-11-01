import { UserNotFoundError } from '../../../shared/application/error/UserNotFoundError'
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
    if (user === null)
      throw new UserNotFoundError(`with userId = ${userId.toString()}`)
    return user
  }
}
