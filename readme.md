# Book Viewer - Full-Stack Take-Home Project

**Author:** Berlnty Kerlos  
**Tech Stack:** Node.js, TypeScript, React, Hono, TailwindCSS, React Query, Supabase (PostgreSQL)  

---

## Overview

This project demonstrates a **full-stack application** that separates **data ingestion** from **application delivery**. It consists of three main parts:

1. **Data Ingestion**
   - Scrapes a public-domain book (all chapters)
   - Summarizes each chapter using an LLM (Gemini API), with parallel requests for content chunks to improve efficiency
   - Stores structured data in a PostgreSQL database (Supabase)

2. **Backend API**
   - Built with **Node.js**, **TypeScript**, and **Hono**
   - Exposes REST APIs to retrieve chapter lists and individual chapters with summaries
   - Implements **CORS** for frontend consumption
   - Abstracts database access and enforces clean service boundaries

3. **Frontend Application**
   - Built with **React**, **TypeScript**, **TailwindCSS**, and **React Query**
   - Displays a **chapter list**, summaries, and full content
   - Responsive and readable layout for a clean reading experience

---

## Demo Layout

```
┌───────────────┬──────────────────────────────┐
│ Chapter List  │ Chapter Title                │
│ (scrollable)  │ Summary (highlighted)        │
│               │ Content (readable)           │
└───────────────┴──────────────────────────────┘
```

---

## Installation & Running

### Ingestion pipeline
```bash
cd data-ingest
npm install
cp .env.example .env
# Update .env with your Supabase URL and Service Role key and Gemini API key
npm run ingest
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your Supabase URL and Service Role key
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Update .env with VITE_API_URL pointing to backend
npm run dev
```

---

## API Endpoints

- **GET /api/chapters** – Returns a list of chapters (id, number, title)  
- **GET /api/chapters/:id** – Returns full chapter with summary  

Example response:

```json
{
  "id": "uuid",
  "chapter_number": 1,
  "title": "Chapter I",
  "summary": "Concise summary...",
  "content": "Full chapter text..."
}
```

---

## Features / Highlights

- **Data Ingestion Pipeline** – separate from the web app for clean data  
- **LLM Summaries** – summarized chapters using Gemini API  
- **Frontend UX** – scrollable chapter list, highlighted summary, readable content  
- **Full TypeScript** – end-to-end type safety  
- **CORS enabled** – frontend-backend separation handled properly  

---

## Notes for Reviewers

- This project focuses on **architecture, API design, and patterns**, not UI aesthetics  
- The frontend uses **React Query** for async data fetching and caching  
- The backend uses **Hono** for a lightweight and performant API  

---