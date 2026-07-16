# ✅ TodoApp-CRUD

A task management application with full **Create, Read, Update, Delete (CRUD)** functionality — built to demonstrate clean full-stack architecture and state management.

<!-- ![demo](./screenshots/demo.gif) -->

🔗 **Live Demo:** [add-your-deployed-link-here]
📂 **Repo:** https://github.com/samrajay99/TodoApp-CRUD

---

## ✨ Features

- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Persistent storage (MongoDB) — tasks survive a page refresh
- Filter tasks (All / Active / Completed)
- Responsive, clean UI
- (Update this list to match what you actually built)

---

## 🛠️ Tech Stack

**Frontend:** ReactJS, [CSS3 / Tailwind — update]
**Backend:** Node.js, Express.js
**Database:** MongoDB
**Other tools:** Postman, Git

---

## 📸 Screenshots

| Task List | Add Task | Completed View |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/samrajay99/TodoApp-CRUD.git
cd TodoApp-CRUD

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### Environment Variables

`server/.env`:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Run Locally

```bash
# Backend
cd server
npm run dev

# Frontend (separate terminal)
cd client
npm start
```

Visit `http://localhost:3000`.

---

## 📁 Folder Structure

```
TodoApp-CRUD/
├── client/
│   ├── src/
│   │   ├── components/
│   │   └── App.js
├── server/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

---

## 🗺️ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

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
