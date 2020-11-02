import { expect } from 'chai'
import { stub, SinonStub } from 'sinon'
import { name } from 'faker'
import { MockUserRepository } from './MockUserRepository'
import { UserDeleter } from '../../../src/user/aplication/delete-user/UserDeleter'
import { UserDeleterRequest } from '../../../src/user/aplication/delete-user/UserDeleterRequest'
import { User } from '../../../src/user/domain/entity/User'
import { UserName } from '../../../src/user/domain/value-object/UserName'

let repository: MockUserRepository
let repository_stub: SinonStub

describe('User::Application::UserDeleter', () => {
  before(() => {
    repository = new MockUserRepository()
  })

  it('invoke deleter', async () => {
    repository_stub = stub(repository, 'delete').returns(
      new Promise<boolean>((resolve) => resolve(true))
    )

    const deleter = new UserDeleter(repository)
    const request: UserDeleterRequest = {
      userId: new User(new UserName(name.firstName(), name.lastName()))
        .getId()
        .toString()
    }

    await deleter.invoke(request)

    expect(repository_stub.calledOnce).to.be.true
  })

  it('throws UserNotFoundError', async () => {
    repository_stub.restore()
    repository_stub = stub(repository, 'delete').returns(
      new Promise<boolean>((resolve) => resolve(false))
    )

    const deleter = new UserDeleter(repository)
    const request: UserDeleterRequest = {
      userId: new User(new UserName(name.firstName(), name.lastName()))
        .getId()
        .toString()
    }

    try {
      await deleter.invoke(request)
      throw Error()
    } catch (error) {
      expect(new String(error).toString()).to.equals(
        `UserNotFoundError: User with id = ${request.userId} does not exist in database`
      )
    }

    expect(repository_stub.calledOnce).to.be.true
  })
})
