require("dotenv").config();
const app = require("./src/app");
const port = process.env.PORT || 3001;
const { conn } = require("./src/db");
const llenarDB = require("./llenarDB");

conn
  .sync({ force: true })
  .then(
    app.listen(port, () => {
      console.log(`Listen on Port: ${port}`);
    })
  )
  .then(() => {
    llenarDB();
    console.log("The database has been successfully populated.");
  })
  .catch((error) => console.error(error));
