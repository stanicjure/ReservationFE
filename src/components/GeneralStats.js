import React, { useEffect, useState } from "react";
import "../styles/Stats.css";

const GeneralStats = (props) => {
  const [totalStats, setTotalStats] = useState([]);
  const [averageReservation, setAverageReservation] = useState([]);
  const [averageApartment, setAverageApartment] = useState([]);
  const { apartments, yearCondition } = props;

  const getGeneralStats = () => {
    let guests = 0,
      adults = 0,
      children = 0,
      reservations = 0,
      earnings = 0,
      reservationNumber = 0,
      totalNumberOfDays = 0;
    apartments.forEach((ap) => {
      let start,
        end = new Date();

      ap.reservations.forEach((r) => {
        let numberOfDays = 0;
        start = new Date(r.start);
        if (end.getTime() === start.getTime() && r.start !== r.end)
          numberOfDays--; // if next reservation begins when last one ended

        end = new Date(r.end);
        const counter = new Date(r.start);

        //if we have year condition
        if (
          start.getFullYear() != yearCondition &&
          end.getFullYear() != yearCondition &&
          yearCondition !== "alltime"
        )
          return;

        /////////////////////
        while (counter.getTime() <= end.getTime()) {
          if (
            counter.getFullYear() == yearCondition &&
            yearCondition !== "alltime"
          )
            numberOfDays++;
          else if (yearCondition === "alltime") numberOfDays++;

          counter.setDate(counter.getDate() + 1);
        }
        earnings += numberOfDays * r.price;
        totalNumberOfDays += numberOfDays;
        ////////////////////

        //
        reservationNumber++;
        adults += r.persons;
        children += r.children;
        reservations += 1;
      });
    });
    guests = adults + children;
    setTotalStats([guests, adults, children, reservations, earnings]);
    const guestsPerReservation = (guests / reservationNumber).toFixed(1);
    const adultsPerReservation = (adults / reservationNumber).toFixed(1);
    const childrenPerReservation = (children / reservationNumber).toFixed(1);
    const earningsPerReservation = (earnings / reservationNumber).toFixed(1);
    const daysPerReservation = (totalNumberOfDays / reservationNumber).toFixed(
      1
    );
    const guestsPerApartment = (guests / apartments.length).toFixed(1);
    const adultsPerApartment = (adults / apartments.length).toFixed(1);
    const childrenPerApartment = (children / apartments.length).toFixed(1);
    const earningsPerApartment = (earnings / apartments.length).toFixed(1);
    const daysPerApartment = (totalNumberOfDays / apartments.length).toFixed(1);
    const reservationsPerApartment = (reservations / apartments.length).toFixed(
      1
    );

    setAverageReservation([
      guestsPerReservation,
      adultsPerReservation,
      childrenPerReservation,
      daysPerReservation,
      earningsPerReservation,
    ]);

    setAverageApartment([
      guestsPerApartment,
      adultsPerApartment,
      childrenPerApartment,
      reservationsPerApartment,
      daysPerApartment,
      earningsPerApartment,
    ]);
  };

  useEffect(() => {
    getGeneralStats();
  }, [apartments, yearCondition]);

  return (
    <div className="generalContainer">
      <div className="table">
        <div className="statHeader">Total</div>
        <div className="statContainer">
          <div className="verticalBorder">
            <p className="statName">Guests</p>
            <p className="generalContent">{totalStats[0]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Adults</p>
            <p className="generalContent">{totalStats[1]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Children</p>
            <p className="generalContent">{totalStats[2]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Reservations</p>
            <p className="generalContent">{totalStats[3]}</p>
          </div>
          <div className="noBorder">
            <p className="statName">Earnings</p>
            <p className="generalContent">{totalStats[4]}</p>
          </div>
        </div>
      </div>
      <div className="table">
        <div className="statHeader">Average (per reservation)</div>
        <div className="statContainer">
          <div className="verticalBorder">
            <p className="statName">Guests</p>
            <p className="generalContent">{averageReservation[0]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Adults</p>
            <p className="generalContent">{averageReservation[1]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Children</p>
            <p className="generalContent">{averageReservation[2]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Days</p>
            <p className="generalContent">{averageReservation[3]}</p>
          </div>

          <div className="noBorder">
            <p className="statName">Earnings</p>
            <p className="generalContent">{averageReservation[4]}</p>
          </div>
        </div>
      </div>
      <div className="table">
        <div className="statHeader">Average (per apartment)</div>
        <div className="statContainer">
          <div className="verticalBorder">
            <p className="statName">Guests</p>
            <p className="generalContent">{averageApartment[0]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Adults</p>
            <p className="generalContent">{averageApartment[1]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Children</p>
            <p className="generalContent">{averageApartment[2]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Reservations</p>
            <p className="generalContent">{averageApartment[3]}</p>
          </div>

          <div className="verticalBorder">
            <p className="statName">Days</p>
            <p className="generalContent">{averageApartment[4]}</p>
          </div>
          <div className="noBorder">
            <p className="statName">Earnings</p>
            <p className="generalContent">{averageApartment[5]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralStats;
