const authRouter = require("./authRouter");
const appRouter = require("./appRouter");

const initRoutes = (app) => {
  app.use("/", authRouter);
  app.use("/", appRouter);
};

module.exports = initRoutes;
