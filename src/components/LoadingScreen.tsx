import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + 25 + Math.random() * 10;
        if (next >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 40);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="space-background">
        <div className="stars-mini"></div>
      </div>
      <div className="loading-content">
        <div className="loader-title">Travelling to next galaxy</div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
