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
    repository_stub = stub(repository, 'delete')

    const deleter = new UserDeleter(repository)
    const request: UserDeleterRequest = {
      userId: new User(new UserName(name.firstName(), name.lastName()))
        .getId()
        .toString()
    }

    await deleter.invoke(request)

    expect(repository_stub.calledOnce).to.be.true
  })
})
