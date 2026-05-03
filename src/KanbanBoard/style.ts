type CSSProperties = React.CSSProperties;
 
export const style: Record<string, CSSProperties> = {
  // Root
  root:           { fontFamily: "system-ui, sans-serif", background: "#f5f5f3", minHeight: "100vh" },
 
  // Top bar
  topBar:         { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "#fff", borderBottom: "0.5px solid #e0dfd8" },
  boardTitle:     { fontSize: 15, fontWeight: 500, color: "#2c2c2a" },
  newTaskBtn:     { padding: "7px 16px", fontSize: 13, fontWeight: 500, background: "#2c2c2a", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" },
 
  // Board
  board:          { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, padding: 16 },
 
  // Column
  column:         { background: "#efefed", borderRadius: 12, padding: 12, display: "flex", flexDirection: "column", gap: 8, border: "1.5px solid transparent", transition: "border-color 0.15s, background 0.15s", minHeight: 520 },
  columnOver:     { background: "#e4e4e1", borderColor: "#aaa", borderStyle: "dashed" },
  colHeader:      { display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 10, borderBottom: "0.5px solid #d3d1c7", marginBottom: 2 },
  dot:            { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  colTitle:       { fontSize: 13, fontWeight: 500, color: "#5f5e5a" },
  colCount:       { fontSize: 11, fontWeight: 500, background: "#d3d1c7", color: "#5f5e5a", padding: "2px 7px", borderRadius: 10 },
  cardsArea:      { flex: 1, display: "flex", flexDirection: "column", gap: 8 },
  emptyHint:      { fontSize: 12, color: "#bbb", textAlign: "center", padding: "24px 0", margin: 0 },
 
  // Card
  card:           { background: "#fff", border: "0.5px solid #e0dfd8", borderRadius: 8, padding: "10px 12px", cursor: "pointer", userSelect: "none", transition: "opacity 0.15s, transform 0.1s" },
  cardDragging:   { opacity: 0.4, transform: "scale(0.97)" },
  tag:            { fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 4, display: "inline-block", marginBottom: 6 },
  cardTitle:      { fontSize: 13, fontWeight: 500, color: "#2c2c2a", margin: "0 0 10px", lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" },
  cardFooter:     { display: "flex", alignItems: "center", gap: 6 },
  avatar:         { width: 20, height: 20, borderRadius: "50%", background: "#d3d1c7", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#5f5e5a", flexShrink: 0 },
  assigneeLabel:  { fontSize: 11, color: "#888780", flex: 1 },
  cardTimestamp:  { fontSize: 10, color: "#ccc" },
 
  // Modal overlay
  overlay:        { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 },
  modal:          { background: "#fff", borderRadius: 14, width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", maxHeight: "90vh", overflow: "hidden" },
  modalHeader:    { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "0.5px solid #e0dfd8", flexShrink: 0 },
  modalTitle:     { fontSize: 15, fontWeight: 500, color: "#2c2c2a" },
  closeBtn:       { background: "none", border: "none", fontSize: 14, color: "#999", cursor: "pointer", padding: "2px 6px", borderRadius: 4 },
  metaRow:        { display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", borderBottom: "0.5px solid #f0efe8", flexShrink: 0 },
  metaTimestamp:  { fontSize: 11, color: "#bbb" },
 
  // Form
  formBody:       { padding: "16px 20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, flex: 1 },
  row2:           { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  field:          { display: "flex", flexDirection: "column", gap: 4 },
  fieldLabel:     { fontSize: 12, fontWeight: 500, color: "#5f5e5a" },
  input:          { padding: "8px 10px", fontSize: 13, border: "0.5px solid #d3d1c7", borderRadius: 7, outline: "none", background: "#fafaf8", color: "#2c2c2a", width: "100%", boxSizing: "border-box" },
  inputError:     { borderColor: "#e24b4a", background: "#fff8f8" },
  textarea:       { padding: "8px 10px", fontSize: 13, border: "0.5px solid #d3d1c7", borderRadius: 7, outline: "none", background: "#fafaf8", color: "#2c2c2a", resize: "vertical", fontFamily: "inherit", width: "100%", boxSizing: "border-box" },
  charCount:      { fontSize: 10, color: "#bbb", textAlign: "right" },
  errorMsg:       { fontSize: 11, color: "#e24b4a" },
 
  // Footer
  modalFooter:    { display: "flex", alignItems: "center", padding: "12px 20px", borderTop: "0.5px solid #e0dfd8", flexShrink: 0, gap: 8 },
  deleteBtn:      { padding: "7px 14px", fontSize: 12, fontWeight: 500, background: "#fff8f8", color: "#A32D2D", border: "0.5px solid #f0c0c0", borderRadius: 7, cursor: "pointer" },
  cancelBtn:      { padding: "7px 14px", fontSize: 12, fontWeight: 500, background: "#f5f5f3", color: "#5f5e5a", border: "0.5px solid #d3d1c7", borderRadius: 7, cursor: "pointer" },
  submitBtn:      { padding: "7px 16px", fontSize: 12, fontWeight: 500, background: "#2c2c2a", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer" },
   toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "16px 32px",
    flexWrap: "wrap",
  },
  searchWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    fontSize: 13,
    pointerEvents: "none",
  },
  searchInput: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 8,
    color: "#e2e8f0",
    fontSize: 13,
    padding: "7px 32px 7px 30px",
    width: 260,
    outline: "none",
  },
};