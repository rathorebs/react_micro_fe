import { useState, useEffect, useRef } from "react";
import { Base64 } from "js-base64";
import styles from "./field.module.scss";

const RememberMe = () => {
  const inputRef = useRef(null);

  const [isRememberMe, setRememberMe] = useState(false);

  const handleChange = () => {
    setRememberMe(!isRememberMe);
  };

  useEffect(() => {
    const remberMeEncoded = localStorage.getItem("RememberMe");
    if (!!remberMeEncoded) {
      const _obj = JSON.parse(Base64.decode(remberMeEncoded));
      document.getElementsByName("email")[0].value = _obj.username;
      setRememberMe(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="form-check w-100 mt-4 d-flex align-items-center">
      <input
        style={{ width: 19, height: 19 }}
        checked={isRememberMe}
        onChange={handleChange}
        type="checkbox"
        className="form-check-input"
        name="remeberme"
        id="remeberme"
        ref={inputRef}
      />
      <label
        className={`${styles["form-check-label"]} form-check-label pl-2`}
        htmlFor="remeberme"
      >
        Remember me
      </label>
    </div>
  );
};

export default RememberMe;
