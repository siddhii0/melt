\# MELT – AI-Powered Mood-Based Comfort Food App

MELT is a full-stack web application that understands a user’s emotional state from journal
entries and recommends comforting food, color palettes, music vibes, and drink pairings.
The project is built with a secure backend-first AI architecture and graceful fallback
handling to ensure reliability.

---

## 🌟 Key Features

- Mood analysis from free-text journal input
- AI-powered recipe recommendations
- Emotion-based color palette generation
- Spotify playlist vibe suggestions
- Drink pairing recommendations
- Secure backend-only AI integration
- Graceful fallback responses when AI is unavailable
- Clean and responsive user interface

---

## 🧠 System Architecture

MELT follows a clean separation of concerns:

- **Frontend** handles user interaction and UI rendering  
- **Backend** exposes REST APIs and securely communicates with the AI provider  
- **AI keys are never exposed to the client**

All AI requests are processed server-side, following real-world production security
standards.

---

## 🛠 Tech Stack

**Frontend**
- React
- Vite
- TypeScript
- Tailwind CSS

**Backend**
- Node.js
- Express
- MongoDB
- OpenAI API
- JWT Authentication

---

## 📁 Project Structure

MELT/
├── melt/ # Frontend (React + Vite)
├── melt-backend/ # Backend (Node.js + Express)
├── README.md

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or cloud)
- OpenAI API key

---

### Backend Setup

```bash
cd melt-backend
npm install
cp .env.example .env
npm run dev


The backend will start at:
http://localhost:8080

Frontend Setup:
cd melt
npm install
cp .env.example .env
npm run dev

The frontend will run at:
http://localhost:5173

