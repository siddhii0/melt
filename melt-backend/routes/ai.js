const express = require('express');
const OpenAI = require('openai');
const router = express.Router();
router.get('/status', (_req, res) => {
  res.json({
    ok: true,
    provider: process.env.OPENAI_API_KEY ? 'openai' : 'none',
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    hasKey: Boolean(process.env.OPENAI_API_KEY),
    time: new Date().toISOString()
  });
});


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function fallbackMood() {
  return {
    mood: 'Comfort-seeking',
    colorPalette: {
      primary: '#F5E6CC',
      secondary: '#D9C3A9',
      text: '#333333',
      accent: '#C77D4A'
    },
    recipes: [
      {
        id: '1',
        title: 'Masala Khichdi',
        description: 'Warm, soothing comfort food.',
        ingredients: ['Rice', 'Dal', 'Spices'],
        flavorProfile: ['Savory', 'Mild']
      },
      {
        id: '2',
        title: 'Tomato Soup',
        description: 'Simple, tangy, and cozy.',
        ingredients: ['Tomatoes', 'Garlic', 'Pepper'],
        flavorProfile: ['Tangy', 'Warm']
      },
      {
        id: '3',
        title: 'Hot Chocolate',
        description: 'Rich, sweet, and heart-warming.',
        ingredients: ['Cocoa', 'Milk', 'Sugar'],
        flavorProfile: ['Sweet', 'Warm']
      }
    ],
    spotifyPlaylist: 'Rainy Day Jazz'
  };
}

// -------------------- MOOD --------------------
router.post('/mood', async (req, res) => {
  const { journalText, text } = req.body || {};
  const input = (journalText ?? text ?? '').trim();
  if (!input) return res.status(400).json({ error: 'journalText is required' });

  const prompt = `
You are an empathetic AI named MELT.
Analyze the journal entry and return ONLY valid JSON in this format:

{
  "mood": string,
  "colorPalette": {
    "primary": string,
    "secondary": string,
    "text": string,
    "accent": string
  },
  "recipes": [
    { "title": string, "description": string, "ingredients": string[], "flavorProfile": string[] },
    { "title": string, "description": string, "ingredients": string[], "flavorProfile": string[] },
    { "title": string, "description": string, "ingredients": string[], "flavorProfile": string[] }
  ],
  "spotifyPlaylist": string
}

Journal entry:
"${input}"
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const textOut = completion.choices[0].message.content;
    const jsonStart = textOut.indexOf('{');
    const jsonEnd = textOut.lastIndexOf('}');
    const parsed = JSON.parse(textOut.slice(jsonStart, jsonEnd + 1));

    const recipesWithIds = parsed.recipes.map(r => ({
      ...r,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    }));

    res.json({
      mood: parsed.mood,
      colorPalette: parsed.colorPalette,
      recipes: recipesWithIds,
      spotifyPlaylist: parsed.spotifyPlaylist
    });
  } catch (err) {
    console.error('OpenAI failed, fallback used:', err.message);
    res.json(fallbackMood());
  }
});

// -------------------- DRINK --------------------
router.post('/drink', async (req, res) => {
  const { songName, artistName, mood } = req.body || {};
  if (!songName || !artistName || !mood) {
    return res.status(400).json({ error: 'songName, artistName, mood required' });
  }

  const prompt = `
Return ONLY JSON:
{
  "drinkName": string,
  "drinkDescription": string
}

Song: "${songName}" by "${artistName}"
Mood: "${mood}"
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const textOut = completion.choices[0].message.content;
    const jsonStart = textOut.indexOf('{');
    const jsonEnd = textOut.lastIndexOf('}');
    const parsed = JSON.parse(textOut.slice(jsonStart, jsonEnd + 1));

    res.json(parsed);
  } catch (err) {
    console.error('OpenAI drink failed, fallback:', err.message);
    res.json({
      drinkName: 'Honey Lemon Tea',
      drinkDescription: 'A soothing drink that pairs well with cozy moods and chill music.'
    });
  }
});

module.exports = router;
