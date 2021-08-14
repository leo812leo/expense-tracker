// 載入套件
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// import mongoDB data
const Expense = require('../expense')
const User = require('../user')
const Category = require('../category')
// import seed data
const Seed = require('./seed.json')
const SEED_USERS = Seed.userSeeds
const SEED_EXPENSE = Seed.recordSeeds
// import function
const randomChoose = require('../../controller/tool')

// 設定環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// connection
const db = mongoose.connection
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
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(userSeed.password, salt))
        .then(hash => User.create({
          name: userSeed.name,
          email: userSeed.email,
          password: hash
        }))
        .then(user => {
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
              return Expense.create(expenseSeedData)
            })
        })
        .catch(err => console.log(err))
    }))
    .then(() => {
      console.log('Success to set the Expense seeder!')
      return db.close()
    })
    .then(() => {
      console.log('connection close')
    })
})
