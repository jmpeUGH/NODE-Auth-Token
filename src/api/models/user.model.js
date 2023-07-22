const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    email: {type:String, required: true},
    password:{type:String, required:true},
    username: {type:String, required: true},
    role: {type:String, default: "user", enum: ['admin', 'user', 'consult']}
},{
    //Otros campos adicionales
    collection:'users',
    timestamps: true
});

const User =mongoose.model('users', UserSchema); //Este es el nombre de la colección creada en mongoDB

module.exports = User;