import React from "react";
import useAuth from "../hooks/useAuth";
import "../styles/Title.css";

const Title = () => {
  const { auth } = useAuth();

  return (
    <div id="titleContainer">
      <h1>Bongcloud</h1>
      <p id="userName">User: {auth.user}</p>
    </div>
  );
};

export default Title;
