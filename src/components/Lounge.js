import "../styles/Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./AppHeader";
import ApartmentInfo from "./ApartmentInfo";
import { useEffect, useState } from "react";
import useDate from "../hooks/useDate";

const Lounge = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [date] = useDate();
  const [monthDisplay, setMonthDisplay] = useState();
  const [yearDisplay, setYearDisplay] = useState();

  // for highlighting boxes in ApartmentInfo.js
  const [highligtedElements, setHighlitedElements] = useState([]);
  const [highlightedReservationVisual, setHighlightedReservationVisual] =
    useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const setMonthAndYear = () => {
      setMonthDisplay(date.getMonth());
      setYearDisplay(date.getFullYear());
    };

    setMonthAndYear();
    console.log("kurac");

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleMonthClick = (x) => {
    if (monthDisplay + x > 11) date.setFullYear(yearDisplay + 1, 0);
    else if (monthDisplay + x < 0) date.setFullYear(yearDisplay - 1, 11);
    else date.setFullYear(yearDisplay, monthDisplay + x);

    setMonthDisplay(date.getMonth());
    setYearDisplay(date.getFullYear());
  };

  const handleYearClick = (x) => {
    setYearDisplay(yearDisplay + x);
  };

  return (
    <div id="appSkelet">
      <Header />
      <span id="yearDisplay">
        <button
          onClick={() => handleYearClick(-1)}
          id="yearLeftButton"
          className="noStyleButton"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className="noStyleButton" onClick={() => handleMonthClick(-1)}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>

        <div id="middleYearDisplay">
          {monthNames[monthDisplay]}
          {yearDisplay}
        </div>
        <button className="noStyleButton" onClick={() => handleMonthClick(1)}>
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
        <button
          onClick={() => handleYearClick(1)}
          id="yearRightButton"
          className="noStyleButton"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </span>
      <div id="mainBody">
        <ApartmentInfo
          yearDisplay={yearDisplay}
          date={date}
          monthDisplay={monthDisplay}
          highligtedElements={highligtedElements}
          highlightedReservationVisual={highlightedReservationVisual}
          setHighlitedElements={setHighlitedElements}
          setHighlightedReservationVisual={setHighlightedReservationVisual}
        />
      </div>
    </div>
  );
};

export default Lounge;
