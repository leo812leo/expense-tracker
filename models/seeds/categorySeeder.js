// 載入套件
const mongoose = require('mongoose')
// import mongoDB data
const Category = require('../category') // 載入 model
// import seed data
const categoryData = require('./seed.json').categorySeeds
// 設定環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

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
