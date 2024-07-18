const { ActorController } = require("../controllers/ActorController")
const { verifyToken } = require("../middleware/auth")
const uploadCloud = require("../middleware/upload")

const route = require("express").Router()

route.get("/actor/",verifyToken, ActorController.getAll)
route.get("/actor/:id", ActorController.get)
route.put("/actor/:id", ActorController.update)
route.delete("/actor/:id", ActorController.delete)
route.post("/actor/", uploadCloud.single('pic'),ActorController.create)

module.exports = route