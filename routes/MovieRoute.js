const { MovieController } = require("../controllers/MovieController")
const uploadCloud = require("../middleware/upload")

const route = require("express").Router()

route.get("/movie/", MovieController.getAll)
route.get("/movie/:id", MovieController.get)
route.put("/movie/:id", MovieController.update)
route.delete("/movie/:id", MovieController.delete)
route.post("/movie/",  MovieController.create)

module.exports = route