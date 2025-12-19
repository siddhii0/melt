const express = require('express');
const router = express.Router();
router.get('/feed', (_req, res) => res.json({ ok: true, route: 'community feed' }));
module.exports = router;
