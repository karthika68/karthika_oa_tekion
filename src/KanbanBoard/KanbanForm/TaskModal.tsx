import { FormField } from "./FormField";
import { formatDate } from "../helper";
import { PRIORITY_META, PRIORITIES, ASSIGNEES } from "../../predicate";
import { style } from "../style";
import type { ModalState, FormValues, FormErrors, Priority } from "../../type";

interface TaskModalProps {
  modal: Exclude<ModalState, null>;
  form: FormValues;
  errors: FormErrors;
  onChange: <K extends keyof FormValues>(field: K, value: FormValues[K]) => void;
  onSubmit: () => void;
  onDelete: (cardId: string) => void;
  onClose: () => void;
}
 
export function TaskModal({ modal, form, errors, onChange, onSubmit, onDelete, onClose }: TaskModalProps) {
  const isEdit  = modal.mode === "edit";
  const card    = isEdit ? modal.card : null;
  const pm      = card ? PRIORITY_META[card.priority] : null;
 
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>): void {
    if (e.target === e.currentTarget) onClose();
  }
 
  return (
    <div style={style.overlay} onMouseDown={handleOverlayClick}>
      <div style={style.modal} role="dialog" aria-modal="true" aria-label={isEdit ? "Edit task" : "New task"}>
 
        {/* Header */}
        <div style={style.modalHeader}>
          <span style={style.modalTitle}>{isEdit ? "Task details" : "New task"}</span>
          <button style={style.closeBtn} onClick={onClose} aria-label="Close modal">✕</button>
        </div>
 
        {/* Read-only meta strip — edit mode only */}
        {isEdit && card && pm && (
          <div style={style.metaRow}>
            <span style={{ ...style.tag, background: pm.background, color: pm.color }}>
              {pm.label}
            </span>
            <span style={style.metaTimestamp}>Created {formatDate(card.createdAt)}</span>
          </div>
        )}
 
        {/* Form */}
        <div style={style.formBody}>
 
          {/* Title */}
          <FormField label="Title" required error={errors.title}>
            <input
              style={{ ...style.input, ...(errors.title ? style.inputError : {}) }}
              placeholder="e.g. Implement drag and drop"
              value={form.title}
              maxLength={120}
              autoFocus
              onChange={(e) => onChange("title", e.target.value)}
            />
            <span style={style.charCount}>{form.title.length} / 120</span>
          </FormField>
 
          {/* Description — optional */}
          <FormField label="Description">
            <textarea
              style={style.textarea}
              placeholder="What needs to be done?"
              value={form.description}
              rows={3}
              onChange={(e) => onChange("description", e.target.value)}
            />
          </FormField>
 
          {/* Priority + Assignee — side by side */}
          <div style={style.row2}>
            <FormField label="Priority" required error={errors.priority}>
              <select
                style={{ ...style.input, ...(errors.priority ? style.inputError : {}) }}
                value={form.priority}
                onChange={(e) => onChange("priority", e.target.value as Priority)}
              >
                <option value="">Select priority</option>
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{PRIORITY_META[p].label}</option>
                ))}
              </select>
            </FormField>
 
            <FormField label="Assignee" required error={errors.assignee}>
              <select
                style={{ ...style.input, ...(errors.assignee ? style.inputError : {}) }}
                value={form.assignee}
                onChange={(e) => onChange("assignee", e.target.value)}
              >
                <option value="">Select assignee</option>
                {ASSIGNEES.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </FormField>
          </div>
 
          {/* Created at — read-only, shown only in edit */}
          {isEdit && card && (
            <FormField label="Created at">
              <input
                style={{ ...style.input, color: "#aaa", cursor: "default" }}
                value={formatDate(card.createdAt)}
                readOnly
              />
            </FormField>
          )}
 
        </div>
 
        {/* Footer */}
        <div style={style.modalFooter}>
          {isEdit && card && (
            <button style={style.deleteBtn} onClick={() => onDelete(card.id)}>
              Delete task
            </button>
          )}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button style={style.cancelBtn} onClick={onClose}>Cancel</button>
            <button style={style.submitBtn} onClick={onSubmit}>
              {isEdit ? "Save changes" : "Create task"}
            </button>
          </div>
        </div>
 
      </div>
    </div>
  );
}