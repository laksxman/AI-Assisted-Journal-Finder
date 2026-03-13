const express = require('express');
const {
  createJournal,
  getUserJournals,
  getUserInsights
} = require('../controllers/journalController');
const { validateJournalEntry } = require('../middleware/validation');
const ErrorResponse = require('../utils/errorResponse');

const router = express.Router();

router
  .route('/')
  .post(validateJournalEntry, createJournal);

router
  .route('/:userId')
  .get(getUserJournals);

router
  .route('/insights/:userId')
  .get(getUserInsights);

module.exports = router;

