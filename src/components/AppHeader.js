import React from "react";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <>
      <div className="header">
        <Link className="headerItem" to="/">
          Home
        </Link>
        <Link className="headerItem" to="/stats">
          Stats
        </Link>
      </div>
    </>
  );
};

export default AppHeader;
