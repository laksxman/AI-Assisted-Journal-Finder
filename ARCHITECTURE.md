# Architecture & Scaling Guide

## 🏗 System Design

```
User → React Frontend (Vite/Tailwind) → Express API → MongoDB
                                              ↓
                                          OpenAI GPT (cached Redis)
```

**Layers:**
- **API Gateway** (future): Load balancing
- **Backend**: Express microservices (journals, ai, insights)
- **Cache**: Redis (analysis results)
- **DB**: MongoDB sharded clusters
- **AI**: OpenAI + fallback local model

## 🚀 Scaling to 100k Users

### Horizontal Scaling
```
3x Backend instances (PM2/Docker Swarm/K8s)
NGINX Load Balancer
MongoDB Replica Set (3 nodes) + Sharding (userId hash)
Redis Cluster
CDN for frontend static assets
```

### Database
```
Indexes: userId+createdAt (entries), ambience (insights)
Sharding Key: userId
Read Replicas for insights
TTL Indexes for old entries (optional)
```

### Performance
- **Pagination**: Skip/limit on history
- **Aggregation Cache**: Redis TTL 5min for insights
- **Connection Pooling**: Mongoose maxPoolSize=50

## 💰 Reducing OpenAI Costs (Critical)

1. **Text Hash Caching**: MD5(text) → Redis TTL 24h (`$10k/month → $1k`)
2. **Similar Text Clustering**: Vector embeddings (future)
3. **Batch Analysis**: Queue daily insights
4. **Fallback Model**: Local Llama3 for simple sentiment
5. **Prompt Optimization**: Fixed template, no extras

**Cost Math:** 100k users × 10 entries/month × $0.002/1k tokens = $2k/month → Cached: $200/month

## 🔒 Security

### Data Protection
```
Journal Encryption: AES-256 (user key in frontend → backend decrypt)
Field Level: text/emotion encrypted
Auth: JWT + Refresh tokens
Rate Limit: 100 req/15min per IP
Input Validation: Joi schemas
XSS/CSRF: helmet, sanitized inputs
```

### Compliance
- GDPR: Data export/delete endpoints
- Secrets: Doppler/Vault rotation

## 📊 Monitoring & Observability
```
- Logs: Winston + ELK Stack
- Metrics: Prometheus + Grafana (response time, OpenAI usage)
- Alerts: 500 errors, cache miss >20%
- APM: New Relic/Sentry
```

## 🔄 CI/CD Pipeline
```
GitHub Actions:
- Lint/Test → Docker Build → Deploy to EC2/Railway/Vercel
```

## 📈 Future Enhancements
1. Real-time collab (Socket.io)
2. Mobile App (React Native)
3. Voice-to-Text (Whisper API)
4. Mood Trends ML (TensorFlow.js)
5. Export PDF reports

**Current Capacity:** 10k DAU → Scale ready for 100k with above optimizations.

