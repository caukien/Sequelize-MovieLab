const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors")
require("dotenv").config()
require("./conection")

const PORT = process.env.PORT || 3000;
const GenreRoute = require("./routes/genreRoute")
const DirectorRoute = require("./routes/DirectorRoute")
const ActorRoute = require("./routes/ActorRoute")
const MovieRoute = require("./routes/MovieRoute")
const CountryRoute = require("./routes/CountryRoute")
const ProductRoute = require("./routes/ProductRoute")
const UserRoute = require("./routes/UserRoute")

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.json());
app.use(cors())

//Routes
app.use("/api", GenreRoute)
app.use("/api", DirectorRoute)
app.use("/api", ActorRoute)
app.use("/api", MovieRoute)
app.use("/api", CountryRoute)
app.use("/api", ProductRoute)
app.use("/api", UserRoute)


app.get("/", (res) => {
  res.statusCode(200).json("knasdkfn");
});

app.listen(PORT, () => {
  console.log("Server is running");
});
