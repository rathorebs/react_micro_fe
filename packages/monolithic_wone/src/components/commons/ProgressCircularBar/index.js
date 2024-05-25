import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import "./ProgressCircularBar.css";

const ProgressCircularBar = (props) => {
  const circleRef = useRef(null);
  const {
    size,
    progress,
    strokeWidth,
    circleOneStroke,
    circleTwoStroke,
    progressStatus,
    shadow,
  } = props;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    if (progress <= 100) {
      const progressOffset = ((100 - progress) / 100) * circumference;
      setOffset(progressOffset);
    }

    circleRef.current.style = "transition: stroke-dashoffset 850ms ease-in-out";
  }, [setOffset, progress, circumference, offset]);

  return (
    <>
      <svg
        className="svg"
        width={size}
        height={size}
        viewBox={shadow ? "-3 -6 130 130" : null}
      >
        <filter id="dropshadow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          <feOffset dx="2" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <circle
          className="svg-circle-bg"
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth="6"
        />
        <circle
          transform={`rotate(-90, ${center},${center})`}
          className="svg-circle"
          ref={circleRef}
          stroke={circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter={shadow ? "url(#dropshadow)" : null}
        />
        <text
          textAnchor="middle"
          x={`${center}`}
          y={`${center + 10}`}
          className="svg-circle-text"
        >
          {progressStatus ? `${progress}%` : null}
        </text>
      </svg>
    </>
  );
};

ProgressCircularBar.propTypes = {
  size: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  circleOneStroke: PropTypes.string.isRequired,
  circleTwoStroke: PropTypes.string.isRequired,
  progressStatus: PropTypes.bool.isRequired,
};

export default ProgressCircularBar;
