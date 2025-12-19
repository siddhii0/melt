<div align="center">

# 🍲 MELT  
### AI-Powered Mood-Based Comfort Food Recommendation System

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&pause=1000&color=5C4AC7&center=true&width=700&lines=AI+Meets+Emotional+Wellness;Mood-Based+Food+%26+Drink+Recommendations;Secure+Full-Stack+AI+Application)](https://git.io/typing-svg)

![Project Status](https://img.shields.io/badge/Status-Active-success?style=flat)
![Tech](https://img.shields.io/badge/Tech-Full%20Stack-blue)
![AI](https://img.shields.io/badge/AI-OpenAI-purple)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

</div>

---

## 📖 About the Project

**MELT** is a **full-stack AI-powered web application** that analyzes a user’s emotional state from journal entries and provides personalized comfort recommendations.

The system suggests:
- Comfort food recipes  
- Mood-based color palettes  
- Music playlist vibes  
- Drink pairings  

MELT is built using a **secure backend-first AI architecture**, ensuring that AI API keys are never exposed to the frontend. The application also includes **graceful fallback handling**, making it reliable even when AI services are unavailable.

---

## 🎯 Key Features

- ✍️ Free-text journal input for mood expression  
- 🧠 AI-based mood analysis  
- 🍽️ Personalized comfort food recommendations  
- 🎨 Emotion-driven color palette generation  
- 🎵 Spotify playlist vibe suggestions  
- ☕ Drink pairing recommendations  
- 🔐 Secure backend-only AI integration  
- 🛡️ Graceful fallback for AI failures  

---

## 🧠 System Architecture

- **Frontend**: Handles user interaction and UI rendering  
- **Backend**: Exposes REST APIs and securely communicates with AI  
- **AI Layer**: Integrated only on the backend (no client-side AI calls)  

This architecture follows **real-world production best practices**.

---

## 🛠️ Tech Stack

### Frontend
- React  
- Vite  
- TypeScript  
- Tailwind CSS  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- OpenAI API  

---

## 📁 Project Structure

MELT/
├── melt/ # Frontend (React + Vite)
├── melt-backend/ # Backend (Node.js + Express)
└── README.md



---

## 🚀 Setup Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (local or cloud instance)
- OpenAI API key

---

### Backend Setup


cd melt-backend
npm install
cp .env.example .env
npm run dev

Backend will run on:
http://localhost:8080


Frontend Setup-
cd melt
npm install
cp .env.example .env
npm run dev

Frontend will run on:
http://localhost:5173


🔗 API Endpoints
Method	Endpoint	Description
GET	/api/health	Backend health check
GET	/api/ai/status	AI provider availability status
POST	/api/ai/mood	Analyze mood & return food recommendations
POST	/api/ai/drink	Provide drink pairing suggestions

🔐 Security Considerations
AI API keys stored only in backend environment variables
.env files excluded from version control
Frontend never communicates directly with AI providers
CORS-restricted API access
Graceful fallback responses prevent UI crashes

🎓 Academic & Professional Value
This project demonstrates:
Full-stack application development
Secure AI integration practices
REST API design
Error handling and fallback strategies
Production-aware software engineering mindset

👤 Author
Siddhi Mishra

📄 License
This project is intended for portfolio purposes.
