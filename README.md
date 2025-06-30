

## DAG Pipeline Builder

An interactive web-based **Directed Acyclic Graph (DAG) builder** built using **React Flow**, allowing users to create, connect, and validate a flow of operations visually.

---

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/dag-pipeline-builder.git
cd dag-pipeline-builder

# Install dependencies
npm install

# Start the development server
npm run dev   # or npm start if not using Vite
```

####  Tech Stack

* **React** (UI)
* **React Flow** (graph rendering and interaction)
* **TypeScript** (type safety)
* **Vite** or **Create React App** (build tool – based on your choice)
* **Custom Context Menu, Validators, and JSON Previewer**

---

###  Libraries & Architectural Decisions

| Library                                         | Purpose                               |
| ----------------------------------------------- | ------------------------------------- |
| `reactflow`                                     | Core node-edge rendering engine       |
| `dagre` / `elkjs` *(optional)*                  | Auto-layout for nodes (DAG layouting) |
| `zustand` or `useState`                         | State management                      |
| `react-tooltip`, `classnames` *(optional)*      | Better UX                             |
| `react-icons`, `styled-components` *(optional)* | Enhanced visuals                      |

####  Design Decisions:

* **Custom Node Types**: Each node can define its own input/output structure.
* **Context Menu**: Right-click on nodes/edges to delete them dynamically.
* **DAG Validator**: Ensures no cycles or invalid connections exist.
* **Connection Constraints**: Disallows self-loops and invalid handle-to-handle connects (like out→out or in→in).

---

### 🎥 Demo

#### 🔗 [Live Demo Link](https://dag-pipeline.vercel.app/)



#### 📹 Screen Recording

[vedio Explanation ]https://www.veed.io/view/cb1eadcc-a871-46e7-aa65-620cbcea65f7?panel=share

---

### 🚧 Challenges Faced



#### 3. **Dynamic Node Addition**

* Challenge: Keeping React Flow's node state reactive without performance hits.
* Solution: Leveraged `useCallback`, `React.memo`, and proper use of `setNodes`.

#### 4. **Context Menu Management**

* Challenge: Showing a context menu dynamically at the right position.
* Solution: Captured right-click coordinates and controlled visibility with state.

#### 5. **Edge Rendering Issues**

* Challenge: Dagre Implementation (As license is required for accessing it on React Flow).
* Solution: Took the help of Tutorial and AI tools to understand its implementation.

---

### 📖 References

* [React Flow Documentation](https://reactflow.dev/docs)
* [Graph Theory: Cycle Detection](https://www.geeksforgeeks.org/detect-cycle-in-a-graph/)
* [Dagre.js Layout Engine](https://github.com/dagrejs/dagre)
* [React Context Menus](https://blog.logrocket.com/creating-custom-right-click-menus-react/)

---
