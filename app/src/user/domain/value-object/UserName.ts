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
    ;[...value].forEach((char) => {
      if (!this.isLetter(char))
        throw new InvalidArgumentError('Name cannot contain special characters')
    })
  }

  private isLetter(char: string): boolean {
    return char >= 'a' && char <= 'z'
  }

  public toString(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
