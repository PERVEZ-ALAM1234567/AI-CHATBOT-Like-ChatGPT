import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Node.js me fetch use karne ke liye

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = '1666f417d9c7460f998d558527623d2e';

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',  // ya koi aur model jo available ho
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();
    console.log(data); // Server pe print karega

    if (data.choices && data.choices.length > 0) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.json({ reply: "Sorry, no reply received from AI." });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ reply: "Sorry, failed to get reply from AI." });
  }
});

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
