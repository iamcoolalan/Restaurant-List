// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const restaurants = require('./restaurant.json')

// require handlebars in the project
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

//Setting routes
app.get('/', (req, res) => {
  res.render('index', { restaurants : restaurants.results} )
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurants.results.find(function(restaurant){
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurant : restaurant})
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})