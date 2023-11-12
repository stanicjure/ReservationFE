import React, { useState, useRef, useEffect, useMemo } from "react";
import "../styles/ReservationForm.css";
import { ConfirmAction } from "./ConfirmAction";
import { axiosPrivate } from "../api/axios";
import useInfoPop from "../hooks/useInfoPop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const ResevationForm = (props) => {
  const {
    username,
    setIsActive,
    reservationApartment,
    setReservationApartment,
    apartments,
  } = props;
  let { apartmentsNames } = props;
  let aps = Array.from(apartmentsNames);

  const [apartmentName, setApartmenName] = useState(apartmentsNames[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [reservationName, setReservationName] = useState("");
  const [persons, setPersons] = useState("");
  const [children, setChildren] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [advancePay, setAdvancePay] = useState("");
  const [payed, setPayed] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [startDateErr, setStartDateErr] = useState("");
  const [endDateErr, setEndDateErr] = useState("");

  const requireStartRef = useRef();
  const requireEndRef = useRef();
  const requirePersonsRef = useRef();
  const requirePriceRef = useRef();

  const requiredInputArray = [
    requireStartRef,
    requireEndRef,
    requirePersonsRef,
    requirePriceRef,
  ];

  const [InfoPop, visible, setVisible, setItem, setInfoTxt] = useInfoPop("");

  const inputRef1 = useRef();

  useEffect(() => {
    inputRef1.current.focus();
    if (reservationApartment) {
      inputRef1.current.value = reservationApartment;
      setApartmenName(reservationApartment);
    }

    return () => {
      setReservationApartment("");
    };
  }, []);

  useMemo(() => {
    if (reservationApartment) {
      const index = aps.findIndex((a) => a === reservationApartment);
      aps.splice(index, 1);
      aps = [reservationApartment, ...aps];
    } else {
      aps = [...apartmentsNames];
    }
  }, [aps]);

  const chechReservationDatesValidity = () => {
    apartments.forEach((ap) => {
      if (ap.label == apartmentName) {
        console.log(ap.label);
        const reservations = Array.from(ap.reservations);

        setStartDateErr("");
        setEndDateErr("");

        reservations.forEach((r) => {
          const start = new Date(r.start);
          const end = new Date(r.end);

          const currentStart = new Date(startDate);
          const currentEnd = new Date(endDate);

          start.setHours(2);
          end.setHours(2);
          currentStart.setHours(2);
          currentEnd.setHours(2);

          if (
            currentStart.getTime() > currentEnd.getTime() &&
            currentStart &&
            currentEnd
          ) {
            setStartDateErr("Invalid Date");
            setEndDateErr("Invalid Date");
          }

          if (
            currentStart.getTime() >= start.getTime() &&
            currentStart.getTime() < end.getTime()
          ) {
            setStartDateErr("Existing Reservation");
          }

          if (
            currentEnd.getTime() > start.getTime() &&
            currentEnd.getTime() <= end.getTime()
          ) {
            setEndDateErr("Existing Reservation");
          }
        });
      }
    });

    console.log(startDateErr);
  };

  // checking validity of dates
  useEffect(() => {
    chechReservationDatesValidity();
  }, [startDate, endDate]);

  const addReservation = async (e) => {
    e.preventDefault();
    requiredInputArray.forEach((r) => {
      if (!r.current.value) {
        r.current.style.backgroundColor = "rgba(50,0,0,0.3)";
        r.current.style.transition = "ease-out 0.4s";
        r.current.style.color = "black";
        setTimeout(() => {
          r.current.style.backgroundColor = "white";
          r.current.style.transition = "ease-in 0.3s";
          r.current.style.color = "black";
        }, 400);
      }
    });
    try {
      const response = await axiosPrivate.patch("/users/apartments", {
        username: username,
        guestName: reservationName,
        apartmentName: apartmentName,
        startDate: startDate,
        endDate: endDate,
        price: price,
        persons: persons,
        children: children,
        additionalInfo: additionalInfo,
        advancePay: advancePay,
        payed: payed,
      });
      if (response.status === 201) {
        setVisible(true);
        setItem("");
        setInfoTxt("Successful Reservation");
      } else console.log("error handling");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {InfoPop}
      <div className="backgroundBlur">
        <div id="mainContainerReservation">
          <form>
            <div id="reservationFormHeader">New reservation</div>
            <div id="reservationFormBody">
              <div id="reservationFormLeft">
                {" "}
                <div className="formInputs">
                  <label className="reservationFormLabels">
                    Apartment <br></br>
                    <select
                      className="reservationFormInputs"
                      id="apartments"
                      name="apartments"
                      value={apartmentName}
                      ref={inputRef1}
                      onChange={(e) => setApartmenName(e.target.value)}
                    >
                      {aps.map((apartment) => {
                        return (
                          <option key={apartment} value={apartment}>
                            {apartment}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>
                <div className="formInputs">
                  <label className="reservationFormLabels">
                    Name <br></br>
                    <input
                      value={reservationName}
                      onChange={(e) => setReservationName(e.target.value)}
                      className="reservationFormInputs"
                    ></input>
                  </label>
                </div>
                <div className="formInputs">
                  <label className="reservationFormLabels">
                    Arrive Date <span className="requiredSymbol">*</span>{" "}
                    <br></br>
                    {startDateErr ? (
                      <span className="errDate">{startDateErr}</span>
                    ) : (
                      ""
                    )}
                    <input
                      ref={requireStartRef}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="reservationFormInputs"
                      type="date"
                      required
                    ></input>
                  </label>
                </div>
                <div className="formInputs">
                  <label className="reservationFormLabels">
                    Leave Date <span className="requiredSymbol">*</span>{" "}
                    <br></br>
                    {endDateErr ? (
                      <span className="errDate">{endDateErr}</span>
                    ) : (
                      ""
                    )}
                    <input
                      ref={requireEndRef}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="reservationFormInputs"
                      type="date"
                      required
                    ></input>
                  </label>
                </div>
              </div>
              <div id="reservationFormMiddle">
                <div className="formInputs">
                  <label className="reservationFormLabels">
                    Persons <span className="requiredSymbol">*</span>
                    <br></br>
                    <input
                      ref={requirePersonsRef}
                      value={persons}
                      onChange={(e) => setPersons(e.target.value)}
                      className="reservationFormInputs"
                      type="number"
                      required
                    ></input>
                  </label>
                </div>
                <div className="formInputs">
                  <label className="reservationFormLabels">
                    Children <br></br>
                    <input
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                      className="reservationFormInputs"
                      type="number"
                    ></input>
                  </label>
                </div>
                <div className="formInputs">
                  <label className="reservationFormLabels">
                    Price <span className="requiredSymbol">*</span>
                    <br></br>
                    <input
                      ref={requirePriceRef}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="reservationFormInputs"
                      type="number"
                      required
                    ></input>
                  </label>
                </div>
                <div className="formInputs">
                  <label className="reservationFormLabels" for="">
                    Advance Pay
                  </label>
                  <input
                    value={advancePay}
                    onChange={(e) => setAdvancePay(e.target.value)}
                    className="reservationFormInputs"
                    type="number"
                  ></input>{" "}
                </div>
                <div
                  style={
                    !payed
                      ? { background: "rgb(170,0,0)" }
                      : { background: "rgb(0,100,0)" }
                  }
                  className="toggleFormInputs"
                >
                  <label for="payedCheckbox">
                    {" "}
                    Payed
                    <input
                      value={payed}
                      onChange={(e) => {
                        setPayed((prev) => !prev);
                      }}
                      id="payedCheckbox"
                      type="checkbox"
                    ></input>{" "}
                  </label>
                </div>
              </div>
              <div id="reservationFormRight">
                <div id="max-height-div" className="formInputs">
                  <label
                    for="reservationFormTextarea"
                    className="reservationFormLabels"
                  >
                    Additional Info{" "}
                  </label>
                  <textarea
                    cols="2"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="reservationFormInputs"
                    id="reservationFormTextarea"
                  ></textarea>
                </div>
              </div>
            </div>
            <div id="reservationFormButtonsContainer">
              <button
                className="reservationFormSubmitButton"
                type="submit"
                onClick={(e) => addReservation(e)}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setIsActive(false);
                }}
                className="reservationFormExitButton"
                type="button"
              >
                Exit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
