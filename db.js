const mongoose = require('mongoose');
require('dotenv').config();

// define mongoDB connection URL

//const mongoURL ='mongodb://127.0.0.1:27017/hotel'
//const mongoURL = process.env.MONGODB_URL_LOCAL // Replace 'mydatabase' wirh yor database name
const mongoURL = process.env.MONGODB_URL;

//set up mongoDB connection

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// get the default connection
// Mangoose maintains a default connection objectrepresenting the MongoDB connection

const db = mongoose.connection;

//Define  event listeners for database connection

db.on('connected',()=>{
    console.log('Connected to MongoDB server')
});

db.on('error', (err)=>{
    console.log('MongoDB connection error:',err);

});

db.on('disconnected', () => {
    console.log('MongoDB disconnected')
});

//Export the database connection

module.exports = db;



