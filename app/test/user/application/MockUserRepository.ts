import { User } from '../../../src/user/domain/entity/User'
import { IUserRepository } from '../../../src/user/domain/IUserRepository'
import { UserId } from '../../../src/user/domain/value-object/UserId'

export class MockUserRepository implements IUserRepository {
  public update(user: User): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public create(user: User): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public get(id: UserId): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  public delete(id: UserId): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
