const { CountryController } = require("../controllers/CountryController")

const route = require("express").Router()

route.get("/country/", CountryController.getall)
route.get("/country/:id", CountryController.get)
route.post("/country/", CountryController.create)
route.put("/country/:id", CountryController.update)
route.delete("/country/:id", CountryController.delete)


module.exports = route