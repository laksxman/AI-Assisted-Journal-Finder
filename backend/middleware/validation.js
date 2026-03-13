const Joi = require('joi');

const journalEntrySchema = Joi.object({
  userId: Joi.string().required(),
  ambience: Joi.string().valid('forest', 'ocean', 'mountain').required(),
  text: Joi.string().min(10).max(5000).required()
});

const analyzeSchema = Joi.object({
  text: Joi.string().min(10).max(5000).required()
});

const validateJournalEntry = (req, res, next) => {
  const { error } = journalEntrySchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }
  next();
};

const validateAnalyze = (req, res, next) => {
  const { error } = analyzeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validateJournalEntry,
  validateAnalyze
};

