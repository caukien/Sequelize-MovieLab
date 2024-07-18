const { UserController } = require("../controllers/UserController")

const route = require("express").Router()


route.post("/login/", UserController.signin)
route.post("/register/", UserController.signup)

module.exports = route