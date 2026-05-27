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

---

## ✅ Assessment Progress

### Part 1 — Node Abstraction

**Problem:** All four original nodes (`inputNode`, `outputNode`, `llmNode`, `textNode`) duplicated the same JSX structure — fixed-size div, border, Handle imports, and local state boilerplate.

**Solution:** Created a `BaseNode` component that accepts pure config objects, so adding a new node requires zero boilerplate.

#### What was built

**`frontend/src/nodes/BaseNode.js`** — Core abstraction component.  
Accepts these props:

| Prop | Type | Purpose |
|------|------|---------|
| `id` | string | Node ID from ReactFlow |
| `title` | string | Header label |
| `color` | string | Header accent color |
| `icon` | string | Emoji shown in header |
| `fields[]` | array | Input fields to render |
| `handles[]` | array | ReactFlow handles (ports) |

Each `field` object:
```js
{ name, label, type, defaultValue, options, placeholder, rows }
// type: 'text' | 'select' | 'textarea' | 'number'
```

Each `handle` object:
```js
{ id, type, position, label, style }
// position: 'left' | 'right'
// type: 'source' | 'target'
```

**`frontend/src/nodes/BaseNode.css`** — Shared premium dark-theme styles for all nodes.

#### Refactored existing nodes

All 4 original nodes were rewritten as thin wrappers around `BaseNode`:

```js
// Before (inputNode.js) — ~48 lines of mixed JSX + logic
export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(...);
  const [inputType, setInputType] = useState(...);
  // ... manual onChange handlers, JSX layout ...
};

// After — 20 lines of pure config
export const InputNode = ({ id, data }) => (
  <BaseNode id={id} title="Input" icon="📥" color="#059669"
    fields={[
      { name: 'inputName', label: 'Name', type: 'text', defaultValue: ... },
      { name: 'inputType', label: 'Type', type: 'select', options: [...] },
    ]}
    handles={[{ id: 'value', type: 'source', position: 'right' }]}
  />
);
```

#### Five new nodes (demonstrating the abstraction)

| Node | File | Handles | Fields |
|------|------|---------|--------|
| 📝 Note | `noteNode.js` | None | Content (textarea) |
| 🔍 Filter | `filterNode.js` | 1 in / 1 out | Condition (select), Match Value (text) |
| ➕ Math | `mathNode.js` | 2 in (A, B) / 1 out | Operator (select) |
| 🌐 API Request | `apiNode.js` | 1 in / 1 out | Method (select), URL (text) |
| 🔀 Classifier | `classifierNode.js` | 1 in / 2 out (True/False) | Condition (text) |

Each new node was created in **~15 lines** using `BaseNode`, with no repeated code.

#### Toolbar & UI updates

- `toolbar.js` — nodes grouped into **Core / Logic / Utility** sections with color-coded drag chips
- `ui.js` — all 9 node types registered in the `nodeTypes` map
- `draggableNode.js` — accepts a `color` prop so toolbar chips match their node's header color
