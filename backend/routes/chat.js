const express = require('express');
const OpenAI = require('openai');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat endpoint for students and teachers
router.post('/chat', async (req, res) => {
  try {
    const { message, role } = req.body; // role can be 'student' or 'teacher'

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Create system prompt based on role
    let systemPrompt = '';
    if (role === 'student') {
      systemPrompt = 'You are an AI study assistant helping students with their learning. Provide clear, helpful explanations and encourage understanding.';
    } else if (role === 'teacher') {
      systemPrompt = 'You are an AI teaching assistant helping teachers with lesson planning, student assessment, and educational strategies. Provide professional, educational guidance.';
    } else {
      systemPrompt = 'You are a helpful AI assistant for educational purposes.';
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({ response: aiResponse });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ message: 'Failed to get AI response' });
  }
});

module.exports = router;