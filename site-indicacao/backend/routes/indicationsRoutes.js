const express = require('express');
const { createIndication, updateIndicationStatus } = require('../controllers/indicationsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/indications', authMiddleware, createIndication);
router.put('/indications/:id/status', authMiddleware, updateIndicationStatus);

module.exports = router;
