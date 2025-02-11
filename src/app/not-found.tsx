import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="loading-container">
      <div className="not-found-content">
        <h2>You look lost. I can change that.</h2>
        <p>
          <Link href="/">Go to the homepage</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
