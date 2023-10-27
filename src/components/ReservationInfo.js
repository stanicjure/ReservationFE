import React, { useEffect, useRef, useState } from "react";
import "../styles/ReservationInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import {
  faXmark,
  faPenToSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import formatDate from "../api/formatDate";
import deFormatDate from "../api/deFormatDate";

const ReservationInfo = (props) => {
  const axiosPrivate = useAxiosPrivate();

  const [isInputDisabled, setIsInputDisabled] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const { setIsReservationInfoVisible, reservationInfo, setReservationinfo } =
    props;

  // only used to get username for axios
  const { auth } = useAuth();

  const [reservationInfoArrayToDisplay, setReservationInfoArrayToDisplay] = // array of inputs
    useState([
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
    ]);
  const [additionalInfo, setAdditionalInfo] = useState(); // textarea

  const res = reservationInfo.reservation; //clicked reservation

  const createArrayForDisplay = () => {
    if (!res) return;

    const { startFormated, endFormated } = formatDate(res.start, res.end);

    setReservationInfoArrayToDisplay([
      reservationInfo.label,
      res.guestName,
      startFormated,
      endFormated,
      res.price,
      res.persons,
      res.children,
    ]);
    setAdditionalInfo(res.additionalInfo);
  };

  const handleReservationMutation = async () => {
    const startDate = deFormatDate(reservationInfoArrayToDisplay[2]);
    const endDate = deFormatDate(reservationInfoArrayToDisplay[3]);
    startDate.setHours(2);
    endDate.setHours(2);
    try {
      await axiosPrivate.patch("/users/reservation", {
        username: "Jure",
        guestName: reservationInfoArrayToDisplay[1],
        apartmentName: reservationInfoArrayToDisplay[0],
        price: reservationInfoArrayToDisplay[4],
        persons: reservationInfoArrayToDisplay[5],
        children: reservationInfoArrayToDisplay[6],
        arrive: startDate,
        leave: endDate,
        additionalInfo: additionalInfo,
        reservationIndex: reservationInfo.index,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e, index) => {
    let tempArr = Array.from(reservationInfoArrayToDisplay);
    tempArr[index] = e.target.value;
    setReservationInfoArrayToDisplay(tempArr);
  };

  const handleEdit = (index) => {
    let counter = 0;
    const temp = isInputDisabled.map((x) => {
      if (counter === index) {
        counter++;
        return !x;
      } else {
        counter++;
        return true;
      }
    });
    setIsInputDisabled(temp);
  };

  const handleXMark = () => {};

  const handleCheckMark = () => {};

  const exitReservationInfo = () => {
    setIsReservationInfoVisible(false);
  };

  //style for changed input fields
  const [changed, setChanged] = useState([]);

  useEffect(() => {
    createArrayForDisplay();
    // set white and grey background styles
    setChanged([
      { background: "rgb(240, 240, 240)" },
      { background: "rgb(220, 220, 220)" },
      { background: "rgb(240, 240, 240)" },
      { background: "rgb(220, 220, 220)" },
      { background: "rgb(240, 240, 240)" },
      { background: "rgb(220, 220, 220)" },
    ]);

    console.log(`changed ${changed}`);

    return () => {};
  }, []);

  // Detect changed input fields
  useEffect(() => {
    //format date, maybe use a hook or smthing we already use same
    const { startFormated, endFormated } = formatDate(res.start, res.end);

    const startingValues = [
      res.guestName,
      startFormated,
      endFormated,
      res.price,
      res.persons,
      res.children,
    ];

    let temp = changed.map((c) => c);

    startingValues.forEach((val, index) => {
      if (
        val != reservationInfoArrayToDisplay[index + 1] &&
        reservationInfoArrayToDisplay[index + 1] != "placeholder"
      ) {
        temp[index] = { background: "rgba(255,0,0,0.3)" };
      } else if (
        val == reservationInfoArrayToDisplay[index + 1] &&
        reservationInfoArrayToDisplay[index + 1] != "placeholder"
      ) {
        if (index % 2 === 0) temp[index] = { background: "rgb(240,240,240)" };
        else temp[index] = { background: "rgb(220,220,220)" };
      }
      console.log(changed);
      setChanged(temp);
    });
    return () => {};
  }, [reservationInfoArrayToDisplay]);

  return (
    <div className="backgroundBlur">
      <div id="reservationInfoContainer">
        <div id="reservationInfoHeader">
          <p>Reservation Info</p>
          <button
            onClick={exitReservationInfo}
            id="xButton"
            className="noStyleButton"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div id="reservationInfoBody">
          <div id="reservationInfoLeft">
            <div style={{ background: "rgb(220,220,220)" }} className="resInfo">
              <p className="resInfoText">Ap</p>
              <input
                type="text"
                value={reservationInfoArrayToDisplay[0]}
                onChange={(e) => {
                  handleInputChange(e, 0);
                }}
                disabled={true}
                className="reservationInfoInput"
              ></input>
            </div>
            <div style={changed[0]} className="resInfo">
              <p className="resInfoText">Name</p>
              <input
                type="text"
                value={reservationInfoArrayToDisplay[1]}
                onChange={(e) => {
                  handleInputChange(e, 1);
                }}
                disabled={isInputDisabled[1]}
                className="reservationInfoInput"
              ></input>
              <button
                style={!isInputDisabled[1] ? { color: "green" } : {}}
                onClick={() => handleEdit(1)}
                className="editButton"
              >
                <FontAwesomeIcon
                  icon={isInputDisabled[1] ? faPenToSquare : faCheck}
                />
              </button>
            </div>
            <div style={changed[1]} className="resInfo">
              <p className="resInfoText">Arrive</p>
              <input
                type="date"
                value={reservationInfoArrayToDisplay[2]}
                onChange={(e) => {
                  handleInputChange(e, 2);
                }}
                disabled={isInputDisabled[2]}
                className="reservationInfoInput"
              ></input>
              <button
                style={!isInputDisabled[2] ? { color: "green" } : {}}
                onClick={() => handleEdit(2)}
                className="editButton"
              >
                <FontAwesomeIcon
                  icon={isInputDisabled[2] ? faPenToSquare : faCheck}
                />
              </button>
            </div>
            <div style={changed[2]} className="resInfo">
              <p className="resInfoText">Leave</p>
              <input
                type="date"
                value={reservationInfoArrayToDisplay[3]}
                onChange={(e) => {
                  handleInputChange(e, 3);
                }}
                disabled={isInputDisabled[3]}
                className="reservationInfoInput"
              ></input>
              <button
                style={!isInputDisabled[3] ? { color: "green" } : {}}
                onClick={() => handleEdit(3)}
                className="editButton"
              >
                <FontAwesomeIcon
                  icon={isInputDisabled[3] ? faPenToSquare : faCheck}
                />
              </button>
            </div>
            <div style={changed[3]} className="resInfo">
              <p className="resInfoText">Price</p>
              <input
                type="number"
                value={reservationInfoArrayToDisplay[4]}
                onChange={(e) => {
                  handleInputChange(e, 4);
                }}
                disabled={isInputDisabled[4]}
                className="reservationInfoInput"
              ></input>
              <button
                style={!isInputDisabled[4] ? { color: "green" } : {}}
                onClick={() => handleEdit(4)}
                className="editButton"
              >
                <FontAwesomeIcon
                  icon={isInputDisabled[4] ? faPenToSquare : faCheck}
                />
              </button>
            </div>
            <div style={changed[4]} className="resInfo">
              <p className="resInfoText">Persons</p>
              <input
                type="number"
                value={reservationInfoArrayToDisplay[5]}
                onChange={(e) => {
                  handleInputChange(e, 5);
                }}
                disabled={isInputDisabled[5]}
                className="reservationInfoInput"
              ></input>
              <button
                style={!isInputDisabled[5] ? { color: "green" } : {}}
                onClick={() => handleEdit(5)}
                className="editButton"
              >
                <FontAwesomeIcon
                  icon={isInputDisabled[5] ? faPenToSquare : faCheck}
                />
              </button>
            </div>
            <div style={changed[5]} className="resInfo">
              <p className="resInfoText">Children</p>
              <input
                type="number"
                value={reservationInfoArrayToDisplay[6]}
                onChange={(e) => {
                  handleInputChange(e, 6);
                }}
                disabled={isInputDisabled[6]}
                className="reservationInfoInput"
              ></input>
              <button
                style={!isInputDisabled[6] ? { color: "green" } : {}}
                onClick={() => handleEdit(6)}
                className="editButton"
              >
                <FontAwesomeIcon
                  icon={isInputDisabled[6] ? faPenToSquare : faCheck}
                />
              </button>
            </div>
          </div>

          <div id="reservationInfoRight">
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows="2"
              id="reservationInfoTextarea"
            ></textarea>
          </div>
        </div>
        <div id="footer">
          <button id="previousButton" className="noStyleButtonResInfo">
            Previous
          </button>
          <button
            onClick={handleReservationMutation}
            id="confirmButton"
            className="noStyleButtonResInfo"
          >
            Confirm
          </button>
          <button id="nextButton" className="noStyleButtonResInfo">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationInfo;
