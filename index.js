const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./db'); // This will connect to your MongoDB
const Restaurant = require('./restaurant'); // Import the model

const app = express();
app.use(bodyParser.json());

// Fetch all restaurants
app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  try {
    const cuisine = req.params.cuisine;
    const restaurants = await Restaurant.find({ cuisine: cuisine });
    res.json(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/restaurants', async (req, res) => {
  const sortBy = req.query.sortBy === 'DESC' ? -1 : 1;
  try {
    const restaurants = await Restaurant.find({}, 'cuisine name city restaurant_id')
                                         .sort({restaurant_id: sortBy});
    res.json(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/restaurants/Delicatessen', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ cuisine: 'Delicatessen', city: { $ne: 'Brooklyn' } }, 'cuisine name city -_id')
                                         .sort({name: 1});
    res.json(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Add more routes as required for filtering, sorting, etc.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
