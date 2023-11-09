import React from "react";
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
  const isAdmin = Array.from(auth.auth.roles).find((el) => el == ADMIN);

  return (
    <div className={!isSettingActive ? "offscreen" : "displaySetting"}>
      <button id="logoutBut" className="noStyleButton" onClick={signOut}>
        Logout
      </button>
      {isAdmin ? (
        <Link id="adminLink" to="/admin">
          Admin
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserSettings;
