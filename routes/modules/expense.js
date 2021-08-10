// import Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const moment = require('moment')
// import data
const Record = require('../../models/expense')
const Category = require('../../models/category')

/* creat */
// to creat page
router.get('/new', (req, res) => {
  res.render('new')
})
// creat expense
router.post('/', (req, res) => {
  Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

/* update */
// to edit page
router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then((expense) => {
      expense.date = moment(expense.date).format('YYYY-MM-DD')
      res.render('edit', { expense })
    })
    .catch(error => console.log(error))
})

// edit expense
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  Record.findById(id)
    .then((expense) => {
      [expense.name, expense.date, expense.category, expense.amount] = [name, date, category, amount]
      expense.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

/* delet */
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
