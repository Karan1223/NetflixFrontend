const mongoose = require('mongoose');

// Define the schema for the watchlist item
const watchlistSchema = new mongoose.Schema({
  movie: {
    type: String,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Watchlist model using the schema
const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
