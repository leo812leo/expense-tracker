// 載入 model
const Expense = require('../expense')
const User = require('../user')
const Category = require('../category')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const Seed = require('./seed.json')
const SEED_USERS = Seed.userSeeds
const SEED_EXPENSE = Seed.recordSeeds
const randomChoose = require('../../controller/tool')
const categoryToID = {}
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  // user create Promise.all()
  return Promise.all(Array.from(
    { length: SEED_USERS.length },
    (_, i) => {
      const userSeed = SEED_USERS[i]
      console.log('-----start-----')
      console.log('name', userSeed.name)
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(userSeed.password, salt))
        .then(hash => User.create({
          name: userSeed.name,
          email: userSeed.email,
          password: hash
        }))
        .then(user => {
          console.log('------2------')
          console.log('user', user)
          return Category.find()
            .lean()
            .then(categories => {
              categories.forEach(category => {
                categoryToID[category.name] = category._id
              })
              const _id = user._id
              return randomChoose(SEED_EXPENSE, 5).map(expenseSeed => (Object.assign(expenseSeed, { userId: _id, categoryID: categoryToID[expenseSeed.category] })))
            })
            .then(expenseSeedData => {
              console.log('------3------')
              console.log('expenseSeedData', expenseSeedData)
              return Expense.create(expenseSeedData)
            })
        })
        .catch(err => console.log(err))
    }))
    .then(() => {
      console.log('Success to set the record seeder!')
      return db.close()
    })
})
