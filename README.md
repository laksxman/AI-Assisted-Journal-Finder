# AI-Assisted Journal System 🚀

Production-ready **MERN stack** application for AI-powered journaling with ambience sessions (forest, ocean, mountain). Features sentiment analysis, keyword extraction, summaries, and insights dashboard using OpenAI GPT.

![Demo](screenshots/demo.png) <!-- Add screenshot after setup -->

## ✨ Features
- **Journal Entry**: Select ambience, write entry, AI auto-analysis (emotion, keywords, summary)
- **History**: View past entries with emotion badges and insights
- **Insights Dashboard**: Charts for emotions, ambience usage, total entries, top emotion
- **REST API**: Full CRUD + aggregation endpoints
- **Production Ready**: Rate limiting, validation, caching (Redis), error handling, Docker
- **Scalable**: Clean architecture for 100k+ users

## 🛠 Tech Stack
```
Frontend: Vite + React 18 + TailwindCSS + Recharts + React Router
Backend: Node.js + Express + MongoDB (Mongoose) + OpenAI API
Infra: Docker + Redis (caching) + Rate Limiting
```

## 📦 Quick Start

1. **Clone & Install**
```bash
git clone <repo> ai-journal-system
cd ai-journal-system
npm run install:all
```

2. **Setup Environment**
```bash
cp .env.example .env
# Edit .env: Add OPENAI_API_KEY, MONGODB_URI (use MongoDB Atlas or local)
```

3. **Development**
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api

4. **Production**
```bash
npm run build
npm start  # Backend only, serve frontend/build statically
```

5. **Docker (Optional)**
```bash
docker-compose up -d  # Starts MongoDB + Redis
npm run dev
```

## 🔌 API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/journal` | Create journal entry + AI analysis |
| `GET` | `/api/journal/:userId` | Get user entries |
| `GET` | `/api/journal/insights/:userId` | Aggregated insights |
| `POST` | `/api/journal/analyze` | Standalone AI analysis |

**Example POST /api/journal:**
```json
{
  "userId": "user123",
  "ambience": "forest",
  "text": "Felt so peaceful walking among the trees..."
}
```

**Response:**
```json
{
  "emotion": "calm",
  "keywords": ["peaceful", "trees", "nature"],
  "summary": "User experienced deep relaxation in forest ambience"
}
```

## 📱 Frontend Routes
- `/` - Dashboard (Form + Insights + History)

Demo userId: `demo-user` (hardcoded for testing)

## 🏗 Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md)

## 🤝 Contributing
1. Fork & PR
2. Follow ESLint/Prettier
3. Add tests

## 📄 License
MIT
