// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance){
        return dbInstance
    };

    const client = new MongoClient(url);      

    // Task 1: Connect to MongoDB
    // {{insert code}}

    // Task 2: Connect to database giftDB and store in variable dbInstance
    //{{insert code}}

    // Task 3: Return database instance
    // {{insert code}}
}
const { MongoClient } = require('mongodb');

// MongoDB URI (replace with your own connection string if needed)
const uri = "mongodb://localhost:27017"; // Adjust this to your MongoDB server URI

let dbInstance; // Variable to hold the database instance

async function connectToDatabase() {
    try {
        // Task 1: Connect to MongoDB
        const client = new MongoClient(uri);
        await client.connect();
        console.log("Connected to MongoDB successfully!");

        // Task 2: Connect to database giftDB and store in variable dbInstance
        dbInstance = client.db("giftDB");
        console.log("Connected to database: giftDB");

        // Task 3: Return the database instance
        return dbInstance;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Re-throw the error for handling in higher-level logic
    }
}

module.exports = { connectToDatabase };


module.exports = connectToDatabase;
