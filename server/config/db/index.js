const mongoose = require("mongoose");
const Role = require("../../app/models/Role");

async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mevn-learnit.vteuk.mongodb.net/mevn-learnit?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log("connect successfully!");

    // Setting up initial users
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await new Role({ name: "user" }).save();
      console.log("added 'user' to roles collection");
      await new Role({ name: "moderator" }).save();
      console.log("added 'moderator' to roles collection");
      await new Role({ name: "admin" }).save();
      console.log("added 'admin' to roles collection");
    }
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = { connect };
