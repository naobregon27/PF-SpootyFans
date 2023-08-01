require("dotenv").config();
const app = require("./src/app");
const port = process.env.PORT || 3001;
const { conn } = require("./src/db");

conn
  .sync({ force: true })
  .then(app.listen(port, () => console.log(`Listen on Port: ${port}`)))
  .catch((error) => console.error(error));
