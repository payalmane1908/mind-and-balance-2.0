const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Configuration, OpenAIApi } = require('openai');

// POST /api/chatbot - Chatbot integration
router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required' });

    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);

    // Fallback if no API key configured
    if (!process.env.OPENAI_API_KEY) {
      return res.json({ reply: "I'm here to listen. Try a 5-minute breathing exercise or journaling about how you feel." });
    }

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an empathetic mental wellbeing assistant. Keep responses short, supportive, and suggest simple exercises or journaling prompts.' },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    const reply = completion.data.choices?.[0]?.message?.content?.trim() ||
      "I'm here for you. Would you like a short breathing exercise or a journaling prompt?";

    res.json({ reply });
  } catch (error) {
    console.error('Chatbot error:', error?.response?.data || error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


