const express = require('express');
const fs = require('fs');
const { OpenAI } = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: 'YOUR_API_KEY' });

const knowledgeBase = JSON.parse(fs.readFileSync('knowledge.json'));

function retrieveRelevantAnswer(query) {
  return knowledgeBase.find(k =>
    query.toLowerCase().includes(k.question.toLowerCase())
  )?.answer || '';
}

app.post('/ask', async (req, res) => {
  const userMessage = req.body.message;
  const context = retrieveRelevantAnswer(userMessage);

  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    ...(context ? [{ role: 'user', content: `Context: ${context}` }] : []),
    { role: 'user', content: userMessage }
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages
  });

  res.json({ reply: completion.choices[0].message.content });
});
