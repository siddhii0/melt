const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
router.get('/currently-playing', async (req, res) => {
  res.json({ demo: true, note: 'pass your Spotify Bearer token here later' });
});
module.exports = router;
