import { User } from './entity/User'
import { UserId } from './value-object/UserId'

export interface IUserRepository {
  create(user: User): Promise<void>
  get(id: UserId): Promise<User | null>
  update(user: User): Promise<void>
}
