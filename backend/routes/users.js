const express = require('express');
const router = express.Router();

// Example routes (you can add your own)
router.get('/', (req, res) => {
  res.send('User route is working!');
});

module.exports = router;
