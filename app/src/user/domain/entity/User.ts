import { UserId } from '../value-object/UserId'
import { UserName } from '../value-object/UserName'
export class User {
  private readonly id: UserId
  private readonly name: UserName

  constructor(name: UserName, id?: UserId) {
    this.id = id || new UserId(this.generateId())
    this.name = name
  }

  private generateId(): string {
    const random: number = Math.floor(Math.random() * 100)
    return new Date().getTime().toString().concat(random.toString())
  }

  public getId(): UserId {
    return this.id
  }

  public getName(): UserName {
    return this.name
  }
}
