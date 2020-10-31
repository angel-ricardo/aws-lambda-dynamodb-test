import { UserName } from '../../../../src/user/domain/value-object/UserName'
import { expect } from 'chai'
import { InvalidArgumentError } from '../../../../src/shared/domain/error/InvalidArgumentError'
import { name } from 'faker'

type TestValues = {
  lowerCase: string,
  upperCase: string,
  mixed: string,
  specialCharacter: string,
  randomFirstName: string,
  randomLastName: string
};

describe('User::Domain::ValueObject::UserId', () => {
  let test_value: TestValues
  
  beforeEach(() => {
    test_value = {
      lowerCase: 'angel',
      upperCase: 'ANGEL',
      mixed: 'Angel',
      specialCharacter: 'Ángel',
      randomFirstName: name.firstName(),
      randomLastName: name.lastName()
    }
  })

  describe('Attribute::firstName', () => {
    describe('must only contain letters and spaces', () => {
      it('lowercase characters', () => {
        expect(() => new UserName(test_value.lowerCase, test_value.randomLastName))
        .to.not.throw(InvalidArgumentError)       
      })

      it('uppercase characters', () => {
        expect(() => new UserName(test_value.upperCase, test_value.randomLastName))
        .to.not.throw(InvalidArgumentError)
      })

      it('mixed characters', () => {
        expect(() => new UserName(test_value.mixed, test_value.randomLastName))
        .to.not.throw(InvalidArgumentError)
      })
  
      it('not contain special characters', () => {
        expect(() => new UserName(test_value.specialCharacter, test_value.randomLastName))
        .to.throw(InvalidArgumentError)
      })
    })

    it('random characters', () => {
      expect(() => new UserName(test_value.randomFirstName, test_value.randomLastName))
      .to.not.throw(InvalidArgumentError)       
    })
  })

  describe('Attribute::lastName', () => {
    describe('must only contain letters and spaces', () => {
      it('lowercase characters', () => {
        expect(() => new UserName(test_value.randomFirstName, test_value.lowerCase))
        .to.not.throw(InvalidArgumentError)       
      })

      it('uppercase characters', () => {
        expect(() => new UserName(test_value.randomFirstName, test_value.upperCase))
        .to.not.throw(InvalidArgumentError)
      })

      it('mixed characters', () => {
        expect(() => new UserName(test_value.randomFirstName, test_value.mixed))
        .to.not.throw(InvalidArgumentError)
      })
  
      it('not contain special characters', () => {
        expect(() => new UserName(test_value.specialCharacter, test_value.randomLastName))
        .to.throw(InvalidArgumentError)
      })
    })    
  })
})