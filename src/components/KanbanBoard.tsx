import { useShallow } from "zustand/react/shallow";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { css } from "../../styled-system/css";

import DragAndDrop from "./DragAndDrop";
import Column from "./Column";

import { useColumnsStore } from "../store";

export default function KanbanBoard() {
  const columns = useColumnsStore(useShallow((state) => state.columns));
  const [parent] = useAutoAnimate();

  return (
    <DragAndDrop>
      <div className={styles.contentWrapper} ref={parent}>
        {columns.map((column) => (
          <Column.Wrapper
            key={column.id}
            column={column}
            header={
              <Column.Header columnId={column.id} heading={column.heading} />
            }
            body={<Column.Body columnId={column.id} />}
          />
        ))}
      </div>
    </DragAndDrop>
  );
}

const styles = {
  contentWrapper: css({
    gap: "1rem",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
  }),
  addColumnAction: css({
    height: 60,
    width: 350,
    minWidth: 350,
    cursor: "pointer",
    padding: "1rem",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    borderWidth: 2,
    backgroundColor: "#0f172a",
    color: "#f8fafc",
  }),
};
