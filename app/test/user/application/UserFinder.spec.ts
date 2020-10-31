import { expect } from 'chai'
import { stub, SinonStub } from 'sinon'
import { MockUserRepository } from './MockUserRepository'
import { UserFinder } from '../../../src/user/aplication/get-user/UserFinder'
import { name } from 'faker'
import { UserFinderRequest } from '../../../src/user/aplication/get-user/UserFinderRequest'
import { User } from '../../../src/user/domain/entity/User'
import { UserName } from '../../../src/user/domain/value-object/UserName'

let repository: MockUserRepository
let repository_stub: SinonStub

describe('User::Application::UserFinder', () => {
  repository = new MockUserRepository()
  const finder = new UserFinder(repository)

  const user = new User(
    new UserName(name.firstName(), name.lastName())
  )

  repository_stub = stub(repository, 'get').returns(
    new Promise<User>((resolve, reject) => resolve(user))
  )

  const request: UserFinderRequest = {
    user_id: user.getId().toString()
  }

  it('invoke finder', async () => {    
    await finder.invoke(request)
    expect(repository_stub.calledOnce).to.be.true;
  })

  it('returns right user', async () => {
    const response: User = await finder.invoke(request)
    expect(response.getId().toString()).to.equals(user.getId().toString())
    expect(response.getName().toString()).to.equals(user.getName().toString())
  })

})