import type { Card, Column, FormValues, Priority, PriorityMeta } from "./type";

export const STORAGE_KEY = "kanban_board_state";
export const COLUMNS: Column[] = [
  { id: "todo",        label: "Todo",        color: "#888780" },
  { id: "inprogress",  label: "In Progress", color: "#185FA5" },
  { id: "review",      label: "Review",      color: "#BA7517" },
  { id: "done",        label: "Done",        color: "#3B6D11" },
];
 
 
export const PRIORITIES: Priority[] = ["urgent", "high", "medium", "low"];
 
export const PRIORITY_META: Record<Priority, PriorityMeta> = {
  urgent: { label: "Urgent", background: "#FCEBEB", color: "#A32D2D" },
  high:   { label: "High",   background: "#FAEEDA", color: "#854F0B" },
  medium: { label: "Medium", background: "#E6F1FB", color: "#0C447C" },
  low:    { label: "Low",    background: "#EAF3DE", color: "#3B6D11" },
};

export const ASSIGNEES: string[] = [
  "Karthika R",
  "Arjun M",
  "Priya S",
  "Rahul D",
  "Sneha K",
  "Vikram N",
];
 
export const EMPTY_FORM: FormValues = {
  title: "",
  description: "",
  priority: "",
  assignee: "",
};

export const INITIAL_CARDS: Card[] = [
  { id: "c1", col: "todo",       title: "Set up Vite config",                                            description: "Configure vite with path aliases and env setup.",            priority: "medium", assignee: "Karthika R", createdAt: "2025-04-10T09:00:00Z" },
  { id: "c2", col: "todo",       title: "Design token system",                                           description: "Define spacing, color and typography tokens.",                priority: "low",    assignee: "Priya S",    createdAt: "2025-04-11T10:30:00Z" },
  { id: "c3", col: "todo",       title: "API error boundaries",                                          description: "Add React error boundaries around all async data zones.",     priority: "medium", assignee: "Vikram N",   createdAt: "2025-04-12T07:00:00Z" },
  { id: "c4", col: "inprogress", title: "Kanban DnD — native implementation with full keyboard support", description: "Implement drag and drop using native HTML5 DnD API.",         priority: "high",   assignee: "Karthika R", createdAt: "2025-04-12T08:00:00Z" },
  { id: "c5", col: "inprogress", title: "Fix race condition in cache",                                   description: "React Query cache invalidation fires on concurrent edits.",   priority: "urgent", assignee: "Arjun M",    createdAt: "2025-04-13T11:00:00Z" },
  { id: "c6", col: "review",     title: "Segment / Territory refactor",                                  description: "Refactor segment logic into a config-driven approach.",       priority: "high",   assignee: "Rahul D",    createdAt: "2025-04-14T09:30:00Z" },
  { id: "c7", col: "review",     title: "Storybook setup for FormField",                                 description: "Add stories covering all FormField variants and states.",     priority: "low",    assignee: "Sneha K",    createdAt: "2025-04-15T10:00:00Z" },
  { id: "c8", col: "done",       title: "Setup dependency-cruiser",                                      description: "Enforce module boundaries via dependency-cruiser rules.",     priority: "low",    assignee: "Sneha K",    createdAt: "2025-04-09T14:00:00Z" },
];
 