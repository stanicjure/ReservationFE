import React, { useEffect, useState, useRef } from "react";
import useDate from "../hooks/useDate";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLocalStorage from "../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ResevationForm } from "./ResevationForm";
import { AddDeleteApartment } from "./AddDeleteApartment";
import { ConfirmAction } from "./ConfirmAction";
import ReservationInfo from "./ReservationInfo";
import useInfoPop from "../hooks/useInfoPop";

//REMEMBER TO DISABLE SCROLLING WHEN INFO POPS UP!!! actually no need i think position is fixed anyway we gonna disable everything else
//NO NEED FOR APARTMENTSNAMES
const ApartmentInfo = (props) => {
  const [apartmentsNames, setApartmentsNames] = useState([]);
  const [date, getNumberOfDaysInMonth] = useDate();
  const { monthDisplay, yearDisplay } = props;
  const { auth } = useAuth();
  const signedUser = useLocalStorage("user", auth.user);
  const axiosPrivate = useAxiosPrivate();
  const [reservationFormActive, setReservationFormActive] = useState(false);
  const [addApartmentActive, setAddApartmentActive] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [apartmentsChanged, setApartmentsChanged] = useState(false); // will be used to detect changes made in reservationsInfo

  // for highlighting hovered reservation
  const boxRef = useRef({});
  const visualReservationRef = useRef({});
  const [highligtedElements, setHighlitedElements] = useState([]);
  const [highlightedReservationVisual, setHighlightedReservationVisual] =
    useState([]);

  const boxesArray = Array.from(
    Array(getNumberOfDaysInMonth(monthDisplay)).keys()
  );

  // Confirm action and info pop
  const [InfoPop, visible, setVisible, setItem, setInfoTxt] = useInfoPop();
  const [txt, setTxt] = useState();
  const [temp, setTemp] = useState();
  const [functionToForward, setFunctionToForward] = useState();
  const confirmStyle = "";

  // for reservation form to set value of select element
  const [reservationApartment, setReservationApartment] = useState();

  // for reservation info
  const [isReservationInfoVisible, setIsReservationInfoVisible] =
    useState(false);
  const [reservationInfo, setReservationInfo] = useState({});

  // What style of date boxes to display
  const handleBoxStyle = (apName, day) => {
    let boxStyle = "redBox";
    let start2 = new Date();
    let end2 = new Date();
    apartments.forEach((ap) => {
      if (ap.label === apName) {
        ap?.reservations.forEach((re) => {
          const start = new Date(re.start);
          const end = new Date(re.end);
          const currentDate = new Date(yearDisplay, monthDisplay, day, 2);
          if (
            currentDate.getTime() >= start.getTime() &&
            currentDate.getTime() <= end.getTime() &&
            currentDate.getTime() !== end2.getTime()
          )
            boxStyle = "greenBox";
          else if (
            start.getTime() === end2.getTime() &&
            currentDate.getTime() === start.getTime()
          )
            boxStyle = "sharedBox";
          start2 = new Date(re.start);
          end2 = new Date(re.end);
        });
      }
    });
    return boxStyle;
  };

  const handleReservationStyle = (apName, day) => {
    let reservationStyle = "reservationVisualDefault";
    let start2 = new Date();
    let end2 = new Date();
    apartments.forEach((ap) => {
      if (ap.label === apName) {
        ap?.reservations.forEach((re) => {
          const start = new Date(re.start);
          const end = new Date(re.end);
          const currentDate = new Date(yearDisplay, monthDisplay, day, 2);
          const counterDate = new Date(yearDisplay, monthDisplay, 1, 2);

          if (
            currentDate.getTime() === start.getTime() &&
            start.getTime() !== end2.getTime()
          )
            reservationStyle = "reservationVisualLeft";
          else if (
            currentDate.getTime() === start.getTime() &&
            start.getTime() === end2.getTime()
          )
            reservationStyle = "reservationVisualShared";
          else if (currentDate.getTime() === end.getTime())
            reservationStyle = "reservationVisualRight";
          else if (
            currentDate.getTime() > start.getTime() &&
            currentDate.getTime() < end.getTime()
          )
            reservationStyle = "reservationVisualTopBottom";

          start2 = new Date(re.start);
          end2 = new Date(re.end);
        });
      }
    });
    return reservationStyle;
  };

  const handleMouseOver = (e, apName, day) => {
    const hovered = new Date(yearDisplay, monthDisplay, day, 2);
    let arrayToHighlight = new Array();

    apartments.forEach((ap) => {
      if (ap.label === apName)
        ap?.reservations.forEach((re) => {
          const start = new Date(re.start);
          const end = new Date(re.end);
          const counter = new Date(yearDisplay, monthDisplay, 1);
          counter.setHours(2);
          if (
            hovered.getTime() >= start.getTime() &&
            hovered.getTime() <= end.getTime()
          ) {
            for (let i = 1; i <= getNumberOfDaysInMonth(monthDisplay); i++) {
              if (
                counter.getTime() >= start.getTime() &&
                counter.getTime() <= end.getTime() &&
                counter.getMonth() === monthDisplay &&
                counter.getFullYear() === yearDisplay
              ) {
                arrayToHighlight = [...arrayToHighlight, counter.getDate()];
              }
              counter.setDate(counter.getDate() + 1);
            }
          }
        });
    });
    // if shared date highlight only later reservation
    arrayToHighlight.forEach((ar, i) => {
      if (ar === arrayToHighlight[i + 1]) {
        const temp = arrayToHighlight.slice(i + 1);
        arrayToHighlight = temp;
      }
    });

    // make it a class instead of making values like this. it will solve that crappy bug i have a hunch lul
    if (arrayToHighlight) {
      setHighlitedElements(
        arrayToHighlight.map((ar) => {
          boxRef.current[`${apName}${ar}`].style.background = "rgb(0,0,170)";
          boxRef.current[`${apName}${hovered.getDate()}`].style.border =
            "solid 1px rgb(245,230,0)";
          return boxRef.current[`${apName}${ar}`];
        })
      );
      setHighlightedReservationVisual(
        arrayToHighlight.map((ar) => {
          visualReservationRef.current[`${apName}${ar}`].style.height = "46px";
          visualReservationRef.current[`${apName}${ar}`].style.background =
            "rgb(245,230,0)";
          return visualReservationRef.current[`${apName}${ar}`];
        })
      );
    }
  };

  const handleMouseLeave = (e) => {
    highligtedElements.forEach((el) => (el.style = ""));
    highlightedReservationVisual.forEach((el) => (el.style = ""));
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getApartments = async () => {
      try {
        const id = "Jure"; //auth.user
        const response = await axiosPrivate.get(`/users/${id}`, {
          signal: controller.signal,
        });
        const apartmentsArray = response.data.apartments;
        setApartments([...apartmentsArray]);
        setApartmentsNames(apartmentsArray.map((item) => item.label));
      } catch (err) {
        console.error(err);
      }
    };

    getApartments();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [apartmentsChanged]); // if we change reservation in ReservationInfo.js we wanna get apartments again from database

  const addApartment = async (apName) => {
    try {
      const resp = await axiosPrivate.post("/users/apartments", {
        username: signedUser,
        apartmentName: apName,
      });
      console.log(resp);
    } catch (err) {
      console.error(err);
    }

    window.location.reload(false);
  };

  const deleteApartment = async (apName) => {
    try {
      const resp = await axiosPrivate.patch("/users/apartments/delete", {
        username: signedUser,
        apartmentName: apName,
      });
      if (resp.status === 200) {
        setVisible(true);
        setItem(resp.data.message);
        setInfoTxt("Succesfully deleted");
        console.log(resp.data);
      } else console.log("Error handling");
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = (apName) => {
    setTxt("Are you sure you want to delete");
    setTemp(apName);
    setFunctionToForward("deleteApartment");
  };

  const handleReservation = (apName) => {
    setReservationApartment(apName);
    setReservationFormActive(true);
  };

  const getReservationOnClick = (apName, day) => {
    let x;
    apartments.forEach((ap) => {
      if (ap.label === apName) x = ap;
    });
    const resArray = Array.from(x?.reservations);

    const date = new Date(yearDisplay, monthDisplay, day);
    date.setHours(2);

    let res;
    let resIndex;
    resArray.forEach((r) => {
      const start = new Date(r.start);
      const end = new Date(r.end);
      if (date.getTime() === start.getTime()) {
        res = r;
        resIndex = resArray.indexOf(r);
      } else if (
        date.getTime() > start.getTime() &&
        date.getTime() <= end.getTime()
      ) {
        res = r;
        resIndex = resArray.indexOf(r);
      }
    });
    if (res) {
      setReservationInfo({ label: apName, index: resIndex, reservation: res });
      setIsReservationInfoVisible(true);
    }
  };

  const boxes = apartments.map((apartment, i) => {
    return (
      <li
        style={
          i % 2 === 0
            ? { background: "rgb(195, 195, 195)" }
            : { background: "rgb(231, 231, 231)" }
        }
        className="dateBoxesContainer"
        key={`${apartment.label}${i}dada`}
      >
        {boxesArray.map((b) => (
          <div key={b} className="boxesArrayContainer">
            <div
              onClick={() => getReservationOnClick(apartment.label, b + 1)}
              id={`${apartment.label}${b + 1}`}
              ref={(element) => {
                if (element) {
                  visualReservationRef.current[`${apartment.label}${b + 1}`] =
                    element;
                } else {
                  delete visualReservationRef.current[
                    `${apartment.label}${b + 1}`
                  ];
                }
              }}
              onMouseOver={(e) => handleMouseOver(e, apartment.label, b + 1)}
              onMouseOut={(e) => handleMouseLeave(e)}
              className={handleReservationStyle(apartment.label, b + 1)}
            >
              <div
                id={`${apartment.label}${b + 1}`}
                ref={(element) => {
                  if (element) {
                    boxRef.current[`${apartment.label}${b + 1}`] = element;
                  } else {
                    delete boxRef.current[`${apartment.label}${b + 1}`];
                  }
                }}
                className={handleBoxStyle(apartment.label, b + 1)}
              >
                {b + 1}
              </div>
            </div>
          </div>
        ))}
      </li>
    );
  });

  const apartmentList = apartmentsNames.map((apartment, i) => {
    return (
      <div key={apartment} className="nameAndFaContainer">
        <li
          style={
            i % 2 === 0
              ? { background: "rgb(195, 195, 195)" }
              : { background: "rgb(231, 231, 231)" }
          }
          className="apartment"
        >
          {apartment}
        </li>
        <div
          style={
            i % 2 === 0
              ? { background: "rgb(195, 195, 195)" }
              : { background: "rgb(231, 231, 231)" }
          }
          className="apartmentFA"
        >
          <button
            onClick={() => handleConfirmDelete(apartment)}
            className="noStyleButton"
          >
            <FontAwesomeIcon className="xmark" icon={faXmark} />
          </button>
          <button
            onClick={() => handleReservation(apartment)}
            className="noStyleButton"
          >
            <FontAwesomeIcon className="plus" icon={faPlus} />
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      {isReservationInfoVisible ? (
        <ReservationInfo
          setIsReservationInfoVisible={setIsReservationInfoVisible}
          reservationInfo={reservationInfo}
          setReservationInfo={setReservationInfo}
          apartments={apartments}
          apartmentsChanged={apartmentsChanged}
          setApartmentsChanged={setApartmentsChanged}
        />
      ) : (
        ""
      )}
      {reservationFormActive ? (
        <ResevationForm
          setIsActive={setReservationFormActive}
          username={signedUser[0]}
          apartmentsNames={apartmentsNames}
          reservationApartment={reservationApartment}
          setReservationApartment={setReservationApartment}
          apartments={apartments}
        />
      ) : (
        ""
      )}
      <div id="boxDatesContainer">
        {temp ? (
          <ConfirmAction
            txt={txt}
            item={temp}
            setItem={setTemp}
            confirmStyle={confirmStyle}
            setFunctionToForward={setFunctionToForward}
            fnction={
              functionToForward === "deleteApartment" ? deleteApartment : ""
            }
          />
        ) : (
          ""
        )}
        {InfoPop}
        {addApartmentActive ? (
          <AddDeleteApartment
            setAddApartmentActive={setAddApartmentActive}
            addApartment={addApartment}
          ></AddDeleteApartment>
        ) : (
          ""
        )}

        <div id="apartmentContainer">
          <div className="spaceForApartments">
            <button
              onClick={() => {
                setAddApartmentActive(true);
              }}
              id="addApartmentButton"
              className="noStyleButton"
            >
              <span className="spanTab">
                <p className="tab">Add New Apartment</p>
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </button>
          </div>
          <ul>{apartmentList}</ul>
        </div>
        <div id="dates">
          <div className="spaceForApartments">
            <button
              onClick={() => setReservationFormActive(true)}
              id="makeReservationButton"
              className="noStyleButton"
            >
              <span className="spanTab">
                <p className="tab">Make New Reservation</p>
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </button>
            <button id="deleteApartmentButton" className="noStyleButton">
              <span className="spanTab">
                <p className="tab">Delete Apartment</p>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </button>
            <button id="deleteReservationButton" className="noStyleButton">
              <span className="spanTab">
                <p className="tab">Delete Existing Reservation</p>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </button>
          </div>

          <ul>{boxes}</ul>
        </div>
      </div>
    </>
  );
};

export default ApartmentInfo;
