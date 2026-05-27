# VectorShift – Frontend Technical Assessment

A full-stack pipeline builder using **React + ReactFlow** on the frontend and **FastAPI** on the backend.

---

## 🗂️ Project Structure

```
frontend_technical_assessment/
├── backend/          # FastAPI Python backend
│   ├── venv/         # Python virtual environment
│   └── main.py       # FastAPI app entry point
├── frontend/         # React frontend
│   ├── public/
│   └── src/
│       ├── nodes/    # Custom ReactFlow node components
│       ├── App.js
│       ├── toolbar.js
│       ├── ui.js
│       ├── store.js
│       ├── submit.js
│       └── draggableNode.js
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+)
- [Python](https://www.python.org/) (v3.9+)
- [Git](https://git-scm.com/)

---

## 🚀 How to Start the App

> Open **two separate terminals** — one for the backend, one for the frontend.

---

### 🔵 Terminal 1 — Backend (FastAPI)

#### Windows
```bash
cd backend
.\venv\Scripts\python.exe -m pip install fastapi uvicorn python-multipart
.\venv\Scripts\uvicorn.exe main:app --reload
```

#### Mac / Linux
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn python-multipart
uvicorn main:app --reload
```

✅ Backend runs at → **http://localhost:8000**  
✅ API docs available at → **http://localhost:8000/docs**

---

### 🟢 Terminal 2 — Frontend (React)

#### Windows & Mac / Linux
```bash
cd frontend
npm install
npm start
```

✅ Frontend runs at → **http://localhost:3000**

---

## 🔁 Git Workflow

```bash
# After making changes:
git add .
git commit -m "your message"
git push
```

---

## 📦 Dependencies

### Backend
| Package | Purpose |
|---------|---------|
| `fastapi` | Web framework |
| `uvicorn` | ASGI server |
| `python-multipart` | Required for Form data parsing |

### Frontend
| Package | Purpose |
|---------|---------|
| `react` | UI framework |
| `reactflow` | Drag-and-drop pipeline builder |
| `zustand` | State management |

---

## 🌐 Repository

[https://github.com/udaykryadav/VectorShift](https://github.com/udaykryadav/VectorShift)
