import faker from 'faker'
import { factory } from 'factory-girl'
import User from '../src/app/models/User'
import Movie from '../src/app/models/Movie'
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

factory.define('Movie', Movie, {
  movieId: faker.random.number(),
  movieName: faker.name.findName(),
  wantWatch: false,
  watched: false,
  genres: ["5", "10", "560", "40", "8"],
  details: {
    posterPath: "/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg",
    voteAverage: Math.random() * (0 - 10) + 10,
    releaseDate: faker.date.recent(),
    overview: faker.lorem.text()
  }
})

export default factory
