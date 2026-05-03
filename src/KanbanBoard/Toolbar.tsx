import { PRIORITIES, PRIORITY_META } from "../predicate";
import type { Card, Priority } from "../type";
import { style } from "./style";
interface ToolBarProps{
    search:string
    onChangeSearch:(value:string)=>void
    priorityFilter:Priority|string
    onChangePriority:(value:string |Priority)=>void
    filteredLength: number
    cardLength: number
}
export function ToolBar(props:ToolBarProps){
     
    const {search, onChangeSearch,priorityFilter,onChangePriority, filteredLength,cardLength}=props
    const hasActiveFilters = priorityFilter !== "all" || search !== "";
    return  <div style={style.toolbar}>
        <div style={style.searchWrap}>
          <span style={style.searchIcon}>🔍</span>
          <input
            style={style.searchInput}
            placeholder="Search by title or description…"
            value={search}
            onChange={e => onChangeSearch(e.target.value)}
          />
          {search && (
            <button style={style.clearBtn} onClick={() => onChangeSearch("")}>✕</button>
          )}
        </div>
 
        <div style={style.filterChips}>
          {["all", ...PRIORITIES].map(p => (
            <button
              key={p}
              style={{
                ...style.chip,
                ...(priorityFilter === p ? {
                  background: p === "all" ? "#6366f1" : PRIORITY_META[p as Priority]?.background ?? "#6366f1",
                  color: "#fff",
                  borderColor: "transparent",
                } : {}),
              }}
              onClick={() => onChangePriority(p)}
            >
              {p}
            </button>
          ))}
        </div>
 
        {hasActiveFilters && (
          <span style={style.activeFiltersTag}>
            Filters active — showing {filteredLength} of {cardLength}
          </span>
        )}
      </div>
}