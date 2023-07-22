const mongoose = require("mongoose");

require("dotenv").config();



const connect = async()=>{
    try {
        const db = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        //console.log(db.connection);
        const {name, host} = db.connection;
        console.log(`Base de datos: ${name} y host: ${host}`);
    } catch (error) {
        console.log(`Error al conectar a la base de datos: ${error}`);
    }
}

module.exports = {connect}