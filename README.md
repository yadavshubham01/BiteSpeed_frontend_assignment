# 🤖 Chatbot Flow Builder

A simple yet extensible chatbot flow builder built with **React**, **React Flow**, and **Tailwind CSS**. It allows users to visually create chatbot message flows by connecting text message nodes.


---

## 🚀 Features

- 🧩 **Drag-and-drop nodes** to build conversation flows
- 🔗 **Connect nodes** using edges
- ⚙️ **Settings panel** for editing message content
- 💾 **Save flow** with validation
- ⚠️ **Error handling** for disconnected flows
- 🎨 Clean and responsive **UI with Tailwind CSS**
- ♻️ Extensible architecture to add new node types

---

## 📦 Tech Stack

- [React](https://reactjs.org/)
- [React Flow](https://reactflow.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

---

## 🖼️ Project Structure

```bash

chatbot-flow-builder/
├── components/
│   ├── AddNode.tsx       # Custom node UI
│   ├── Sidebar.tsx             # Node type panel
│   ├── Navbar.tsx              # Save button + header
│   └── UpdateNode.tsx          # Node settings panel
├── App.tsx                     # Main application logic
├── index.css                   # Tailwind + custom styles
├── main.tsx                    # Entry point
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS plugins
└── README.md                   # Project documentation

````

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yadavshubham01/BiteSpeed_frontend_assignment.git
cd BiteSpeed_frontend_assignment
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

---

## 💡 Save Flow Validation

* ✅ If **all nodes are connected** properly, a success toast appears.
* ❌ If **multiple nodes have no incoming connections**, an error is shown.

---

## 🛠️ Customization

* You can easily add new node types in `Sidebar.tsx` and render them by extending the `nodeTypes` in `App.tsx`.
* The current implementation supports `Text Node`, but it's structured to allow future expansion.



## 📋 License

MIT © [Shubham Yadav](https://github.com/yadavshubham01)

