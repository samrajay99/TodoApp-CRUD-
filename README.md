# Daymark

A calm, focused task workspace for turning a busy day into a clear next step. Daymark is a full-stack Next.js application with a responsive interface, complete task management, and MongoDB persistence.

<!-- ![demo](./screenshots/demo.gif) -->

🔗 **Live Demo:** [add-your-deployed-link-here]
📂 **Repo:** https://github.com/samrajay99/TodoApp-CRUD

---

## Features

- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Search tasks instantly
- Filter by all, active, or completed
- Set low, medium, or high priority
- Add optional due dates
- View completion progress at a glance
- Responsive layout for desktop and mobile
- MongoDB persistence, with an in-memory fallback for local development

---

## 🛠️ Tech Stack

**App:** Next.js App Router, React, Route Handlers
**Database:** MongoDB with Mongoose
**UI:** CSS, Lucide React

---

## 📸 Screenshots

| Task List | Add Task | Completed View |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB local or MongoDB Atlas for persistent storage

### Installation

```bash
npm install
```

### Environment Variables

`.env.local`:
```
MONGODB_URI=mongodb://127.0.0.1:27017/taskdb
```

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`. Without MongoDB, the app uses an in-memory store for local development.

---

## 📁 Folder Structure

```
TodoApp-CRUD-/
├── app/
│   ├── api/tasks/
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── lib/db.js
├── models/Task.js
└── README.md
```

---

## 🗺️ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## 🔮 Future Improvements

- Add due dates & reminders
- Add priority levels/tags
- Add drag-and-drop reordering
- Add user accounts so tasks are per-user

---

## 👤 Author

**Samrajay Gupta**
[LinkedIn](https://linkedin.com/in/samrajaygupta1) · [GitHub](https://github.com/samrajay99) · samrajgupta250298@gmail.com
