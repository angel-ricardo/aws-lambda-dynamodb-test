import { IUserRepository } from '../../domain/IUserRepository'
import { UserId } from '../../domain/value-object/UserId'
import { UserDeleterRequest } from './UserDeleterRequest'

export class UserDeleter {
  private repository: IUserRepository

  constructor(respository: IUserRepository) {
    this.repository = respository
  }

  async invoke(request: UserDeleterRequest): Promise<void> {
    await this.repository.delete(new UserId(request.userId))
  }
}
