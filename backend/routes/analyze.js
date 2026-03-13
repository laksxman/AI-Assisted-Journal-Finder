const express = require('express');
const { analyzeJournal } = require('../services/aiService');
const { validateAnalyze } = require('../middleware/validation');
const ErrorResponse = require('../utils/errorResponse');

const router = express.Router();

router
  .route('/')
  .post(validateAnalyze, async (req, res, next) => {
    try {
      const { text } = req.body;
      const analysis = await analyzeJournal(text);
      
      res.json({
        success: true,
        data: analysis
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;

