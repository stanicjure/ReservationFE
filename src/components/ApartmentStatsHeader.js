import React from "react";
import "../styles/Stats.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const ApartmentStatsHeader = () => {
  return (
    <div id="apartmentStatsContainer">
      <div id="apartmentStatsHeader">
        <div className="apStatsTotal">
          <div className="apStatsHeaderTop">Total</div>
          <div className="apStatsHeaderBottom">
            <div className="apStatsApartmentName">
              <p>Apartment</p>
              <button className="noStyleButton">
                <FontAwesomeIcon icon={faSort} />
              </button>
            </div>
            <div className="apStatsItem">
              <p>Guests</p>
            </div>
            <div className="apStatsItem">
              <p>Adults</p>
            </div>
            <div className="apStatsItem">
              <p>Children</p>
            </div>
            <div className="apStatsItem">
              <p>Reservations</p>
            </div>
            <div className="apStatsItem">
              <p>Days</p>
            </div>
            <div className="apStatsEarningsItem">
              <p>Earnings</p>
            </div>
          </div>
        </div>
        <div className="apStatsAverage">
          <div className="apStatsHeaderTop">Average</div>
          <div className="apStatsHeaderBottom">
            <div className="apStatsItem">
              <p>Guests</p>
            </div>
            <div className="apStatsItem">
              <p>Adults</p>
            </div>
            <div className="apStatsItem">
              <p>Children</p>
            </div>
            <div className="apStatsItem">
              <p>Days</p>
            </div>
            <div className="apStatsEarningsItem">
              <p>Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentStatsHeader;