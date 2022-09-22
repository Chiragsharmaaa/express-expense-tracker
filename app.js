const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./utils/database");
const expenseRoutes = require('./routes/expense');
const errorController = require('./controllers/get404');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(expenseRoutes);
app.use(errorController.get404);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
