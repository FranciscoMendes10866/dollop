import type { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "../../../styled-system/css";

import { DND_TYPE } from "../../constants";
import { type Column } from "../../store";

type Props = {
  column: Column;
  header: ReactNode;
  body: ReactNode;
};

export default function ColumnWrapper({ column, header, body }: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: DND_TYPE.COLUMN,
      column,
    },
  });

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

  return (
    <div
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Transform.toString(transform),
      }}
      className={css(styles.rootWrapper)}
    >
      <div {...attributes} {...listeners} className={styles.contentWrapper}>
        {header}
      </div>
      {body}
    </div>
  );
}

const styles = {
  rootWrapper: css.raw({
    width: 350,
    height: 500,
    maxHeight: 500,
    borderRadius: "0.375rem",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#334155",
    color: "white",
  }),
  contentWrapper: css({
    fontSize: "1rem",
    height: 50,
    cursor: "grab",
    borderRadius: "0.375rem",
    padding: "0.75rem",
    fontWeight: "bold",
    borderWidth: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#64748b",
  }),
  placeholder: css.raw({
    borderWidth: 2,
    borderColor: "#475569",
    opacity: "60%"
  }),
};
