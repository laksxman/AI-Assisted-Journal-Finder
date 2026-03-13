const crypto = require('crypto');
const { getRedisClient } = require('../config/redis');
const { CACHE_TTL_ANALYSIS, CACHE_TTL_INSIGHTS } = require('../utils/constants');

const getCacheKey = (type, id) => {
  return `${type}:${id}`;
};

const getTextHash = (text) => {
  return crypto.createHash('md5').update(text).digest('hex');
};

const cacheAnalysis = async (text, analysis) => {
  const client = getRedisClient();
  if (!client) return;

  const hash = getTextHash(text);
  const key = getCacheKey('analysis', hash);
  
  try {
    await client.set(key, JSON.stringify(analysis), {
      EX: CACHE_TTL_ANALYSIS
    });
  } catch (error) {
    console.error('Cache set error:', error);
  }
};

const getCachedAnalysis = async (text) => {
  const client = getRedisClient();
  if (!client) return null;

  const hash = getTextHash(text);
  const key = getCacheKey('analysis', hash);
  
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
};

const cacheInsights = async (userId, insights) => {
  const client = getRedisClient();
  if (!client) return;

  const key = getCacheKey('insights', userId);
  
  try {
    await client.set(key, JSON.stringify(insights), {
      EX: CACHE_TTL_INSIGHTS
    });
  } catch (error) {
    console.error('Insights cache error:', error);
  }
};

const getCachedInsights = async (userId) => {
  const client = getRedisClient();
  if (!client) return null;

  const key = getCacheKey('insights', userId);
  
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Insights cache get error:', error);
    return null;
  }
};

module.exports = {
  cacheAnalysis,
  getCachedAnalysis,
  cacheInsights,
  getCachedInsights
};

