const authRouter = require("./auth");
const userRouter = require("./posts");
const adminRouter = require("./admin");
const statusRouter = require("./status");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api", userRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api", statusRouter);
}

module.exports = route;
