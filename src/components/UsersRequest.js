import React, { useEffect, useState } from "react";
import "../styles/UserRequest.css";

const UsersRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequests = () => {
      //api call
      setRequests(["Jure", "Smecar", "Konjokradica", "Saladin", "Kornjaca"]);
    };

    getRequests();
  }, []);

  const handleAccept = () => {
    //after successful api call
  };

  const handleReject = (item) => {
    // after successful api call
    let temp = new Array();
    temp = requests.filter((r) => r !== item);
    setRequests([...temp]);
  };

  return (
    <div id="URContainer">
      <h3>User Requests</h3>
      <div id="URContent">
        {requests.length === 0 ? (
          <p>No requests</p>
        ) : (
          requests.map((r) => {
            return (
              <div className="URItem">
                {r}{" "}
                <button onClick={() => handleAccept(r)} id="URAccept">
                  Accept
                </button>
                <button onClick={() => handleReject(r)} id="URReject">
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
