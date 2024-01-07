import { Fragment, useMemo } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { css } from "../../../styled-system/css";

import Task from "./components/Task";

import { useTasksStore } from "../../store";

type Props = {
  columnId: string;
};

export default function ColumnBody({ columnId }: Props) {
  const { tasks, addTask } = useTasksStore();
  const [parent] = useAutoAnimate();

  const { tasksByColumn, items } = useMemo(() => {
    const tasksByColumn = tasks.filter((task) => task.columnId === columnId);
    return {
      tasksByColumn,
      items: tasksByColumn.map((task) => task.id),
    };
  }, [columnId, tasks]);

  return (
    <Fragment>
      <div className={styles.rootWrapper} ref={parent}>
        <SortableContext items={items}>
          {tasksByColumn.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
      <button
        className={styles.addTaskAction}
        onClick={(evt) => {
          evt.stopPropagation();
          addTask(columnId);
        }}
      >
        Add task
      </button>
    </Fragment>
  );
}

const styles = {
  rootWrapper: css({
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    gap: "1rem",
    padding: "0.5rem",
    overflowX: "hidden",
    overflowY: "auto",
  }),
  addTaskAction: css({
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    padding: "1rem",
    cursor: "pointer",
    borderColor: "#64748b",
    borderWidth: 2,
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "none",
    borderBottomRadius: "0.375rem",
    _hover: {
      backgroundColor: "#0f172a",
    },
  }),
};
