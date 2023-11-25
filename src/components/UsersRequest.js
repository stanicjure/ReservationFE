import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/UserRequest.css";

const UsersRequest = (props) => {
  const { userRequestArray, setUserRequestArray } = props;
  const axiosPrivate = useAxiosPrivate();

  const handleAccept = async (id) => {
    const response = await axiosPrivate.patch(`/users/${id}`);
    if (response.status === 200) {
      console.log(response);
    } else {
      console.log(response);
    }
  };

  const handleReject = async (id) => {
    const response = await axiosPrivate.delete(`/users/${id}`);
    if (response.status === 204) {
      console.log(response);
    } else {
      console.log(response);
    }
  };

  return (
    <div id="URContainer">
      <h3>User Requests</h3>
      <div id="URContent">
        {userRequestArray.length === 0 ? (
          <p>No requests</p>
        ) : (
          userRequestArray.map((user) => {
            return (
              <div key={user.username} className="URItem">
                {user.username}{" "}
                <button
                  onClick={() => handleAccept(user.username)}
                  id="URAccept"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(user.username)}
                  id="URReject"
                >
                  Reject
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UsersRequest;
