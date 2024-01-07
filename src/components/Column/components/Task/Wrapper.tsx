import type { PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "../../../../../styled-system/css";

import { type Task } from "../../../../store";
import { DND_TYPE } from "../../../../constants";

type Props = {
  task: Task;
};

export default function TaskWrapper({
  task,
  children,
}: PropsWithChildren<Props>) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        type: DND_TYPE.TASK,
        task,
      },
    });

  return (
    <div
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Transform.toString(transform),
      }}
      {...attributes}
      {...listeners}
      className={styles.rootWrapper}
    >
      {children}
    </div>
  );
}

const styles = {
  rootWrapper: css({
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
};
