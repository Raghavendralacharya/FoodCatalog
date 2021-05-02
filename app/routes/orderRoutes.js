const controller = require("../controllers/orderController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/test/all", controller.allAccess);

  app.post("/api/test/orderFood", controller.orderFood);
  // app.get("/api/test/addFood", controller.addFood);
};
