// import Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const moment = require('moment')
//import data
const Record = require('../../models/expense')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  // asynchronous
  const categoryToClass = {}
  Promise.all([Record.find().lean(), Category.find().lean()])
    .then(results => {
      const [records, categories] = results
      //make category2class dictionary
      categories.forEach(category => {
        categoryToClass[category['name']] = category.iconClass
      })
      //add iconclass to records
      records.forEach(record => {
        record.iconClass = categoryToClass[record.category]
        record.date = moment(record.date).format('YYYY-MM-DD')
      })
      //render
      res.render('index', { records })
    })
    .catch(err => console.log(err))
})

module.exports = router