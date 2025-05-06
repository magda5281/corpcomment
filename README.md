# CorpComment

**Educational project React + TypeScript + Vite**

CorpComment is a simple feedback‐collector app built with Vite, React and TypeScript. Along the way I explored controlled inputs, validation, children-composition patterns, data fetching, Context, performance optimizations, and—finally—Zustand for state management.

---

## Demo

CorpComment is deployed to **Vercel**.

🔗 **<a href="https://corpcomment-five.vercel.app/" target="_blank">CorpComment</a>**

## 🤔 What Is It?

A lightweight single-page app where anyone can leave a public comment for a company via a feedback form. Key points:

- **Hashtag requirement**: Every comment must include a hashtag (e.g. `#AcmeCo`).
- **Persistence**: Comments are saved to a backend JSON store (auto-deleted after 30 minutes).
- **Hashtag list**: All companies you’ve mentioned appear as clickable buttons to filter the feed.
- **Mindful commenting**: Comments become publicly visible—please keep them respectful and constructive.

---

## ⚙️ Tech & Tools

- **Vite** – lightning-fast dev and build tool
- **React 18 + TypeScript** – strongly-typed components and hooks
- **CSS** – responsive styles (mostly hard-coded in px for brevity)
- **Context API** (archived for reference) → **Zustand** (final)
- **Custom Hooks** (archived for reference)
- **`fetch` API** (GET & POST)
- **`useMemo`** – optimizes filtered lists

---

## 📋 Key Features

1. **Character Counter & Validation**

   - Enforces a configurable `MAX_CHARACTERS`.
   - Prevents input beyond the limit.
   - On submit, shows a “valid” or “invalid” outline for a few seconds.

2. **Hashtag-Based Comments**

   - Every feedback must include at least one `#CompanyName`.
   - Invalid submissions (too short or missing `#`) are rejected client-side.

3. **Live Feed & Filter**

   - Fetched feedbacks rendered as a list.
   - A “hashtag list” shows all companies mentioned.
   - Click a hashtag to filter the feed.

4. **Data Persistence**

   - **GET** `/api/feedbacks` to load all comments
   - **POST** `/api/feedbacks` to add a new comment  
      (Note: deleted after 30 min)
     CorpComment interacts with a RESTful JSON endpoint for managing feedback:
     All communications use standard HTTP verbs and JSON payloads, following core REST principles for a clean, predictable interface.

5. **State Management Evolution**
   - Prop drilling -> Context + custom hooks (left in code for reference)
   - Final: **Zustand** store for minimal boilerplate & memoized selectors & improved performance

---
