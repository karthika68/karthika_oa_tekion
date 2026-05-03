import { useEffect, useRef, useState, type DragEvent } from "react";
import { COLUMNS, EMPTY_FORM, INITIAL_CARDS, STORAGE_KEY } from "../predicate";
import type { Card, ColumnId, FormErrors, FormValues, ModalState, Priority } from "../type";
import { validate, generateId } from "./helper";
import { style } from "./style";
import { TaskModal } from "./KanbanForm/TaskModal";
import { CardPreview } from "./CardPreview";
import { StorageAdapter } from "../PressistanceLayer/presistance";
import { useFilter } from "./useFilter";
import { ToolBar } from "./Toolbar";

export default function KanbanBoard() {
  const [cards, setCards]               = useState<Card[]>([]);
  const [dragOverCol, setDragOverCol]   = useState<ColumnId | null>(null);
  const [modal, setModal]               = useState<ModalState>(null);
  const [form, setForm]                 = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors]             = useState<FormErrors>({});
  const dragCardId                      = useRef<string | null>(null);
   const { search, setSearch, priorityFilter, setPriority, filtered } = useFilter(cards);
  const dragOverCardId = useRef<string | null>(null);

    useEffect(() => {
    const saved = StorageAdapter.load(STORAGE_KEY);
    setCards(saved?.length ? saved : INITIAL_CARDS);
  }, [INITIAL_CARDS]);
   useEffect(() => {
    if (cards.length > 0) StorageAdapter.save(STORAGE_KEY, cards);
  }, [cards]);
 
  // ── Modal actions ───────────────────────────────────────────────────────
 
  function openCreate(): void {
    setForm(EMPTY_FORM);
    setErrors({});
    setModal({ mode: "create" });
  }
 
  function openEdit(card: Card): void {
    setForm({
      title:       card.title,
      description: card.description,
      priority:    card.priority,
      assignee:    card.assignee,
    });
    setErrors({});
    setModal({ mode: "edit", card });
  }
 
  function closeModal(): void {
    setModal(null);
    setErrors({});
  }
 
  function handleFieldChange<K extends keyof FormValues>(field: K, value: FormValues[K]): void {
    setForm((prev) => ({ ...prev, [field]: value }));
    // clear the error for this field as soon as user starts fixing it
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }
 
  function handleSubmit(): void {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
 
    if (modal?.mode === "create") {
      const newCard: Card = {
        id:          generateId(),
        col:         "todo",                 // new tasks always land in Todo
        title:       form.title.trim(),
        description: form.description.trim(),
        priority:    form.priority as Priority,
        assignee:    form.assignee,
        createdAt:   new Date().toISOString(), // set internally — not user input
      };
      setCards((prev) => [...prev, newCard]);
    } else if (modal?.mode === "edit") {
      setCards((prev) =>
        prev.map((c) =>
          c.id === modal.card.id
            ? {
                ...c,
                title:       form.title.trim(),
                description: form.description.trim(),
                priority:    form.priority as Priority,
                assignee:    form.assignee,
                // createdAt is immutable — never overwritten on edit
              }
            : c
        )
      );
    }
    closeModal();
  }
 
  function handleDelete(cardId: string): void {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
    closeModal();
  }
 
  // ── DnD handlers ─────────────────────────────────────────────────────────
 
  function handleDragStart(e: DragEvent<HTMLDivElement>, cardId: string): void {
    dragCardId.current = cardId;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", cardId); // Firefox requires at least one setData call
  }
 
  function handleDragEnd(): void {
    dragCardId.current = null;
    setDragOverCol(null);
  }
 
  function handleDragOver(e: DragEvent<HTMLDivElement>, colId: ColumnId): void {
    e.preventDefault(); // mandatory — without this the browser rejects the drop
    e.dataTransfer.dropEffect = "move";
    setDragOverCol(colId);
  }
 
  function handleDragLeave(e: DragEvent<HTMLDivElement>): void {
    // dragleave fires when cursor moves over a child element too.
    // relatedTarget is where the cursor moved TO — if it's still inside
    // the column, we don't want to clear the highlight.
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverCol(null);
    }
  }
 
 function handleDrop(e: DragEvent<HTMLDivElement>, targetColId: ColumnId): void {
  e.preventDefault();

  const draggedId = e.dataTransfer.getData("text/plain");
  const overId = dragOverCardId.current;

  setCards((prev) => {
    const draggedCard = prev.find(c => c.id === draggedId);
    if (!draggedCard) return prev;

    // remove dragged card
    const remaining = prev.filter(c => c.id !== draggedId);

    // cards in target column
    const targetCards = remaining.filter(c => c.col === targetColId);

    let insertIndex = targetCards.length;

    if (overId) {
      const overIndex = targetCards.findIndex(c => c.id === overId);
      if (overIndex !== -1) insertIndex = overIndex;
    }

    const updatedCard = { ...draggedCard, col: targetColId };

    const before = targetCards.slice(0, insertIndex);
    const after  = targetCards.slice(insertIndex);

    const newTargetCards = [...before, updatedCard, ...after];

    // rebuild full list
    const otherCards = remaining.filter(c => c.col !== targetColId);

    return [...otherCards, ...newTargetCards];
  });

  dragCardId.current = null;
  dragOverCardId.current = null;
  setDragOverCol(null);
}
 
  // ── Render ────────────────────────────────────────────────────────────────
  function handleSearch(value:string){
    setSearch(value)
  }
  return (
    <div style={style.root}>
      {/* Top bar */}
      <div style={style.topBar}>
        <span style={style.boardTitle}>Board</span>
        <button style={style.newTaskBtn} onClick={openCreate}>
          + New Task
        </button>
      </div>
      <ToolBar search={search} onChangeSearch={handleSearch}  priorityFilter={priorityFilter} onChangePriority={(value)=>setPriority(value)} filteredLength={filtered.length} cardLength={cards.length}  />
      {/* Board */}
      <div style={style.board}>
        {COLUMNS.map((col) => {
          const colCards = filtered.filter((c) => c.col === col.id);
          const isOver   = dragOverCol === col.id;
 
          return (
            <div
              key={col.id}
              style={{ ...style.column, ...(isOver ? style.columnOver : {}) }}
              onDragOver={(e) => {

  e.preventDefault();

  dragOverCardId.current = col.id;

}}
              onDragLeave={handleDragLeave}
              onDrop={(e)      => handleDrop(e, col.id)}
            >
              {/* Column header */}
              <div style={style.colHeader}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ ...style.dot, background: col.color }} />
                  <span style={style.colTitle}>{col.label}</span>
                </div>
                <span style={style.colCount}>{colCards.length}</span>
              </div>
 
              {/* Cards */}
              <div style={style.cardsArea}>
                {colCards.length === 0 && (
                  <p style={style.emptyHint}>No tasks</p>
                )}
                {colCards.map((card) => (
                  <CardPreview
                    key={card.id}
                    card={card}
                    isDragging={dragCardId.current === card.id}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onClick={() => openEdit(card)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
 
      {/* Modal */}
      {modal && (
        <TaskModal
          modal={modal}
          form={form}
          errors={errors}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onClose={closeModal}
        />
      )}
    </div>
  );
}