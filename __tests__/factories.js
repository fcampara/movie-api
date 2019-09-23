import faker from 'faker'
import { factory } from 'factory-girl'
import User from '../src/app/models/User'
import Profile from '../src/app/models/Profile'

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthDay: faker.date.recent()
})

factory.define('Profile', Profile, {
  name: faker.name.findName()
})

export default factory
