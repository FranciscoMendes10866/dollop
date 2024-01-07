import { useCallback } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "../../../../../styled-system/css";

import TaskFallback from "./components/Fallback";

import { useTasksStore, type Task } from "../../../../store";
import { DND_TYPE } from "../../../../constants";
import { useToggle } from "../../../../hooks/useToggle";

type Props = {
  task: Task;
};

export default function Task({ task }: Props) {
  const { updateTask } = useTasksStore();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: DND_TYPE.TASK,
      task,
    },
  });

  const [isEdit, toggleEdit] = useToggle(false);

  const onTextChange = useCallback(
    (value: string) => {
      updateTask(task.id, value);
      toggleEdit();
    },
    [task.id]
  );

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{
          transition,
          transform: CSS.Transform.toString(transform),
        }}
        className={css(styles.rootWrapper, styles.placeholder)}
      />
    );
  }

  if (isEdit) {
    return (
      <TaskFallback
        defaultContent={task.content}
        onBlur={toggleEdit}
        onKeyDown={onTextChange}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Transform.toString(transform),
      }}
      {...attributes}
      {...listeners}
      className={css(styles.rootWrapper)}
      onClick={(evt) => {
        evt.stopPropagation();
        toggleEdit();
      }}
    >
      <p className={styles.taskContent}>{task.content}</p>
    </div>
  );
}

const styles = {
  rootWrapper: css.raw({
    padding: "0.625rem",
    height: 100,
    minHeight: 100,
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    borderRadius: "0.75rem",
    position: "relative",
    cursor: "grab",
    backgroundColor: "#64748b",
    _hover: {
      backgroundColor: "#94a3b8",
    },
  }),
  placeholder: css.raw({
    borderWidth: 2,
    borderColor: "#94a3b8",
    opacity: "60%",
  }),
  taskContent: css({
    marginX: "auto",
    height: "90%",
    width: "full",
    overflowY: "auto",
    overflowX: "hidden",
    whiteSpace: "pre-wrap",
    color: "white",
  }),
};
