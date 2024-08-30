const mongoose = require("mongoose");
const dotenv = require('dotenv'); 

// Load environment variables from .env file
dotenv.config(); 

const dbconnection = () => {
    console.log("Mongo URI:", process.env.MONG_URI); // Debugging line

    mongoose.connect(process.env.MONG_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message); // Improved error message
    });
};

module.exports = dbconnection;
