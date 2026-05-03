import { useState } from "react";
import type { Card, Priority } from "../type";

export function useFilter(tasks:Card[]) {
  const [search, setSearch]         = useState("");
  const [priorityFilter, setPriority] = useState<Priority|string>('all');
 
  const filtered = tasks.filter(t => {
    const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
    const q = search.toLowerCase();
    const matchesSearch = !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    return matchesPriority && matchesSearch; // intersection logic
  });
 
  return { search, setSearch, priorityFilter, setPriority, filtered };
}