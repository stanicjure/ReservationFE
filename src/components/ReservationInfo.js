import React, { useEffect, useRef, useState } from "react";
import "../styles/ReservationInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPenToSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import formatDate from "../api/formatDate";
import deFormatDate from "../api/deFormatDate";
import useInfoPop from "../hooks/useInfoPop";

const ReservationInfo = (props) => {
  const [dateStartError, setDateStartError] = useState(false); // for start and end date inputs
  const [dateEndError, setDateEndError] = useState(false); // for start and end date inputs
  const axiosPrivate = useAxiosPrivate();

  const [InfoPop, , setVisible, , setInfoTxt, setRefresh] = useInfoPop();

  const [isInputDisabled, setIsInputDisabled] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const inputRef = useRef([]);

  const {
    setIsReservationInfoVisible,
    reservationInfo,
    setReservationInfo,
    apartments,
    apartmentsChanged,
    setApartmentsChanged,
    allFoundItemsArray,
    setAllFoundItemsArray,
  } = props;

  const [reservationInfoArrayToDisplay, setReservationInfoArrayToDisplay] = // array of inputs
    useState(["", "", "", "", 0, 0, 0, 0, false]);
  const [additionalInfo, setAdditionalInfo] = useState(""); // textarea

  const [res, setRes] = useState(reservationInfo.reservation); //clicked reservation
  const [current, setCurrent] = useState(); // number of reservation
  const [numberOfReservations, setNumberOfReservations] = useState();

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
      res.advancePay,
      res.payed,
    ]);
    setAdditionalInfo(res.additionalInfo);
  };

  const [dateErrorStyle, setDateErrorStyle] = useState();

  const handleReservationMutation = async () => {
    // if we have invalid date
    if (dateStartError || dateEndError) {
      setDateErrorStyle({
        background: "rgba(255, 0, 0, 0.76)",
        color: "rgb(80,0,0)",
        transition: "linear 0.2s",
      });
      setTimeout(() => {
        setDateErrorStyle({
          background: "rgba(255, 95, 95, 0.66)",
          color: "rgb(141, 0, 0)",
          transition: "linear 0.2s",
        });
      }, 200);
      return;
    }
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
        advancePay: reservationInfoArrayToDisplay[7],
        payed: reservationInfoArrayToDisplay[8],
        additionalInfo: additionalInfo,
        reservationIndex: reservationInfo.index,
      });

      if (response) setApartmentsChanged((prev) => !prev);
      const responseParsed = JSON.parse(response.data);
      setReservationInfo({
        label: responseParsed.label,
        index: responseParsed.index,
        reservation: responseParsed.reservation,
      });
      setRes(responseParsed.reservation);

      setIsInputDisabled([true, true, true, true, true, true, true, true]);

      // changed inputs background to green
      if (response.status === 200) {
        res._id = responseParsed.reservation._id; // id changes when mutate so we couldnt delete reservation
        if (textareaChanged.background === "rgba(255,175,0,0.12)")
          setTextAreaChanged({ background: "rgba(0,255,0,0.3)" });
        let temp = changed.map((c) => c);
        changed.forEach((c, index) => {
          if (c.background === "rgba(255,175,0,0.27)")
            temp[index] = { background: "rgba(0,255,0,0.3)" };
        });
        setChanged(temp);
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
    inputRef?.current?.forEach((el, i) => {
      if (i == index - 1) {
        el.disabled = !el.disabled;
        el.focus();
      } else el.disabled = true;
      const temp = inputRef?.current?.map((t) => t?.disabled);
      setIsInputDisabled([0, ...temp]);
    });
  };

  const exitReservationInfo = () => {
    setIsReservationInfoVisible(false); //lol
    setAllFoundItemsArray([]); // this array is formed on item click when we use search bar.
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

    inputRef?.current?.forEach((el) => (el.disabled = true));
    return () => {};
  }, []);

  const setEverything = (reservations, index) => {
    const reservation = reservations[index];

    const { startFormated, endFormated } = formatDate(
      reservation.start,
      reservation.end
    );
    setReservationInfoArrayToDisplay([
      !reservation.apName ? reservationInfo.label : reservation.apName, // .apname exists if we used searchbar, then all apartment names wont be the same
      reservation.guestName,
      startFormated,
      endFormated,
      reservation.price,
      reservation.persons,
      reservation.children,
      reservation.advancePay,
      reservation.payed,
    ]);
    setReservationInfo({
      label: reservationInfo.label,
      index: index,
      reservation: reservation,
    });

    setAdditionalInfo(reservation.additionalInfo);
    setRes(reservation);
    setIsInputDisabled([true, true, true, true, true, true, true, true]);
    setCurrent(index + 1);
    console.log(reservation.children);
  };

  const nextPrevResevation = (nextPrev) => {
    if (allFoundItemsArray.length === 0) {
      // so if we didnt use search bar, but we clicked a reservation
      apartments.forEach((ap) => {
        // optimize this, we dont wanna search apartments everytime we click, we can get apartment on click and just search reservations
        if (ap.label === reservationInfo.label) {
          const reservations = Array.from(ap.reservations);
          let index;
          if (
            reservationInfo.index + nextPrev < reservations.length &&
            reservationInfo.index + nextPrev > 0
          )
            index = reservationInfo.index + nextPrev;
          else if (reservationInfo.index + nextPrev < 0)
            index = reservations.length - 1;
          else index = 0;

          setEverything(reservations, index);
        }
      });
    } else {
      // if we used a search bar
      const reservations = Array.from(allFoundItemsArray);
      let index;
      if (
        reservationInfo.index + nextPrev < reservations.length &&
        reservationInfo.index + nextPrev > 0
      )
        index = reservationInfo.index + nextPrev;
      else if (reservationInfo.index + nextPrev < 0)
        index = reservations.length - 1;
      else index = 0;
      setEverything(reservations, index);
    }
  };

  const deleteReservation = async () => {
    try {
      const resp = await axiosPrivate.patch("/users/deleteReservation", {
        username: "Jure",
        apName: reservationInfoArrayToDisplay[0],
        _id: res._id,
      });
      setApartmentsChanged((prev) => !prev);
      //setEverything(resp.data.newReservations, resp.data.index); // zasto ovo ne radi
      nextPrevResevation(1); // a ovo radi, B T J
      setInfoTxt("Succesfully deleted");
      setRefresh(false);
      setVisible(true);
    } catch (err) {
      console.log(err);
    }
  };

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
      res.advancePay,
      res.payed,
    ];
    const startingAdditionalInfo = res.additionalInfo;

    if (
      startingAdditionalInfo != additionalInfo &&
      additionalInfo != "placeholder"
    )
      setTextAreaChanged({ background: "rgba(255,175,0,0.12)" });
    else setTextAreaChanged({ background: "rgb(235, 235, 235)" });
    let temp = changed.map((c) => c);

    startingValues.forEach((val, index) => {
      // if we have date error we not gonna change the style
      if (
        (index === 1 && dateStartError === true) ||
        (index === 2 && dateEndError === true)
      ) {
        if (index % 2 === 0) temp[index] = { background: "rgb(240,240,240)" };
        else temp[index] = { background: "rgb(220,220,220)" };
        return;
      }
      // now we can change style on change
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
    });
  }, [
    reservationInfoArrayToDisplay,
    additionalInfo,
    dateStartError,
    dateEndError,
  ]);

  useEffect(() => {
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

    allFoundItemsArray.length !== 0
      ? setNumberOfReservations(allFoundItemsArray.length)
      : setNumberOfReservations(allReservations.length);

    allFoundItemsArray.length !== 0
      ? setCurrent(reservationInfo.index + 1)
      : setCurrent(reservationInfo.index + 1); // current reservation number

    const filteredReservations = allReservations.filter(
      (r, index) => index !== reservationInfo.index
    );

    if (checkStart.getTime() > checkEnd.getTime()) {
      setDateStartError(true);
      setDateEndError(true);
    }
    filteredReservations.forEach((r, index) => {
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
  }, [reservationInfoArrayToDisplay[2], reservationInfoArrayToDisplay[3]]);

  return (
    <div className="backgroundBlur">
      <div id="reservationInfoContainer">
        {InfoPop}
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
                ref={(el) => (inputRef.current[0] = el)}
                type="text"
                value={reservationInfoArrayToDisplay[1]}
                onChange={(e) => {
                  handleInputChange(e, 1);
                }}
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
                ref={(el) => (inputRef.current[1] = el)}
                type="date"
                value={reservationInfoArrayToDisplay[2]}
                onChange={(e) => {
                  handleInputChange(e, 2);
                }}
                className="reservationInfoInputDate"
              ></input>
              {dateStartError ? (
                <div style={dateErrorStyle} className="dateErrorMsg">
                  Invalid Date
                </div>
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
                ref={(el) => (inputRef.current[2] = el)}
                type="date"
                value={reservationInfoArrayToDisplay[3]}
                onChange={(e) => {
                  handleInputChange(e, 3);
                }}
                className="reservationInfoInputDate"
              ></input>
              {dateEndError ? (
                <div style={dateErrorStyle} className="dateErrorMsg">
                  Invalid Date
                </div>
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
                ref={(el) => (inputRef.current[3] = el)}
                type="number"
                value={reservationInfoArrayToDisplay[4]}
                onChange={(e) => {
                  handleInputChange(e, 4);
                }}
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
                ref={(el) => (inputRef.current[4] = el)}
                type="number"
                value={reservationInfoArrayToDisplay[5]}
                onChange={(e) => {
                  handleInputChange(e, 5);
                }}
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
                ref={(el) => (inputRef.current[5] = el)}
                type="number"
                value={reservationInfoArrayToDisplay[6]}
                onChange={(e) => {
                  handleInputChange(e, 6);
                }}
                className="reservationInfoInput"
              ></input>
              <button
                style={
                  !inputRef?.current[5]?.disabled ? { color: "green" } : {}
                }
                onClick={() => handleEdit(6)}
                className="editButton"
              >
                <FontAwesomeIcon
                  icon={isInputDisabled[6] ? faPenToSquare : faCheck}
                />
              </button>
            </div>
            <div style={changed[6]} className="resInfoRight">
              <p className="resInfoTextRight">Advance Payment:</p>
              <input
                ref={(el) => (inputRef.current[6] = el)}
                type="number"
                value={reservationInfoArrayToDisplay[7]}
                onChange={(e) => {
                  handleInputChange(e, 7);
                }}
                className="reservationInfoInputRight"
              ></input>
              <button
                style={!isInputDisabled[7] ? { color: "green" } : {}}
                onClick={() => handleEdit(7)}
                className="editButton"
              >
                <FontAwesomeIcon
                  icon={isInputDisabled[7] ? faPenToSquare : faCheck}
                />
              </button>
            </div>
          </div>

          <div id="reservationInfoRight">
            <div
              style={
                changed[7]?.background === "rgba(255,175,0,0.27)"
                  ? { background: "rgba(225,175,0,0.85)" }
                  : !reservationInfoArrayToDisplay[8]
                  ? { background: "rgb(170,0,0)", color: "white" }
                  : { background: "rgb(0,100,0)", color: "white" }
              }
              className="resInfoRight"
            >
              <p
                style={{ color: "white", fontWeight: "500" }}
                className="resInfoTextRight"
              >
                Payed
              </p>
              <input
                value={reservationInfoArrayToDisplay[8]}
                checked={
                  reservationInfoArrayToDisplay[8]
                    ? reservationInfoArrayToDisplay[8]
                    : false
                }
                onChange={() => {
                  let tempArr = Array.from(reservationInfoArrayToDisplay);
                  tempArr[8] = !tempArr[8];
                  setReservationInfoArrayToDisplay(tempArr);
                  console.log(reservationInfoArrayToDisplay[8]);
                }}
                className="checkBox"
                type="checkbox"
              ></input>
            </div>
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
          <button
            onClick={() => nextPrevResevation(-1)}
            id="previousButton"
            className="noStyleButtonResInfo"
          >
            Previous
          </button>
          <button
            onClick={handleReservationMutation}
            id="confirmButton"
            className="noStyleButtonResInfo"
          >
            Confirm
          </button>
          <span>{`${current} / ${numberOfReservations}`}</span>
          <button
            onClick={deleteReservation}
            id="deleteButton"
            className="noStyleButtonResInfo"
          >
            Delete
          </button>
          <button
            onClick={() => nextPrevResevation(1)}
            id="nextButton"
            className="noStyleButtonResInfo"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationInfo;
