//import modules
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const moment = require('moment')
require('./config/mongoose')
//Data
const Record = require('./models/expense')
const Category = require('./models/category')



//seeting
const PORT = 3000
app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.get('/', (req, res) => {
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

/* creat */
//to creat page
app.get('/expense/new', (req, res) => {
  res.render('new')
})
//creat expense
app.post('/expense', (req, res) => {
  Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

/* update */
// to edit page
app.get('/expense/edit/:id', (req, res) => {
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
app.put('/expense/:id', (req, res) => {
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
app.delete('/expense/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(PORT, () => {
  console.log(`APP is running on port http://localhost:${PORT}`)
})