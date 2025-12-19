// services/geminiService.ts — frontend calls your backend now
export const getMoodAndRecipes = async (journalText: string) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/mood`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ journalText }),
  });
  if (!r.ok) throw new Error('AI failed');
  return r.json();
};

export const getDrinkSuggestion = async (songName: string, artistName: string, mood: string) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/drink`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ songName, artistName, mood }),
  });
  if (!r.ok) throw new Error('AI failed');
  return r.json();
};
