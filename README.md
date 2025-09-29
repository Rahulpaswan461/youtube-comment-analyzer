# YouTube Comment Analyzer 🎥💬

[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![YouTube API](https://img.shields.io/badge/API-YouTube-red?logo=youtube)](https://developers.google.com/youtube/v3)
[![Gemini](https://img.shields.io/badge/AI-Gemini-purple?logo=google)](https://ai.google/)

A web app that fetches and analyzes YouTube video comments to provide insights like sentiment, trends, and useful summaries.

---

## 🚀 Features

* Fetch comments from any YouTube video (via YouTube Data API).
* Analyze comments for:

  * ✅ Sentiment (positive / negative / neutral)
  * ✅ Keyword extraction
  * ✅ Summary / insights (powered by AI)
* Simple and clean frontend built with React + TypeScript.
* Backend integration for API calls and AI models.

---

## 🛠️ Tech Stack

**Frontend:** React, TypeScript, Tailwind, Vite
**Backend:** Node.js, Express
**APIs:** YouTube Data API v3, Google Gemini API (or OpenAI, configurable)
**Others:** dotenv for env vars, Axios for requests

---

## 📂 Project Structure

```
youtube-comment-analyzer/
│
├── Frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Custom hooks (e.g. use-toast)
│   │   └── ...
│   └── package.json
│
├── Backend/              # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── index.js
│
├── .env                  # Environment variables
└── README.md             # Project documentation
```

---

## ⚙️ Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/youtube-comment-analyzer.git
cd youtube-comment-analyzer
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/` and add:

```
YOUTUBE_API_KEY=your_youtube_api_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

---

## ▶️ Usage

1. Open the frontend in your browser (`http://localhost:5173` or similar).
2. Paste a YouTube video URL.
3. Click **Analyze Comments**.
4. View insights, sentiment analysis, and trends.


---

## 🧑‍💻 Contributing

Pull requests are welcome! If you’d like to add new features, feel free to open an issue first to discuss what you’d like to change.

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🧩 Workflow Diagram  

```mermaid
flowchart TD
    A[User] -->|Enters YouTube URL| B[Frontend - React]
    B -->|API Request| C[Backend - Node/Express]
    C -->|Fetch Comments| D[YouTube Data API]
    D --> C
    C -->|Send Comments| E[Gemini / AI Model]
    E --> C
    C -->|Processed Insights| B
    B -->|Display Results| A

