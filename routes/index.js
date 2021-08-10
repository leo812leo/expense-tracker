const express = require('express')
const router = express.Router()
// import
const home = require('./modules/home')
const expense = require('./modules/expense')
const users = require('./modules/users')
// import function
const { authenticator } = require('../middleware/auth')
// 將網址結構符合 / 字串的 request 導向 home 模組

router.use('/expense', authenticator, expense)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router
