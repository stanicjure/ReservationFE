import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import UserSettings from "./UserSettings";

const AppHeader = () => {
  const [value] = useLocalStorage("user");

  const [isSettingActive, setIsSettingActive] = useState(false);
  return (
    <>
      <div className="header">
        <Link className="headerItem" to="/lounge">
          Home
        </Link>
        <Link className="headerItem" to="/stats">
          Stats
        </Link>
        <button
          className="noStyleButton"
          id="headerSignout"
          onClick={() => setIsSettingActive((prev) => !prev)}
        >
          User: {value}
        </button>
        <UserSettings isSettingActive={isSettingActive} />
      </div>
    </>
  );
};

export default AppHeader;
