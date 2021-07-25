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
      console.log(records)
      //render
      res.render('index', { records })
    })
    .catch(err => console.log(err))
})





app.get('/expense/new', (req, res) => {
  res.render('new')
})

app.get('/expense/edit', (req, res) => {
  res.render('edit')
})

//app.delet()


app.listen(PORT, () => {
  console.log(`APP is running on port http://localhost:${PORT}`)
})