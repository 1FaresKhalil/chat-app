const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { Middleware } = require("./Middlewares/middleware");
const { routes } = require("./Routes/routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Middleware);

routes(app);

const DB_URI = "mongodb+srv://fareskhalel:Fares123456789@cluster0.fm5zods.mongodb.net/chatApp?retryWrites=true&w=majority"
const port = 8000;
mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(port, function () {
      console.log(`running on http://localhost:${port}`);
    });
  });
