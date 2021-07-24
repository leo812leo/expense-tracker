const Expense = require('../expense') // 載入 model
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const Seed = require('./seed.json')

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  data = Seed['recordSeeds']
  Expense.create(data).then(() => {
    console.log('Success to set the record seeder!')
    db.close()
    console.log('end')
  })
})
