// lo primero que hago es traerme todas las importaciones
const express = require("express");
const cors = require("cors");
//Nos conectamos con el js que controla la conexión a Mongo
const {connect} = require("./src/utils/database");
const userRoutes = require('./src/api/routes/user.routes');
//vamos a traernos mi libreria dotenv con la que voy a guardar mis variables sensibles
require("dotenv").config();
// para crear mi servidor necesitamos ejecutar la libreria express
const app= express();

connect();
app.use(cors());
app.use(express.json());



//Le tengo que especificar un puerto, normalmente yo suelo pones el 5000, 8000, 8080
const PORT = process.env.PORT || 5000;

app.use('/users', userRoutes);

// app.use('/users', (req,res)=>{
//     res.send("Esto es users");
// });


app.use("/",(req,res)=>{
    res.send("Esto funciona");
})

app.listen(PORT,()=>{
    console.log("servidor levantado en http://localhost:" + PORT)
}
);