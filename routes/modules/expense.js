// import Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const moment = require('moment')
// import data
const Expense = require('../../models/expense')
const Category = require('../../models/category')

/* creat */
// to creat page
router.get('/new', (req, res) => {
  res.render('new')
})
// creat expense
router.post('/', (req, res) => {
  const userId = req.user._id
  const item = Object.assign(req.body, { userId })
  Category.findOne({ name: req.body.category }).lean()
    .then(category => {
      item.categoryID = category._id
      return item
    })
    .then(item => {
      Expense.create(item)
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

/* update */
// to edit page
router.get('/edit/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Expense.findOne({ _id, userId })
    .lean()
    .then((expense) => {
      expense.date = moment(expense.date).format('YYYY-MM-DD')
      res.render('edit', { expense })
    })
    .catch(error => console.log(error))
})

// edit expense (put)
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const newExpense = req.body
  const categoryToId = {}
  Promise.all([Expense.findOne({ _id, userId }), Category.find().lean()])
    .then((results) => {
      const [expense, categories] = results
      // make category2class dictionary
      categories.forEach(category => {
        categoryToId[category.name] = category._id
      })
      newExpense.categoryID = categoryToId[newExpense.category]
      Object.assign(expense, newExpense)
      expense.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

/* delet */
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Expense.findOne({ _id, userId })
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
