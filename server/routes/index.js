const authRouter = require("./auth");
const userRouter = require("./posts");
const adminRouter = require("./admin");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api", userRouter);
  app.use("/api/admin", adminRouter);
}

module.exports = route;
