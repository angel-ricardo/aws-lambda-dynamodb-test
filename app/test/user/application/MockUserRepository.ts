import { User } from '../../../src/user/domain/entity/User'
import { IUserRepository } from '../../../src/user/domain/IUserRepository'

export class MockUserRepository implements IUserRepository {
  public create(user: User): Promise<void> { return }
}