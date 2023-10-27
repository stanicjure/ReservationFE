import React, { useState, useRef, useEffect, useMemo } from "react";
import "../styles/ReservationForm.css";
import { ConfirmAction } from "./ConfirmAction";
import { axiosPrivate } from "../api/axios";
import useInfoPop from "../hooks/useInfoPop";

export const ResevationForm = (props) => {
  const {
    username,
    setIsActive,
    reservationApartment,
    setReservationApartment,
  } = props;
  let { apartments } = props;
  let aps = Array.from(apartments);

  const [apartmentName, setApartmenName] = useState(apartments[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [reservationName, setReservationName] = useState("");
  const [persons, setPersons] = useState("");
  const [children, setChildren] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [txt, setTxt] = useState();
  const [temp, setTemp] = useState();
  const [functionToForward, setFunctionToForward] = useState();

  const [InfoPop, visible, setVisible, setItem, setInfoTxt] = useInfoPop("");

  const inputRef1 = useRef();
  const errRef = useRef();
  const confirmPopRef = useRef();
  const confirmStyle = "bigConfirm";

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
      aps = [...apartments];
    }
  }, [aps]);

  const handleAddReservation = () => {
    setTxt("Are you sure you want to add following reservation:");
    setTemp([
      { info: "Apartment:", item: apartmentName },
      { info: "Persons:", item: persons },
      { info: "Price:", item: price },
      { info: "Arrive Date:", item: startDate },
      { info: "Leave Date:", item: endDate },
    ]);
    setFunctionToForward("addReservation");
  };

  const addReservation = async () => {
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
  const onChange = (e) => {
    setApartmenName(e.target.value);
  };
  return (
    <>
      {InfoPop}
      {temp ? (
        <ConfirmAction
          txt={txt}
          item={temp}
          setItem={setTemp}
          confirmStyle={confirmStyle}
          setFunctionToForward={setFunctionToForward}
          fnction={functionToForward === "addReservation" ? addReservation : ""}
        />
      ) : (
        ""
      )}
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
                    Arrive Date <br></br>
                    <input
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
                    Leave Date <br></br>
                    <input
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
                    Persons <br></br>
                    <input
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
                    Price <br></br>
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="reservationFormInputs"
                      type="number"
                      required
                    ></input>
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
                type="button"
                onClick={handleAddReservation}
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
