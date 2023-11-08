import React from "react";
import "../styles/Stats.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

let ascendingDescending = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // so on multiple clicks we can change ascending or descending order
// we dont wanna re initialize when component is re rendered
const ApartmentStatsHeader = (props) => {
  const { totalStats, setTotalStats } = props;

  const sortByTotalValue = (item) => {
    const totalStatsArray = Array.from(totalStats);
    if (item === 0) {
      totalStatsArray.sort((a, b) => {
        if (ascendingDescending[0]) return b.guests - a.guests;
        else return a.guests - b.guests;
      });
      ascendingDescending = [
        !ascendingDescending[0],
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
      ];
    }
    if (item === 1) {
      totalStatsArray.sort((a, b) => {
        if (ascendingDescending[1]) return b.adults - a.adults;
        else return a.adults - b.adults;
      });
      ascendingDescending = [
        1,
        !ascendingDescending[1],
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
      ];
    }
    if (item === 2) {
      totalStatsArray.sort((a, b) => {
        if (ascendingDescending[2]) return b.children - a.children;
        else return a.children - b.children;
      });
      ascendingDescending = [
        1,
        1,
        !ascendingDescending[2],
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
      ];
    }
    if (item === 3) {
      totalStatsArray.sort((a, b) => {
        if (ascendingDescending[3]) return b.earnings - a.earnings;
        else return a.earnings - b.earnings;
      });
      ascendingDescending = [
        1,
        1,
        1,
        !ascendingDescending[3],
        1,
        1,
        1,
        1,
        1,
        1,
        1,
      ];
    }
    if (item === 4) {
      totalStatsArray.sort((a, b) => {
        if (ascendingDescending[4]) return b.days - a.days;
        else return a.days - b.days;
      });
      ascendingDescending = [
        1,
        1,
        1,
        1,
        !ascendingDescending[4],
        1,
        1,
        1,
        1,
        1,
        1,
      ];
    }
    if (item === 5) {
      totalStatsArray.sort((a, b) => {
        if (ascendingDescending[5]) return b.reservations - a.reservations;
        else return a.reservations - b.reservations;
      });
      ascendingDescending = [
        1,
        1,
        1,
        1,
        1,
        !ascendingDescending[5],
        1,
        1,
        1,
        1,
        1,
      ];
    }
    if (item === 6) {
      totalStatsArray.sort((a, b) => {
        if (ascendingDescending[6]) return b.guestsA - a.guestsA;
        else return a.guestsA - b.guestsA;
      });
      ascendingDescending = [
        1,
        1,
        1,
        1,
        1,
        1,
        !ascendingDescending[6],
        1,
        1,
        1,
        1,
      ];
    }
    if (item === 7) {
      totalStatsArray.sort((a, b) => {
        if (ascendingDescending[7]) return b.adultsA - a.adultsA;
        else return a.adultsA - b.adultsA;
      });
      ascendingDescending = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        !ascendingDescending[7],
        1,
        1,
        1,
      ];
    }
    if (item === 8) {
      totalStatsArray.sort((a, b) => {
        if (ascendingDescending[8]) return b.childrenA - a.childrenA;
        else return a.childrenA - b.childrenA;
      });
      ascendingDescending = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        !ascendingDescending[8],
        1,
        1,
      ];
    }
    if (item === 9) {
      totalStatsArray.sort((a, b) => {
        if (ascendingDescending[9]) return b.daysA - a.daysA;
        else return a.daysA - b.daysA;
      });
      ascendingDescending = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        !ascendingDescending[9],
        1,
      ];
    }
    if (item === 10) {
      totalStatsArray.sort((a, b) => {
        if (ascendingDescending[10]) return b.earningsA - a.earningsA;
        else return a.earningsA - b.earningsA;
      });
      ascendingDescending = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        !ascendingDescending[10],
      ];
    }

    setTotalStats([...totalStatsArray]);
  };

  return (
    <div id="apartmentStatsContainer">
      <div id="apartmentStatsHeader">
        <div className="apStatsTotal">
          <div className="apStatsHeaderTop">
            <div id="blankHeader"></div> <div id="realHeader">Total</div>
          </div>
          <div className="apStatsHeaderBottom">
            <div className="apStatsApartmentName">
              <p>Apartment</p>
            </div>
            <div className="apStatsItem">
              <p>Guests</p>
              <button
                onClick={() => sortByTotalValue(0)}
                className="sortButton"
              >
                <FontAwesomeIcon icon={faSort} />
              </button>
            </div>
            <div className="apStatsItem">
              <p>Adults</p>
              <button
                onClick={() => sortByTotalValue(1)}
                className="sortButton"
              >
                <FontAwesomeIcon icon={faSort} />
              </button>
            </div>
            <div className="apStatsItem">
              <p>Children</p>
              <button
                onClick={() => sortByTotalValue(2)}
                className="sortButton"
              >
                <FontAwesomeIcon icon={faSort} />
              </button>
            </div>
            <div className="apStatsItem">
              <p>Earnings</p>
              <button
                onClick={() => sortByTotalValue(3)}
                className="sortButton"
              >
                <FontAwesomeIcon icon={faSort} />
              </button>
            </div>
            <div className="apStatsItem">
              <p>Days</p>
              <button
                onClick={() => sortByTotalValue(4)}
                className="sortButton"
              >
                <FontAwesomeIcon icon={faSort} />
              </button>
            </div>
            <div className="apStatsEarningsItem">
              <p>Reservations</p>
              <button
                onClick={() => sortByTotalValue(5)}
                className="sortButton"
              >
                <FontAwesomeIcon icon={faSort} />
              </button>
            </div>
          </div>
        </div>
        <div className="apStatsAverage">
          <div className="apStatsHeaderTop">
            <div id="realHeader">Average (per reservation)</div>
          </div>
          <div className="apStatsHeaderBottom">
            <div className="apStatsItem">
              <p>Guests</p>
              <button
                onClick={() => sortByTotalValue(6)}
                className="sortButton"
              >
                <FontAwesomeIcon icon={faSort} />
              </button>
            </div>
            <div className="apStatsItem">
              <p>Adults</p>
              <button
                onClick={() => sortByTotalValue(7)}
                className="sortButton"
              >
                <FontAwesomeIcon icon={faSort} />
              </button>
            </div>
            <div className="apStatsItem">
              <p>Children</p>
              <button
                onClick={() => sortByTotalValue(8)}
                className="sortButton"
              >
                <FontAwesomeIcon icon={faSort} />
              </button>
            </div>
            <div className="apStatsItem">
              <p>Days</p>
              <button
                onClick={() => sortByTotalValue(9)}
                className="sortButton"
              >
                <FontAwesomeIcon icon={faSort} />
              </button>
            </div>
            <div className="apStatsEarningsItem">
              <p>Price</p>
              <button
                onClick={() => sortByTotalValue(10)}
                className="sortButton"
              >
                <FontAwesomeIcon icon={faSort} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentStatsHeader;
