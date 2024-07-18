const { GenreController } = require("../controllers/genreController")
const route = require("express").Router()

route.get("/genre/", GenreController.getall)
route.get("/genre/:id", GenreController.get)
route.post("/genre/", GenreController.create)
route.put("/genre/:id", GenreController.update)
route.delete("/genre/:id", GenreController.delete)


module.exports = route