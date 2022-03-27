const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const route = require("./routes");

// Connect to db
db.connect();
const app = express();

//Connect client
app.use(cors());

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Route init
route(app);

// set port, listen for requests
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
