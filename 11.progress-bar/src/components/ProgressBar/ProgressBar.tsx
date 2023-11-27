import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent((percent) =>
      percent >= 0 && percent < 100 ? percent + 1 : percent < 0 ? 0 : 100
    );
  }, [value]);

  if (percent === 100) {
    return <div className="complete">wake up to reality</div>;
  }

  return (
    <div className="ProgressBar">
      <div
        style={{ transform: `scaleX(${percent / 100})` }}
        className="Progress"
      ></div>
      <span style={{ color: percent >= 49 ? "white" : "black" }}>
        {percent}%
      </span>
    </div>
  );
};

export default ProgressBar;
