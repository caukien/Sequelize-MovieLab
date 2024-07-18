const { DirectorController } = require("../controllers/DirectorController")

const route = require("express").Router()

route.get("/director/", DirectorController.getAll)
route.get("/director/:id", DirectorController.get)
route.put("/director/:id", DirectorController.update)
route.delete("/director/:id", DirectorController.delete)
route.post("/director/", DirectorController.create)

module.exports = route