import type { DragEvent } from "react";
import type { Card } from "../type";
import { PRIORITY_META } from "../predicate";
import { formatDate, getInitials } from "./helper";
import { style } from "./style";

interface CardPreviewProps {
  card: Card;
  isDragging: boolean;
  onDragStart: (e: DragEvent<HTMLDivElement>, cardId: string) => void;
  onDragEnd: () => void;
  onClick: () => void;
}
 
export function CardPreview({ card, isDragging, onDragStart, onDragEnd, onClick }: CardPreviewProps) {
  const priorityData = PRIORITY_META[card.priority];
 
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{ ...style.card, ...(isDragging ? style.cardDragging : {}) }}
    >
      {/* Priority tag — driven by priority value */}
      <span style={{ ...style.tag, background: priorityData.background, color: priorityData.color }}>
        {priorityData.label}
      </span>
 
      {/* Title — clamped to 2 lines, full text in tooltip + modal */}
      <p style={style.cardTitle} title={card.title}>
        {card.title}
      </p>
 
      {/* Footer: assignee + timestamp */}
      <div style={style.cardFooter}>
        <span style={style.avatar}>{getInitials(card.assignee)}</span>
        <span style={style.assigneeLabel}>{card?.assignee?.split?.(" ")?.[0]}</span>
        <span style={style.cardTimestamp}>{formatDate(card.createdAt)}</span>
      </div>
    </div>
  );
}
 