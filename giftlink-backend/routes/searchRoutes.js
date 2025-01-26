const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../models/db');

// Search for gifts
router.get('/', async (req, res, next) => {
    try {
        // Task 1: Connect to MongoDB using connectToDatabase
        const db = await connectToDatabase();

        const collection = db.collection("gifts");

        // Initialize the query object
        let query = {};

        // Add the name filter to the query if the name parameter is not empty
        if (req.query.name && req.query.name.trim() !== "") {
            query.name = { $regex: req.query.name, $options: "i" }; // Using regex for partial match, case-insensitive
        }

        // Task 3: Add other filters to the query
        if (req.query.category && req.query.category.trim() !== "") {
            query.category = req.query.category; // Exact match
        }

        if (req.query.condition && req.query.condition.trim() !== "") {
            query.condition = req.query.condition; // Exact match
        }

        if (req.query.age_years && !isNaN(req.query.age_years)) {
            query.age_years = { $lte: parseInt(req.query.age_years, 10) }; // Filter for age less than or equal to the provided value
        }

        // Task 4: Fetch filtered gifts using the find(query) method
        const gifts = await collection.find(query).toArray();

        // Respond with the gifts
        res.json(gifts);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
