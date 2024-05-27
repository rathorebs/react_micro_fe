import { createContext, useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import WebGL from "three/examples/jsm/capabilities/WebGL";
import App from "apps/wone-generator/AppStandalone";

import BluePattern from "apps/wone-generator/assets/patterns/blue.json";

import styles from "./styles.module.scss";

const PatternBackgroundContext = createContext(null);

export const PatternBackgroundProvider = ({ children }) => {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  const [colors, setColors] = useState({
    primary: BluePattern.color.pattern.value.primary,
    background: BluePattern.color.pattern.value.background,
  });
  const [overlay, setOverlay] = useState(false);
  const [removeOverlay, setRemoveOverlay] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("transparent");

  const handleChangeColors = (value, overlay, backgroundColor) => {
    setColors(value);
    setOverlay(overlay);

    if (backgroundColor) {
      setBackgroundColor(backgroundColor);
    }
  };

  const handleChangeBackground = (value) => {
    setBackgroundColor(value);
  };

  const handleChangePattern = (woneParams, overlay, backgroundColor) => {
    localStorage.setItem("woneParams", JSON.stringify(woneParams));

    if (appRef.current) {
      appRef.current.controls.init();
    }

    setOverlay(overlay);
    if (backgroundColor) {
      setBackgroundColor(backgroundColor);
    }
  };

  useEffect(() => {
    if (appRef.current) {
      appRef.current.controls.parameters.color.pattern.value = colors;
      appRef.current.renderer.instance.setClearColor(colors.background);
      appRef.current.controls.trigger(`parameter-update-color-pattern`);
      appRef.current.controls.updateLocalStorage();
    }
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Check for WebGL support before rendering
    if (WebGL.isWebGLAvailable()) {
      const woneParams = localStorage.getItem("woneParams");
      if (!woneParams) {
        localStorage.setItem("woneParams", JSON.stringify(BluePattern));
      }
      appRef.current = new App(canvas);
      appRef.current.export.recordStartTime = appRef.current.time.elapsedTime;
      appRef.current.controls.parameters.buttons.exportPreview.value = true;
      appRef.current.animate();
    } else {
      const warning = WebGL.getWebGLErrorMessage();
      throw Error(warning);
    }
  }, []);

  return (
    <PatternBackgroundContext.Provider
      value={{
        onChangePattern: handleChangePattern,
        onChangeColors: handleChangeColors,
        onChangeBackgroundColor: handleChangeBackground,
        removePatternOverlay: setRemoveOverlay,
      }}
    >
      <div className={clsx(styles.canvas)}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          style={{ background: colors.background }}
        ></canvas>
        <div
          className={clsx(
            !removeOverlay && overlay
              ? styles.overlay
              : removeOverlay
              ? styles.removeOverlay
              : ""
          )}
          style={{ backgroundColor }}
        />
        {children}
      </div>
    </PatternBackgroundContext.Provider>
  );
};

export const usePatternBackground = () => useContext(PatternBackgroundContext);

export default PatternBackgroundProvider;
