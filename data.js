const faker = require('faker');

const Attraction = {
  name: faker.company.companyName(),
  description: faker.lorem.sentences(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  website: faker.internet.url(),
  suggestedDuration: faker.random.number(),
  featuredIn: faker.hacker.noun(),
  address1: faker.address.streetAddress(),
  address2: faker.address.secondaryAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  country: faker.address.country(),
  lat: faker.address.latitude(),
  long: faker.address.longitude(),
  category: faker.commerce.department(),
  bio: faker.lorem.sentences(),
  image: faker.image.avatar()
}

const Question = {
  Question: faker.lorem.sentence(),
  questionDate: faker.date.past()
}

const Answer = {
  Answer: faker.lorem.sentences(),
  answerDate: faker.date.past()
}

const User = {
  userName: faker.name.findName(),
  profilePicture: faker.image.imageUrl(),
  memberSince: faker.date.past(),
}

module.exports = Attraction;
module.exports = Question;
module.exports = Answer;
module.exports = User;