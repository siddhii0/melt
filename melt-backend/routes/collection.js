const express = require('express');
const Collection = require('../models/Collection');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  const cols = await Collection.find({ user: req.user.id }).populate('recipeIds');
  res.json(cols);
});

router.post('/', requireAuth, async (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name required' });
  const col = await Collection.create({ user: req.user.id, name, recipeIds: [] });
  res.status(201).json(col);
});

router.post('/:id/add', requireAuth, async (req, res) => {
  const { recipeId } = req.body || {};
  if (!recipeId) return res.status(400).json({ error: 'recipeId required' });
  const col = await Collection.findOne({ _id: req.params.id, user: req.user.id });
  if (!col) return res.status(404).json({ error: 'Not found' });
  col.recipeIds.push(recipeId);
  await col.save();
  res.json(col);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await Collection.deleteOne({ _id: req.params.id, user: req.user.id });
  res.json({ ok: true });
});

module.exports = router;
