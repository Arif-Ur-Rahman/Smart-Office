const config = require('./src/config/development.json');
const app = require('./app');
const mongoose = require('mongoose');
const { transporter } = require('./src/api/middlewares/email')


// connect to the Database
// database = `mongodb+srv://${config.database.username}:${config.database.password}@cluster0.1msjaoz.mongodb.net/${config.database.database_name}`
database = `mongodb+srv://${config.database.username}:${config.database.password}@cluster0.fjmsj2m.mongodb.net/${config.database.database_name}`
mongoose.connect(database, {
  ssl: true,
  sslValidate: false
}, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Conntected to Database'));


transporter.verify(function (error, success) {
  if (error) {
    console.log(`failed to connect with mail server.\n ${error}`);
  } else {
    console.log("Connected to mail server");
  }
});


// connect to the Server
let Port = config.server.port
let Server = config.server.server;
app.listen(Port, () => {
  console.log(`Server started at ${Server}:${Port}`);
})   