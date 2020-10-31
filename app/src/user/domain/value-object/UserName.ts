import { InvalidArgumentError } from '../../../shared/domain/error/InvalidArgumentError'

export class UserName {
  private readonly firstName: string
  private readonly lastName: string

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.ensureNameOnlyContainsLetters(firstName)
    this.ensureNameOnlyContainsLetters(lastName)
  }

  private ensureNameOnlyContainsLetters(value: string): void {
    const valid_word = /^([a-zA-Z\s'])+$/

    if (valid_word.test(value)) return

    throw new InvalidArgumentError(`${value} is not valid as name`)
  }

  public toString(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
