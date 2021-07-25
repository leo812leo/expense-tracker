//import modules
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
/* import User define modules */
const routes = require('./routes')
require('./config/mongoose')
//Data
const Record = require('./models/expense')
const Category = require('./models/category')



//seeting
app = express()
const PORT = 3000
// express template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
// body-parser
app.use(express.urlencoded({ extended: true }))
//methodOverride
app.use(methodOverride('_method'))
// setting static files
app.use(express.static('public'))
// 將 request 導入路由器
app.use(routes)

app.listen(PORT, () => {
  console.log(`APP is running on port http://localhost:${PORT}`)
})