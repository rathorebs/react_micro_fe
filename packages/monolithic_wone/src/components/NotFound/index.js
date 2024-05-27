import React, { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = `Page Not Found - Walking on Earth`;
  }, []);

  return (
    <div className="corporate-container">
      <h2>Page Not found</h2>
    </div>
  );
};

export default NotFound;
