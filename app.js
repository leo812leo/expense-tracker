//import 
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const PORT = 3000

require('./config/mongoose')

app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
//seeting


app.get('/', (req, res) => {
  res.render('index')
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