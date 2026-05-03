export type Priority = "urgent" | "high" | "medium" | "low";
export type ColumnId = "todo" | "inprogress" | "review" | "done";
export type ModalMode = "create" | "edit";
 
export interface Card {
  id: string;
  col: ColumnId;
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
  createdAt: string; // ISO string — set internally on create, never editable
}
 
export interface Column {
  id: ColumnId;
  label: string;
  color: string;
}
 
export interface PriorityMeta {
  label: string;
  background: string;
  color: string;
}
 
export interface FormValues {
  title: string;
  description: string;
  priority: Priority | "";
  assignee: string;
}
 
export interface FormErrors {
  title?: string;
  priority?: string;
  assignee?: string;
}
 
export type ModalState =
  | { mode: "create" }
  | { mode: "edit"; card: Card }
  | null;
 