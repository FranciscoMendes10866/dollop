import { useState } from "react";
import { css } from "../../../../styled-system/css";

type Props = {
  defaultValue?: string;
  onBlur?: () => void;
  onKeyDown?: (value: string) => void;
};

export default function TextField({ defaultValue, onBlur, onKeyDown }: Props) {
  const [value, setValue] = useState<string>(defaultValue || "");

  return (
    <input
      className={styles.element}
      value={value}
      onChange={(evt) => setValue(evt.target.value)}
      autoFocus
      onBlur={(evt) => {
        evt.stopPropagation();
        onBlur?.();
      }}
      onKeyDown={(evt) => {
        evt.stopPropagation();
        if (evt.key !== "Enter") return;
        onKeyDown?.(value);
      }}
    />
  );
}

const styles = {
  element: css({
    backgroundColor: "#020617",
    borderWidth: 1,
    borderRadius: "0.25rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
  }),
};
