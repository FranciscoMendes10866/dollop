import { useState } from "react";
import { css } from "../../../../../../styled-system/css";

interface Props {
  defaultContent: string;
  onBlur?: () => void;
  onKeyDown?: (value: string) => void;
}

export default function TaskFallback({
  defaultContent,
  onBlur,
  onKeyDown,
}: Props) {
  const [value, setValue] = useState<string>(defaultContent || "");

  return (
    <div className={styles.rootWrapper}>
      <textarea
        className={styles.textareaField}
        value={value}
        autoFocus
        onChange={(evt) => setValue(evt.target.value)}
        onBlur={onBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            onKeyDown?.(value);
          }
        }}
      />
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
  textareaField: css({
    height: "90%",
    width: "full",
    resize: "none",
    border: "none",
    borderRadius: "0.25rem",
    backgroundColor: "transparent",
    color: "white",
    _focus: {
      outline: "none",
    },
  }),
};
