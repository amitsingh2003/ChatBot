const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 5000;

// Initialize Google Generative AI with API key
const genAI = new GoogleGenerativeAI("AIzaSyAor6sJJ0e0ZsnnEquz5ZfvxrimKjquw2w");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(bodyParser.json());
app.use(cors());

// Endpoint for chatbot
app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;

    try {
        // Generate response from Google Gemini
        const result = await model.generateContent(prompt);
        res.json({ response: result.response.text() });
    } catch (error) {
        console.error('Error with Google Generative AI:', error.message);
        res.status(500).send('Error communicating with Google Generative AI');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
