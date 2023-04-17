// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

// require handlebars in the project
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

//Setting routes
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(function (restaurant) {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurant })
})


app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()

  const restaurants = restaurantList.results.filter(function (restaurant) {

    const searchByName = restaurant.name.toLowerCase().trim().includes(keyword)
    const searchByCategory = restaurant.category.toLowerCase().includes(keyword)

    return searchByName || searchByCategory
  })

  //if don't find any result，render error view
  if (restaurants.length !== 0) {
    res.render('index', { restaurants, keyword })
  } else {
    res.render('error', { keyword })
  }
})

//start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})