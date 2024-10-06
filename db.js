const mongoose = require('mongoose');
require('dotenv').config();

// const MONGO_URL = process.env.MONGODB_URL_LOCAL;
const MONGO_URL = process.env.MONGODB_URL;

mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("connected to mongo db serevr");
})

db.on('error',()=>{
    console.log("error to mongo db serevr");
})

db.on('disconnected',()=>{
    console.log("disconnected to mongo db serevr");
})

module.exports = db;