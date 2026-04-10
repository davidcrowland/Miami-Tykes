# 🌴 Miami Tykes

Miami Vice-themed family activity finder for Miami-Dade. Live event searches, static venues, and AI-powered suggestions.

---

## Deploy to Railway (5 minutes)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Miami Tykes initial commit"
# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/miami-tykes.git
git push -u origin main
```

### 2. Deploy on Railway
1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your `miami-tykes` repo
4. Railway will auto-detect the config and start building

### 3. Add your API key
1. In Railway, open your project → **Variables**
2. Add: `ANTHROPIC_API_KEY` = `your-key-here`
3. Railway will redeploy automatically

### 4. Get your URL
Railway gives you a public URL like `miami-tykes-production.up.railway.app` — share it with anyone!

---

## Local Development

```bash
npm install

# Terminal 1 — backend
npm run dev:server

# Terminal 2 — frontend (with hot reload)
npm run dev:client
```

Frontend runs at `http://localhost:5173`, proxies API calls to the Express server at port 3000.

Add your API key to a `.env` file:
```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## How it works

- **Frontend**: React + Vite, Miami Vice theme
- **Backend**: Express server proxies calls to Anthropic API (keeps key secret)
- **Search**: Uses Claude with web search to find live events at each venue
- **Static data**: 100+ hardcoded venues and dated events across Miami-Dade
