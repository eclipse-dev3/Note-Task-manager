# OwnDocs — Note & Task Manager

A polished, frontend-only productivity application built with **React.js** and **Tailwind CSS**.  
Designed for fast local productivity: create, organize, and manage notes and tasks with a clean, responsive UI. All data is persisted in the browser via **LocalStorage** — no backend required.

---

## 🔗 Live Demo

**[owndocs.vercel.app](https://owndocs.vercel.app)**

---

## 📌 Overview

OwnDocs is a single-page React application that combines a **Note Manager** and a **Task Tracker** into one seamless experience. It focuses on local-first UX, optimized performance, and cross-device compatibility — built for developers and productivity-focused users who want a lightweight, offline-ready tool.

---

## ✨ Features

### 📝 Notes
- Full **CRUD** — create, view, edit, and delete notes instantly
- **Pin / Unpin** notes for quick access
- **Soft delete** to Recycle Bin with restore or permanent delete
- **Debounced search** for optimized performance on large note lists
- **Folder-based navigation** — All, Pinned, Recycle Bin

### ✅ Tasks
- Create tasks with title, optional description, and timestamps
- **Mark tasks as complete** with auto-stored completion timestamp
- **Pin / Unpin** tasks for priority management
- **Soft delete / restore / permanently delete** tasks
- **Filter and search** across all folders
- Toggle completion directly from task cards

### 🗓️ Date Handling
- Centralized date utility supporting multiple input formats
- Displays short (`16 Oct 2025`) and full date-time formats
- Timestamps stored as ISO strings for cross-browser consistency

### 🎨 UI & UX
- Smooth animations and transitions throughout
- Hidden scrollbar option for a cleaner, distraction-free design
- **Sidebar navigation** for folders and quick actions
- Fully **responsive** — mobile to desktop

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **React.js** | Functional components + Hooks |
| **Tailwind CSS** | Utility-first styling & responsiveness |
| **Vite** | Fast build tool & dev server |
| **React Icons** | Consistent icon system |
| **LocalStorage** | Offline-first data persistence |
| **Vanilla JS** | Date parsing & formatting utilities |

---

## 📁 Project Structure

```
src/
├── Components/
│   ├── Notes/          # NoteApp, NoteList, NoteCard, NoteForm
│   ├── Todos/          # TodosApp, TodoList, TodoCard, TodoForm
│   └── Common/         # FormatDate.js, shared helpers
├── main.jsx            # Application entry point
└── index.css           # Tailwind + global styles
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/eclipse-dev3/owndocs

# Navigate into the project
cd owndocs

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build & Deploy

```bash
# Create production build
npm run build

# Deploy the dist/ folder to any static host:
# Vercel, Netlify, GitHub Pages, etc.
```

---

## 📋 Usage Notes

- **Local-only data** — clearing browser storage will remove all items
- **ISO timestamps** recommended for reliable date parsing across devices
- If you see "Invalid date" on mobile, ensure timestamps are ISO formatted
- No authentication or cloud sync — built for personal, client-side use

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please keep PRs small, focused, and well-documented.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

## 👨‍💻 Author

**Gourav Kumar** — Frontend Developer

- 🌐 Portfolio: [gauravk.vercel.app](https://gauravk.vercel.app)
- 💻 GitHub: [github.com/eclipse-dev3](https://github.com/eclipse-dev3)

---

> Built with ❤️ using React.js & Tailwind CSS