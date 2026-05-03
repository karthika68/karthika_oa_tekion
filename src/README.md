# Kanban Board — Machine Coding Submission

## How to Run

```bash
npm create vite@latest kanban -- --template react
cd kanban
npm install
# Replace src/App.jsx content with KanbanBoard.jsx
# Replace src/main.jsx to render <App />
npm run dev
```

No additional dependencies required. Uses only React (hooks) + localStorage.

---

## Framework / Library Choices

| Choice | Reasoning |
|---|---|
| **React** | Component model maps naturally to Board → Column → Card hierarchy |
| ** State transitions are explicit and testable — avoids scattered `setState` |
| **Native HTML5 Drag and Drop API** | Zero dependency; sufficient for column and within-column reordering |
| **localStorage** | Meets persistence requirement; abstracted behind `StorageAdapter` so it can be swapped |
| No CSS-in-JS library | Inline style objects keep the file self-contained for assessment submission |

---

## Component Architecture

```
KanbanBoard              ← Root: owns all state, filter, modal logic
├── Header               ← (inline) Title + "New Task" button
├── Toolbar              ← Search input + priority filter chips
├── Board
│   └── Column ×3        ← One per column; handles drag-over / drop
│       └── TaskCard ×n  ← Draggable; expand/collapse; edit/delete buttons
└── Modal (conditional)
    ├── TaskForm          ← Create or Edit; full validation
    └── ConfirmDialog     ← Delete confirmation
```

---

## Architecture
- Component-based separation
- Centralized state in KanbanBoard
- Storage abstraction via adapter

## Trade-offs
- Used flat state for simplicity
- Drag-drop reorder can be extended with index tracking

## State Management Approach
used local state for simple usecases
Persistence is a separate `useEffect` that watches `tasks` and calls `StorageAdapter.save`. Swapping to IndexedDB or an API requires changing only `StorageAdapter`.

Filter state (`search`, `priorityFilter`) lives in a separate `useFilter` hook and derives `filtered` via `Array.filter` with **intersection logic** (both conditions must pass).

---

## Assumptions Made

1. Column configuration is data-driven (`COLUMNS` array) — adding a new column requires only a new entry there.
2. Assignees are a static list; in production this would come from an API.
3. `order` is a numeric field on each task; ties are broken by insertion order.
4. Drag-and-drop drops at the target card's position (before it) or at the end of an empty column.
5. "Expand" on a card toggles between 2-line clamp and full content.

---

## Known Limitations

1. Drag-and-drop does not show a live ghost preview of insertion point.
2. No keyboard-accessible drag-and-drop (would require `react-beautiful-dnd` or custom ARIA).
3. `order` values can diverge over many operations; a normalize pass would be needed for production.
4. No optimistic updates / conflict resolution for multi-user scenarios.
5. Inline styles limit responsive breakpoints — a CSS module or Tailwind approach would be cleaner at scale.

---

## Unit Tests (Vitest)

Core logic to test:

```js
// validation.test.js
import { validateTask } from "./KanbanBoard";
test("rejects empty title", () => expect(validateTask({ title: "" }).title).toBeTruthy());
test("rejects short title", () => expect(validateTask({ title: "ab" }).title).toBeTruthy());
test("passes valid task", () => expect(Object.keys(validateTask({ title: "Fix bug", description: "Details", assignee: "Alice" })).length).toBe(0));



// filter.test.js
test("search filters by title substring (case-insensitive)", () => { ... });
test("priority filter intersects with search", () => { ... });
test("All priority returns all tasks", () => { ... });
```
