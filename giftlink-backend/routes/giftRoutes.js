router.get('/', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
        // const db = {{insert code here}}

        // Task 2: use the collection() method to retrieve the gift collection
        // {{insert code here}}

        // Task 3: Fetch all gifts using the collection.find method. Chain with toArray method to convert to JSON array
        // const gifts = {{insert code here}}

        // Task 4: return the gifts using the res.json method
        res.json(/* {{insert code here}} */);
    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).send('Error fetching gifts');
    }
});

router.get('/:id', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
        // const db = {{insert code here}}

        // Task 2: use the collection() method to retrieve the gift collection
        // {{insert code here}}

        const id = req.params.id;

        // Task 3: Find a specific gift by ID using the collection.fineOne method and store in constant called gift
        // {{insert code here}}

        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        res.json(gift);
    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift');
    }
});

const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");

router.get("/api/gifts", async (req, res) => {
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();

        // Task 2: Use the collection() method to retrieve the gift collection
        const giftCollection = db.collection("gift");

        // Task 3: Fetch all gifts using the collection.find method
        const gifts = await giftCollection.find({}).toArray();

        // Task 4: Return the gifts using the res.json method
        res.json(gifts);
    } catch (error) {
        console.error("Error retrieving gifts:", error);
        res.status(500).json({ error: "Failed to retrieve gifts" });
    }
});

router.get("/api/gifts/:id", async (req, res) => {
    try {
        // Extract the ID from the route parameters
        const giftId = req.params.id;

        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();

        // Task 2: Use the collection() method to retrieve the gift collection
        const giftCollection = db.collection("gift");

        // Task 3: Find a specific gift by ID using the collection.findOne method
        const gift = await giftCollection.findOne({ _id: new ObjectId(giftId) });

        if (!gift) {
            return res.status(404).json({ error: "Gift not found" });
        }

        // Return the found gift
        res.json(gift);
    } catch (error) {
        console.error("Error retrieving gift by ID:", error);
        res.status(500).json({ error: "Failed to retrieve gift" });
    }
});

module.exports = router;




// Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.insertOne(req.body);

        res.status(201).json(gift.ops[0]);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
