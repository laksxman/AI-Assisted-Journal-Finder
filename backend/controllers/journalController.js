const Journal = require("../models/Journal");
const { analyzeJournal } = require("../services/aiService");
const { getCachedInsights, cacheInsights } = require("../services/cacheService");
const ErrorResponse = require("../utils/errorResponse");

// @desc Create journal entry with AI analysis
// @route POST /api/journal
const createJournal = async (req, res, next) => {
  try {
    const { userId, ambience, text } = req.body;

    if (!userId || !text) {
      return next(new ErrorResponse("userId and text are required", 400));
    }

    // AI Analysis
    const analysis = await analyzeJournal(text);

    const journalEntry = await Journal.create({
      userId,
      ambience,
      text,
      emotion: analysis.emotion,
      keywords: analysis.keywords,
      summary: analysis.summary
    });

    res.status(201).json({
      success: true,
      data: journalEntry
    });

  } catch (error) {
    console.error("Create Journal Error:", error);
    next(error);
  }
};



// @desc Get user journal entries
// @route GET /api/journal/:userId
const getUserJournals = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const journals = await Journal.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Journal.countDocuments({ userId });

    res.json({
      success: true,
      data: journals,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Get Journals Error:", error);
    next(error);
  }
};



// @desc Get user insights
// @route GET /api/journal/insights/:userId
const getUserInsights = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Check cache first
    let insights = await getCachedInsights(userId);
    if (insights) {
      return res.json({
        success: true,
        data: insights
      });
    }

    // Get total entries
    const totalEntries = await Journal.countDocuments({ userId });

    if (totalEntries === 0) {
      insights = {
        totalEntries: 0,
        topEmotion: "neutral",
        mostUsedAmbience: "forest",
        recentKeywords: []
      };

      return res.json({
        success: true,
        data: insights
      });
    }

    // Top emotion
    const emotionAgg = await Journal.aggregate([
      { $match: { userId } },
      { $group: { _id: "$emotion", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const topEmotion = emotionAgg[0]?._id || "neutral";


    // Most used ambience
    const ambienceAgg = await Journal.aggregate([
      { $match: { userId } },
      { $group: { _id: "$ambience", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const mostUsedAmbience = ambienceAgg[0]?._id || "forest";


    // Recent keywords
    const keywordAgg = await Journal.aggregate([
      { $match: { userId } },
      { $unwind: "$keywords" },
      { $group: { _id: "$keywords", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const recentKeywords = keywordAgg.map(k => k._id);


    insights = {
      totalEntries,
      topEmotion,
      mostUsedAmbience,
      recentKeywords
    };

    // Cache insights
    await cacheInsights(userId, insights);

    res.json({
      success: true,
      data: insights
    });

  } catch (error) {
    console.error("Insights Error:", error);
    next(error);
  }
};



module.exports = {
  createJournal,
  getUserJournals,
  getUserInsights
};