import type { FormErrors, FormValues } from "../type";

export function generateId(): string {
  return "card-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
}
 
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
 
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
 
export function validate(form: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!form.title.trim())           errors.title    = "Title is required.";
  else if (form.title.length > 120) errors.title    = "Title must be under 120 characters.";
  if (!form.priority)               errors.priority = "Priority is required.";
  if (!form.assignee)               errors.assignee = "Assignee is required.";
  return errors;
}
 