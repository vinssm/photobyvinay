const mongoose = require("mongoose");

// Connect without the deprecated configuration options object
mongoose.connect();

module.exports = mongoose.connection;
