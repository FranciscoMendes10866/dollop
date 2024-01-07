import { createPortal } from "react-dom";
import { useShallow } from "zustand/react/shallow";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DragOverlay } from "@dnd-kit/core";
import { css } from "../../styled-system/css";

import DragAndDrop from "./DragAndDrop";
import Column from "./Column";
import Task from "./Column/components/Task";

import { useColumnsStore, useTasksStore } from "../store";

export default function KanbanBoard() {
  const [parent] = useAutoAnimate();
  const [columns, selectedColumn] = useColumnsStore(
    useShallow((state) => [state.columns, state.selectedColumn])
  );
  const [selectedTask] = useTasksStore(
    useShallow((state) => [state.selectedTask])
  );

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
      {createPortal(
        <DragOverlay>
          {selectedColumn ? (
            <Column.Wrapper
              key={selectedColumn.id}
              column={selectedColumn}
              header={
                <Column.Header
                  columnId={selectedColumn.id}
                  heading={selectedColumn.heading}
                />
              }
              body={<Column.Body columnId={selectedColumn.id} />}
            />
          ) : selectedTask ? (
            <Task task={selectedTask} />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DragAndDrop>
  );
}

const styles = {
  contentWrapper: css({
    gap: "1rem",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    color: "white",
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
