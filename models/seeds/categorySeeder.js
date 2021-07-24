const Category = require('../category') // 載入 model
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const Seed = require('./seed.json')

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  data = Seed['categorySeeds']
  Category.create(data
  ).then(() => {
    console.log('Success to set the category seeder!')
    return db.close()
  }).then(() => {
    console.log('connection close')
  })
})

