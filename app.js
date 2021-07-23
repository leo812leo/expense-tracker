//import 
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const PORT = 3000


app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`APP is running on port http://localhost:${PORT}`)
})