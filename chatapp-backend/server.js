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


const port = 8000;
mongoose
  .connect("mongodb://localhost:27017/chatApp")
  .then(() => {
    app.listen(port, function () {
      console.log(`running on http://localhost:${port}`);
    });
  });
