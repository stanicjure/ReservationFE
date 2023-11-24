import { Link } from "react-router-dom";
import Users from "./Users";
import UsersRequest from "./UsersRequest";
import "../styles/Admin.css";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";

const Admin = () => {
  const { auth } = useAuth();
  const [value] = useLocalStorage("user");

  return (
    <div className="adminContainer">
      <div className="adminHeader">
        <Link to="/lounge">Home</Link>
        <div>
          <p>Admin:</p>
          {value}
        </div>
      </div>
      <br />
      <Users />
      <br />
      <UsersRequest />

      <div className="flexGrow"></div>
    </div>
  );
};

export default Admin;
