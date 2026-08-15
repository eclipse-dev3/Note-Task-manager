# OwnDocs — Notes & Task Manager

A polished, frontend-only productivity app built with **React** and **Tailwind CSS** — notes and tasks in one clean, animated, local-first interface. No backend, no signup — everything lives in your browser.

🔗 **Live Demo:** [owndocs.vercel.app](https://owndocs.vercel.app)

---

## 📌 Overview

OwnDocs combines a **Note Manager** and a **Task Tracker** into a single-page app, built around a local-first philosophy: fast, private, and fully usable offline. It's designed to feel like a small, well-considered product rather than a portfolio CRUD exercise — with real attention paid to empty states, keyboard flow, dark mode, and graceful failure handling.

---

## ✨ Features

### 📝 Notes
- Full CRUD — create, edit, delete, instantly reflected
- Pin/unpin for quick access
- Soft delete → Recycle Bin, with restore or permanent delete
- Debounced search across title and content
- Folder-style filtering — All, Pinned, Locked, Recycle Bin
- Export any note to PDF

### ✅ Tasks
- Create, complete, and track tasks with timestamps
- Pin/unpin for priority
- Soft delete / restore / permanent delete
- Filter and search across all folders
- One-click completion toggle from the task card
- Export any task to PDF

### 🔒 PIN-Protected Locking
- Lock any note or task — locking itself never requires a PIN, only *viewing* a locked item does
- First-time setup walks you through creating your own PIN (no hardcoded default)
- "Forgot PIN?" recovery flow — resets and lets you set a fresh one
- Locked items appear blurred in the grid until unlocked

### 🎨 Interface
- Custom app shell with an animated, segmented tab switcher (Notes ⇄ Tasks) — the active pill slides and morphs color using Framer Motion shared-layout animation
- **Dark mode** — manual toggle, persisted across sessions, defaults to light on first visit
- Thoughtful empty states: a real onboarding screen for first-time users, distinct messaging for "no search results" vs. "empty folder"
- Fully responsive, mobile to desktop
- Modals render through a React Portal, so they reliably cover the full viewport regardless of animated parent elements

### ⌨️ Keyboard Shortcuts
- `N` — create a new note/task
- `/` — jump to search
- `Esc` — close the open form or modal
- (Deliberately not `Ctrl+N` — that combo is browser-reserved and can't be intercepted by a webpage; a plain letter key, ignored while typing, is the standard workaround.)

### 🛡️ Reliability
- App-wide Error Boundary — an unexpected render error shows a friendly recovery screen instead of a blank white page
- Soft-delete-first design on every destructive action, so nothing is ever a single click from permanent loss

### 🗓️ Date Handling
- Centralized date-formatting utility, used consistently across both Notes and Tasks
- Short (`16 Oct 2025`) and full date-time display formats
- Timestamps stored as ISO strings for cross-browser consistency

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React | Functional components + Hooks + Context API |
| Tailwind CSS v4 | Utility-first styling, dark mode via class strategy |
| Framer Motion | Shared-layout tab animation, modal transitions |
| Vite | Build tool & dev server |
| React Icons | Icon system |
| jsPDF | Client-side PDF export |
| LocalStorage | Offline-first data persistence |

---

## 📁 Project Structure

```
src/
├── Components/
│   ├── Notes/        # NoteApp, NoteList, NoteCard, NoteForm, NoteDetails, NoteSideBar
│   ├── Todos/        # TodosApp, TodosList, TodosCard, TodosForm, TodosDetails, TodosSidebar
│   └── Common/        # SearchBar, ConfirmModal, PinModal, ErrorBoundary
├── Context/            # NotesContext, TodosContext, ThemeContext
├── hooks/              # useKeyboardShortcuts, FormatDate utilities
├── App.jsx             # App shell — header, tab switcher, theme toggle
├── main.jsx            # Entry point, wraps app in ErrorBoundary
└── index.css           # Tailwind + dark mode variant config
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/eclipse-dev3/Note-Task-manager

# Navigate into the project
cd Note-Task-manager

# Install dependencies
npm install

# Start the development server
npm run dev
```
Open `http://localhost:5173` in your browser.

### Build & Deploy
```bash
# Create a production build
npm run build

# Deploy the dist/ folder to any static host — Vercel, Netlify, GitHub Pages
```

---

## 📋 Usage Notes

- **Local-only data** — everything lives in your browser's LocalStorage; clearing site data removes all notes and tasks. There's currently no export/backup feature, so this is a known limitation rather than a bug.
- **PIN lock is a UX feature, not encryption** — locked content is blurred and gated behind a PIN stored in LocalStorage, intended to prevent casual glances, not to secure sensitive data. Real security would require server-side handling.
- No authentication or cloud sync — this is intentionally a personal, client-side tool.

---

## 🗺️ Roadmap

Known gaps I'm actively working through, in rough priority order:
- Accessibility pass (ARIA labels and keyboard focus on interactive icons)
- Automated tests (Vitest + React Testing Library)
- Due dates and a "Today" view for tasks
- JSON export/import for data backup
- TypeScript migration

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

MIT License — free to use, modify, and distribute.

---

## 👨‍💻 Author

**Gourav Kumar** — Frontend Developer
🌐 Portfolio: [gauravk.vercel.app](https://gauravk.vercel.app)
💻 GitHub: [github.com/eclipse-dev3](https://github.com/eclipse-dev3)

Built with ❤️ using React & Tailwind CSS.