// routes/callRoutes.js
const express = require('express');
const { handleCallEvent } = require('../controllers/callController');
const router = express.Router();

router.post('/call-event', handleCallEvent);

module.exports = router;
