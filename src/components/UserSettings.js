import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const UserSettings = (props) => {
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/linkpage");
  };
  const { isSettingActive } = props;
  return (
    <div className={!isSettingActive ? "offscreen" : "displaySetting"}>
      <button id="logoutBut" className="noStyleButton" onClick={signOut}>
        Logout
      </button>
    </div>
  );
};

export default UserSettings;
