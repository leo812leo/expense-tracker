const express = require('express')
const router = express.Router()
// import
const home = require('./modules/home')
const expense = require('./modules/expense')
const users = require('./modules/users')
// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', home)
router.use('/expense', expense)
router.use('/users', users)

module.exports = router
