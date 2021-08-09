// import Express 與 Express 路由器
const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  return res.render('login')
})

module.exports = router