import { UserNotFoundError } from '../../../shared/application/error/UserNotFoundError'
import { IUserRepository } from '../../domain/IUserRepository'
import { UserId } from '../../domain/value-object/UserId'
import { UserDeleterRequest } from './UserDeleterRequest'

export class UserDeleter {
  private repository: IUserRepository

  constructor(respository: IUserRepository) {
    this.repository = respository
  }

  async invoke(request: UserDeleterRequest): Promise<void> {
    const deleted = await this.repository.delete(new UserId(request.userId))
    if (!deleted)
      throw new UserNotFoundError(
        `User with id = ${request.userId} does not exist in database`
      )
  }
}
