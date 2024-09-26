const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async () => {
  try {
    //console.log("Esta es mi URI:", process.env.MONGO_URI);
    console.log("Ya se ha conectado la BBDD");
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error de conexión:', error.message);
    process.exit(1);
  }
};

module.exports = {
    dbConnection
};