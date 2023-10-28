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
  const [dateStartError, setDateStartError] = useState(false); // for start and end date inputs
  const [dateEndError, setDateEndError] = useState(false); // for start and end date inputs
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

  const {
    setIsReservationInfoVisible,
    reservationInfo,
    setReservationInfo,
    apartments,
  } = props;

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
  const [additionalInfo, setAdditionalInfo] = useState("placeholder"); // textarea

  const res = reservationInfo.reservation; //clicked reservation

  //style for changed input fields
  const [changed, setChanged] = useState([]);
  const [textareaChanged, setTextAreaChanged] = useState();

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
      const response = await axiosPrivate.patch("/users/reservation", {
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
      // changed inputs background to green
      if (response.status === 200) {
        if (textareaChanged.background === "rgba(255,175,0,0.12)")
          setTextAreaChanged({ background: "rgba(0,255,0,0.3)" });
        let temp = changed.map((c) => c);
        changed.forEach((c, index) => {
          if (c.background === "rgba(255,175,0,0.27)")
            temp[index] = { background: "rgba(0,255,0,0.3)" };
        });
        setChanged(temp);
        setReservationInfo({
          label: undefined,
          index: undefined,
          reservation: undefined,
        });
        // doesnt matter what we set, we just want a change to happen so useEffect in ApartmentInfo.js gets new data from database.
        // could be optimized so it gets just changed data, not all
      }
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
    setIsReservationInfoVisible(false); //lol
  };

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
    const { startFormated, endFormated } = formatDate(res.start, res.end);

    const startingValues = [
      res.guestName,
      startFormated,
      endFormated,
      res.price,
      res.persons,
      res.children,
    ];
    const startingAdditionalInfo = res.additionalInfo;

    if (
      startingAdditionalInfo != additionalInfo &&
      additionalInfo != "placeholder"
    )
      setTextAreaChanged({ background: "rgba(255,175,0,0.12)" });
    else setTextAreaChanged({ background: "rgb(235, 235, 235)" });
    console.log(textareaChanged);
    let temp = changed.map((c) => c);

    startingValues.forEach((val, index) => {
      if (
        val != reservationInfoArrayToDisplay[index + 1] &&
        reservationInfoArrayToDisplay[index + 1] != "placeholder"
      ) {
        temp[index] = { background: "rgba(255,175,0,0.27)" };
      } else if (
        val == reservationInfoArrayToDisplay[index + 1] &&
        reservationInfoArrayToDisplay[index + 1] != "placeholder"
      ) {
        if (index % 2 === 0) temp[index] = { background: "rgb(240,240,240)" };
        else temp[index] = { background: "rgb(220,220,220)" };
      }
      setChanged(temp);

      // Check validity of dates, if there is an existing reservation
      let apartment;
      setDateStartError(false);
      setDateEndError(false);
      apartments.forEach((ap) => {
        if (ap.label === reservationInfo.label) apartment = ap;
      });

      const checkStart = deFormatDate(reservationInfoArrayToDisplay[2]);
      checkStart.setHours(2);
      const checkEnd = deFormatDate(reservationInfoArrayToDisplay[3]);
      checkEnd.setHours(2);
      const allReservations = Array.from(apartment.reservations);
      const filteredReservations = allReservations.filter(
        (r, index) => index !== reservationInfo.index
      );

      if (checkStart.getTime() > checkEnd.getTime()) {
        setDateStartError(true);
        setDateEndError(true);
      }
      filteredReservations.forEach((r, index) => {
        console.log(r);
        const start = new Date(r.start);
        const end = new Date(r.end);
        if (
          checkStart.getTime() >= start.getTime() &&
          checkStart.getTime() < end.getTime()
        )
          setDateStartError(true);
        if (
          checkEnd.getTime() > start.getTime() &&
          checkEnd.getTime() <= end.getTime()
        )
          setDateEndError(true);
      });
    });
    return () => {};
  }, [reservationInfoArrayToDisplay, additionalInfo]);

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
              {dateStartError ? (
                <div className="dateErrorMsg">Invalid Date</div>
              ) : (
                ""
              )}
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
              {dateEndError ? (
                <div className="dateErrorMsg">Invalid Date</div>
              ) : (
                ""
              )}
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
              style={textareaChanged}
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
