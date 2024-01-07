import { css } from "../styled-system/css";

import KanbanBoard from "./components/KanbanBoard";

import { useColumnsStore } from "./store";

export default function App() {
  const { addColumn } = useColumnsStore();

  return (
    <div className={styles.rootWrapper}>
      <button
        className={styles.addColumnAction}
        onClick={(evt) => {
          evt.stopPropagation();
          addColumn();
        }}
      >
        Add Column
      </button>
      <KanbanBoard />
    </div>
  );
}

const styles = {
  rootWrapper: css({
    margin: "auto",
    minHeight: "screen",
    width: "full",
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    paddingRight: 40,
    paddingLeft: 40,
    overflowX: "auto",
    overflowY: "hidden",
    backgroundColor: "#1e293b",
    color: "#f8fafc",
  }),
  addColumnAction: css({
    position: "absolute",
    top: 40,
    left: 40,
    height: 50,
    width: 150,
    minWidth: 150,
    cursor: "pointer",
    borderRadius: "0.5rem",
    backgroundColor: "#0f172a",
  }),
};
