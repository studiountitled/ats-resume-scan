import React, { useEffect, useState } from "react";

const messages = [
  "We are analyzing your resume...",
  "We are analyzing the job description...",
  "We are creating a SWOT analysis...",
  "We are calculating your resume match score...",
  "We are calculating your resume match score...",
  "We are calculating your resume match score...",
  "We are calculating your resume match score...",
  "We are calculating your resume match score...",
  "We are calculating your resume match score...",
  "We are calculating your resume match score...",
  "We are calculating your resume match score...",
  "We are calculating your resume match score...",
  "We are calculating your resume match score...",
  "We are calculating your resume match score...",
];

const Loading = ({ showText }: { showText?: boolean }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="blue"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dasharray"
            values="1,150;90,150;90,150"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            values="0;-35;-125"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      {showText && <h1 key={messages[index]}>{messages[index]}</h1>}
    </div>
  );
};

export default Loading;
