// import Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const moment = require('moment')
// import data
const Expense = require('../../models/expense')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  const userId = req.user._id
  /* filter procession */
  const { yearMonth, category, ...otherFilter } = req.query
  // remove empty and add userId
  const filter = await filterProcess(otherFilter, category, userId)
  const dateFilter = dateFilterProcess(yearMonth)

  // asynchronous

  await Promise.all([Expense
    // find Expense with specific condiction
    .find({ $and: [dateFilter, filter] }).lean(), Category.find().lean()])
    .then(results => {
      const categoryIdToClass = {}
      const [expenses, categories] = results
      let totalAmount = 0
      // make category2class dictionary
      categories.forEach(category => {
        categoryIdToClass[category._id] = category.iconClass
      })
      // add iconclass to expenses
      expenses.forEach(expense => {
        expense.iconClass = categoryIdToClass[expense.categoryID]
        expense.date = moment(expense.date).format('YYYY-MM-DD')
        totalAmount += expense.amount
      })
      return [expenses, totalAmount]
    })
    .then((results) => {
      const [expenses, totalAmount] = results
      res.render('index', { expenses, filter_value: req.query, totalAmount })
    })
    .catch(err => {
      console.log(err)
      res.render('error', { error: err })
    })
})

module.exports = router

function filterProcess(filter, category, userId) {
  for (const key in filter) {
    if (filter[key] === '') {
      delete filter[key]
    }
  }
  Object.assign(filter, { userId })
  if (category) {
    return Category.findOne({ name: category }).lean()
      .then(category => {
        Object.assign(filter, { categoryID: category._id })
        return filter
      })
      .catch(err => {
        console.log(err)
        res.render('error', { error: err })
      })
  } else {
    return filter
  }
}

function dateFilterProcess(yearMonth) {
  let dateFilter = {}
  if (yearMonth) {
    const year = Number(yearMonth.split('-')[0])
    const month = Number(yearMonth.split('-')[1])
    dateFilter = {
      $expr: {
        $and: [
          { $eq: [{ $month: '$date' }, month] },
          { $eq: [{ $year: '$date' }, year] }
        ]
      }
    }
  }
  return dateFilter
}
