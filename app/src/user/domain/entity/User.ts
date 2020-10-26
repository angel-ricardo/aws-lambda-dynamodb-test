import { UserId } from '../value-object/UserId'
import { UserName } from '../value-object/UserName'

export class User {
  private readonly id: UserId
  private readonly name: UserName

  constructor(name: UserName) {
    this.id = new UserId(this.generateId())
    this.name = name
  }

  private generateId(): string {
    return new Date().getTime().toString()
  }

  public getId(): UserId {
    return this.id
  }

  public getName(): UserName {
    return this.name
  }
}
