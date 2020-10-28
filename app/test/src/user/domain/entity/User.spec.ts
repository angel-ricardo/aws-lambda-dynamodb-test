import { User } from '../../../../../src/user/domain/entity/User'
import { UserName } from '../../../../../src/user/domain/value-object/UserName'
import { expect } from 'chai'

describe('User::Domain::Entity::User', () => {
  it('UserId must be different', () => {    
    const user1 = new User(
      new UserName('angel', 'ramirez')
    )
    const user2 = new User(
      new UserName('angel', 'ramirez')
    )
    expect(
      user1.getId().toString()
    )
    .to.not.equal(
      user2.getId().toString()
    )
  })
})