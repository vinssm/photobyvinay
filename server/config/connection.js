const mongoose = require("mongoose");

// Connect without the deprecated configuration options object
mongoose.connect(
  process.env.ATLAS_URI ||
    "mongodb+srv://anunaidumeka_db_user:Gpy7KSwvgjCcotnp@cluster0.mbkdql3.mongodb.net/?appName=Cluster0",
);

module.exports = mongoose.connection;
