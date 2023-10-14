const mongoose = require("mongoose");

async function connectMongoDB(url) {
    console.log(`MongoDB connection initiating`);
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

module.exports = { connectMongoDB };
