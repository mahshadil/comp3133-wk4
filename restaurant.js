const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  borough: String,
  // Add other fields as needed
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
