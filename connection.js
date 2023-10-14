// importing external objects
const mongoose = require("mongoose");

// connection function
function connectMongoDB(url) {
    console.log(`MongoDB connection initiating...`);
    return mongoose
        .connect(url)
        .then(() => {
            console.log(`MongoDB connected successfully at url: ${url}`);
        })
        .catch((err) => {
            console.log("mongodb connection failed");
            throw new Error(err);
        });
}

//exporting
module.exports = { connectMongoDB };
