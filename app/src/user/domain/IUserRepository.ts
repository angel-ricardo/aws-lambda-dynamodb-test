import { User } from './entity/User'

export interface IUserRepository {
  create(user: User): Promise<void>
}
