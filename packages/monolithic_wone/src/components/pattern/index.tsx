import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { getRandomQuote } from "./quotes";

export type PatternProps = {
  Pattern_PlaceHolder: string;
};

export const Pattern: React.FC<PatternProps> = ({ Pattern_PlaceHolder }) => {
  const [quote, setQuote] = useState(getRandomQuote());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuote(getRandomQuote());
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles["pattern-container"]}>
      <img
        src={Pattern_PlaceHolder}
        alt="WONE Pattern Place Holder"
        className={styles["pattern-placeHolder"]}
      />
      <div className={styles["quotes-container"]}>
        <h1 className={`${styles["patternText"]}`}>"{quote.content}"</h1>
        <h6>{quote.author}</h6>
      </div>
    </div>
  );
};
