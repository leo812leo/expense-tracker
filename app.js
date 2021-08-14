//import modules
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

/* import User define modules */
const usePassport = require('./config/passport')
const routes = require('./routes')
require('./config/mongoose')

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
// flash
app.use(flash())
// 新增middleware
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  next()
})
// 將 request 導入路由器
app.use(routes)

app.listen(PORT, () => {
  console.log(`APP is running on port http://localhost:${PORT}`)
})
