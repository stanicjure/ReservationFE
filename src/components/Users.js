import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useInfoPop from "../hooks/useInfoPop";
import { ConfirmAction } from "./ConfirmAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "../styles/Admin.css";

const Users = (props) => {
  const [users, setUsers] = useState();
  const [admins, setAdmins] = useState();
  const [temp, setTemp] = useState();
  const [functionToForward, setFunctionToForward] = useState();
  const [txt, setTxt] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [InfoPop, visible, setVisible, setItem, setInfoTxt] = useInfoPop("");

  const { setUserRequestArray } = props;

  const deleteUser = async (username) => {
    if (visible) return;
    try {
      const response = await axiosPrivate.delete("/users", {
        data: { username: username },
      });
      setVisible(true);
      setItem(username);
    } catch (err) {
      console.error(err);
    }
  };
  const addAdmin = async (username) => {
    try {
      const response = await axiosPrivate.patch("/users", {
        username: username,
      });
      setVisible(true);
      setItem(username);
    } catch (err) {
      console.error(err);
    }
  };
  const removeAdmin = async (username) => {
    try {
      const response = await axiosPrivate.patch("/users/removeAdmin", {
        username: username,
      });
      setVisible(true);
      setItem(username);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = (
    forwardFunctionName,
    itemInList,
    confirmText,
    infoPopText
  ) => {
    if (visible) return;
    if (temp) return;
    setFunctionToForward(forwardFunctionName);
    setTemp(itemInList);
    setTxt(confirmText);
    setInfoTxt(infoPopText);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); //  use it to cancel pending req if the component unmounts

    const getUsers = async () => {
      setTemp("");
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal, // allows us to cancel req if we need to
        });
        const adminUsers = response.data.filter((user) => user?.roles?.Admin);
        const regularUsers = response.data.filter(
          (user) => !user?.roles?.Admin && user?.roles?.User
        );
        const userRequests = response.data.filter(
          (user) => user.roles.UserRequest
        );
        setUserRequestArray([...userRequests]);
        const adminNames = adminUsers.map((admin) => admin.username);
        const regularNames = regularUsers.map((regular) => regular.username);
        //const userRoles = response.data.map((user) => user.roles);

        isMounted && setUsers(regularNames);
        isMounted && setAdmins(adminNames);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      {InfoPop}

      {temp && !visible ? (
        <ConfirmAction
          txt={txt}
          setFunctionToForward={setFunctionToForward}
          item={temp}
          setItem={setTemp}
          fnction={
            functionToForward === "deleteUser"
              ? deleteUser
              : functionToForward === "addAdmin"
              ? addAdmin
              : functionToForward === "removeAdmin"
              ? removeAdmin
              : ""
          }
        />
      ) : (
        ""
      )}
      <article>
        <h3>Admins</h3>
        <div className="adminPanelUserDisplay">
          {admins?.length ? (
            <ul>
              {admins.map((admin, i) => (
                <div key={i} className="singleUserDisplay">
                  <li>{admin}</li>
                  <FontAwesomeIcon
                    id="remove"
                    className="item"
                    icon={faXmark}
                    onClick={() => {
                      handleClick(
                        "deleteUser",
                        admin,
                        "Are you sure you want to delete user:",
                        "Succesfully deleted user:"
                      );
                    }}
                  />
                  <FontAwesomeIcon
                    id="minus"
                    className="item"
                    icon={faMinus}
                    onClick={() => {
                      handleClick(
                        "removeAdmin",
                        admin,
                        "Are you sure you want to remove admin:",
                        "Admin removed:"
                      );
                    }}
                  />
                </div>
              ))}
            </ul>
          ) : (
            <p>No admins to display</p>
          )}
        </div>
        <h3>Users</h3>
        <div className="adminPanelUserDisplay">
          {users?.length ? (
            <ul>
              {users.map((user, i) => {
                return (
                  <div key={`${i + 123}${user}${i}`}>
                    <div className="singleUserDisplay">
                      <li>{user}</li>
                      <FontAwesomeIcon
                        id="remove"
                        className="item"
                        icon={faXmark}
                        onClick={() => {
                          handleClick(
                            "deleteUser",
                            user,
                            "Are you sure you want to delete user:",
                            "Succesfully deleted user:"
                          );
                        }}
                      />
                      <FontAwesomeIcon
                        id="add"
                        className="item"
                        icon={faPlus}
                        onClick={() => {
                          handleClick(
                            "addAdmin",
                            user,
                            "Are you sure you want to add as admin:",
                            "New admin added:"
                          );
                        }}
                      />
                      <div className="item">Placeholder: {`Placeholder`}</div>
                    </div>
                  </div>
                );
              })}
            </ul>
          ) : (
            <p>No users to display</p>
          )}
        </div>

        <br />
      </article>
    </>
  );
};

export default Users;
