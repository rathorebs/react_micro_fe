import { useRef } from "react";

import styles from "./field.module.scss";

const TextAreaField = ({ onChange, textareaProps, ...rest }) => {
  const inputRef = useRef(null);

  const handleChange = (event) => {
    if (onChange && typeof onChange === "function") onChange(event);
  };

  return (
    <div className={styles.field} {...rest}>
      <textarea
        style={{ width: "100%" }}
        ref={inputRef}
        type="text"
        onChange={handleChange}
        {...textareaProps}
      />
    </div>
  );
};

export default TextAreaField;
