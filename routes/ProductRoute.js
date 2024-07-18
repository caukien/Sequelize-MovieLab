const { ProductController } = require("../controllers/ProductController")

const route = require("express").Router()

route.get("/product/", ProductController.getall)
route.get("/product/:id", ProductController.get)
route.post("/product/", ProductController.create)
route.put("/product/:id", ProductController.update)
route.delete("/product/:id", ProductController.delete)


module.exports = route