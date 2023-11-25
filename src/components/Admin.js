import { Link } from "react-router-dom";
import Users from "./Users";
import UsersRequest from "./UsersRequest";
import "../styles/Admin.css";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import { useState } from "react";

const Admin = () => {
  const { auth } = useAuth();
  const [userRequestArray, setUserRequestArray] = useState([]);

  return (
    <div className="adminContainer">
      <div className="adminHeader">
        <Link to="/lounge">Home</Link>
        <div>
          <p>Admin:</p>
          {auth.user}
        </div>
      </div>
      <br />
      <Users setUserRequestArray={setUserRequestArray} />
      <br />
      <UsersRequest
        setUserRequestArray={setUserRequestArray}
        userRequestArray={userRequestArray}
      />

      <div className="flexGrow"></div>
    </div>
  );
};

export default Admin;
