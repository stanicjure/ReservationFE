import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserSettings = (props) => {
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/linkpage");
  };

  const { isSettingActive, setIsSettingActive } = props;
  const auth = useAuth();
  const ADMIN = process.env.REACT_APP_ADMIN;
  const roles = Array.from(auth.auth.roles);
  const isAdmin = roles.find((el) => el == ADMIN);

  return (
    <div className={!isSettingActive ? "offscreen" : "displaySetting"}>
      {isAdmin ? (
        <Link id="adminLink" to="/admin">
          Admin
        </Link>
      ) : (
        ""
      )}
      <button id="logoutBut" className="noStyleButton" onClick={signOut}>
        Logout
      </button>
    </div>
  );
};

export default UserSettings;
