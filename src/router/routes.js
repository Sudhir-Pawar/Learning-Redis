const router = require("express").Router();
const RouteController = require("../controllers/RouteController");

router.get("/", RouteController.getHomePage);

router.post("/tasks", RouteController.addTask);

router.delete("/tasks", RouteController.deleteTask);

router.post("/calls", RouteController.editCall);

module.exports = router;
