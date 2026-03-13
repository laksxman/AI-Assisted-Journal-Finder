const redis = require('redis');
require('dotenv').config();

let client;

const connectRedis = async () => {
  try {
    client = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      password: process.env.REDIS_PASSWORD || 'redis_password'
    });

    client.on('error', (err) => {
      console.error('❌ Redis Client Error:', err);
    });

    client.on('connect', () => {
      console.log('✅ Redis Connected');
    });

    await client.connect();
    return client;
  } catch (error) {
    console.error('❌ Redis connection failed:', error);
    // Continue without Redis
    return null;
  }
};

const getRedisClient = () => client;

module.exports = { connectRedis, getRedisClient };

