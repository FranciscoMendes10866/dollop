import { useCallback, useMemo } from "react";
import { Trash } from "lucide-react";
import { css } from "../../../styled-system/css";

import TextField from "./components/TextField";

import { useColumnsStore, useTasksStore } from "../../store";
import { useToggle } from "../../hooks/useToggle";

type Props = {
  columnId: string;
  heading: string;
};

export default function ColumnContent({ columnId, heading }: Props) {
  const { tasks, removeTasks } = useTasksStore();
  const { updateColumn, removeColumn } = useColumnsStore();

  const [isEdit, toggleEdit] = useToggle(false);

  const columnTasks = useMemo(
    () => tasks.filter((task) => task.columnId === columnId),
    [columnId, tasks]
  );

  const onTextChange = useCallback(
    (value: string) => {
      updateColumn(columnId, value);
      toggleEdit();
    },
    [columnId]
  );

  return (
    <div
      className={styles.rootWrapper}
      onClick={(evt) => {
        evt.stopPropagation();
        toggleEdit();
      }}
    >
      <div className={styles.meta}>
        <div className={styles.counter}>{columnTasks.length}</div>
        {isEdit ? (
          <TextField
            defaultValue={heading}
            onBlur={toggleEdit}
            onKeyDown={onTextChange}
          />
        ) : (
          <p>{heading}</p>
        )}
      </div>
      <button
        className={styles.deleteAction}
        onClick={(evt) => {
          evt.stopPropagation();
          removeColumn(columnId);
          removeTasks(columnTasks.map((task) => task.id));
        }}
      >
        <Trash color="#94a3b8" height={20} width={20} />
      </button>
    </div>
  );
}

const styles = {
  rootWrapper: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "full",
  }),
  meta: css({
    display: "flex",
    alignItems: "center",
  }),
  counter: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    fontSize: "0.875rem",
    borderRadius: 9999,
  }),
  deleteAction: css({
    cursor: "pointer",
  }),
};
