// import Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
/* login */
// get to login page
router.get('/login', (req, res) => {
  return res.render('login')
})
// login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

/* logout */
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

/* register */
// get register page
router.get('/register', (req, res) => {
  return res.render('register')
})
// register post
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists.')
      req.flash('warning_msg', 'User already exists')
      return res.render('register', {
        name, email, password, confirmPassword
      })
    }
    return User.create({
      name, email, password
    })
      .then(res.redirect('/'))
      .catch(err => console.log(err))
  })
})

module.exports = router
