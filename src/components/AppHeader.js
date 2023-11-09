import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import UserSettings from "./UserSettings";
import useOutsideClick from "../hooks/useOutsideClick";

const AppHeader = () => {
  const [value] = useLocalStorage("user");

  const [isSettingActive, setIsSettingActive] = useState(false);

  const handleClickOut = () => {
    setIsSettingActive(false);
  };
  const userRef = useOutsideClick(handleClickOut);

  return (
    <div>
      <div className="header">
        <Link className="headerItem" to="/lounge">
          Home
        </Link>
        <Link className="headerItem" to="/stats">
          Stats
        </Link>
        <button
          ref={userRef}
          className="noStyleButton"
          id="headerSignout"
          onClick={() => setIsSettingActive((prev) => !prev)}
        >
          User: {value}
        </button>
        <UserSettings
          setIsSettingActive={setIsSettingActive}
          isSettingActive={isSettingActive}
        />
      </div>
    </div>
  );
};

export default AppHeader;
