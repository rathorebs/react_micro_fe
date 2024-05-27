import React from "react";
import styles from "./styles.module.scss";

interface TileProps {
  children: any;
}

const Tile = ({ children }: TileProps) => {
  return <div className={styles["wone-goal-tile"]}>{children}</div>;
};
export default Tile;
