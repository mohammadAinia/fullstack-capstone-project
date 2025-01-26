require('dotenv').config();
const express = require('express');
const axios = require('axios');
const logger = require('./logger');
const expressPino = require('express-pino-logger')({ logger });

// Task 1: Import the Natural library
const natural = require('natural');

// Task 2: Initialize the Express server
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(expressPino);

// Define the sentiment analysis route
// Task 3: Create the POST /sentiment endpoint
app.post('/sentiment', async (req, res) => {
    // Task 4: Extract the sentence parameter
    const { sentence } = req.body;

    if (!sentence) {
        logger.error('No sentence provided');
        return res.status(400).json({ error: 'No sentence provided' });
    }

    // Initialize the sentiment analyzer with the Natural's PorterStemmer and "English" language
    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");

    try {
        // Perform sentiment analysis
        const analysisResult = analyzer.getSentiment(sentence.split(' '));

        // Task 5: Set sentiment to negative, neutral, or positive based on score rules
        let sentiment = "neutral";
        if (analysisResult < 0) {
            sentiment = "negative";
        } else if (analysisResult >= 0.33) {
            sentiment = "positive";
        }

        // Logging the result
        logger.info(`Sentiment analysis result: ${analysisResult}`);

        // Task 6: Send a status code of 200 with the sentiment score and sentiment text
        res.status(200).json({ sentimentScore: analysisResult, sentiment });
    } catch (error) {
        logger.error(`Error performing sentiment analysis: ${error}`);
        // Task 7: If there is an error, return an HTTP code of 500 and a JSON error message
        res.status(500).json({ message: 'Error performing sentiment analysis' });
    }
});

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
