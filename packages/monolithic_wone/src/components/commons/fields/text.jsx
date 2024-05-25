import { useRef } from "react";

import styles from "./field.module.scss";

const TextField = ({ onChange, inputProps, className, ...rest }) => {
  const inputRef = useRef(null);

  const handleChange = (event) => {
    if (onChange && typeof onChange === "function") onChange(event);
  };

  return (
    <div
      className={className ? `${className} ${styles.field} ` : styles.field}
      {...rest}
    >
      <input
        ref={inputRef}
        type="text"
        onChange={handleChange}
        {...inputProps}
      />
    </div>
  );
};

export default TextField;
