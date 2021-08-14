if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category') // 載入 model
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const categoryData = require('./seed.json').categorySeeds

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Category.create(categoryData
  ).then(() => {
    console.log('Success to set the category seeder!')
    return db.close()
  }).then(() => {
    console.log('connection close')
  })
})
