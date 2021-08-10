//import modules
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
/* import User define modules */
const routes = require('./routes')
require('./config/mongoose')
//Data
const Record = require('./models/expense')
const Category = require('./models/category')

// seeting
const app = express()
const PORT = process.env.PORT || 3000

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
// express template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
// body-parser
app.use(express.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))
// methodOverride
app.use(methodOverride('_method'))
// passport
usePassport(app)
// 新增middleware
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
// 將 request 導入路由器
app.use(routes)

app.listen(PORT, () => {
  console.log(`APP is running on port http://localhost:${PORT}`)
})
