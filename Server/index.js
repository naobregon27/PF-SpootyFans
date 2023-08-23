require("dotenv").config();
const app = require("./src/app");
const port = process.env.PORT || 3001;
const { conn } = require("./src/db");
const llenarDB = require("./llenarDB");

//config socket.io

const http = require ("http");

const server = http.createServer();

const io = require('socket.io')(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('Se ha conectado un cliente');

  socket.broadcast.emit('chat_message', {
      usuario: 'INFO',
      mensaje: 'A new user has connected'
  });

  socket.on('chat_message', (data) => {
      io.emit('chat_message', data);
  });
});

server.listen(3002);


conn
  .sync({ alter: true })
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
