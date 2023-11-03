import React, { useEffect, useState } from "react";
import "../styles/Stats.css";

const GeneralStats = (props) => {
  const [totalStats, setTotalStats] = useState([]);
  const [averageReservation, setAverageReservation] = useState([]);
  const [averageApartment, setAverageApartment] = useState([]);
  const { apartments } = props;

  const getGeneralStats = () => {
    let guests = 0,
      adults = 0,
      children = 0,
      reservations = 0,
      earnings = 0,
      reservationNumber = 0,
      totalNumberOfDays = 0;
    apartments.forEach((ap) =>
      ap.reservations.forEach((r) => {
        reservationNumber++;
        adults += r.persons;
        children += r.children;
        reservations += 1;

        const start = new Date(r.start);
        const end = new Date(r.end);
        const numberOfDays = Math.round(
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1
        );
        earnings += numberOfDays * r.price;
        totalNumberOfDays += numberOfDays;
      })
    );
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
  }, [apartments]);

  return (
    <div className="generalContainer">
      <div className="table">
        <div className="statHeader">Total</div>
        <div className="statContainer">
          <div className="verticalBorder">
            <p className="statName">Guests</p>
            <p>{totalStats[0]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Adults</p>
            <p>{totalStats[1]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Children</p>
            <p>{totalStats[2]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Reservations</p>
            <p>{totalStats[3]}</p>
          </div>
          <div className="noBorder">
            <p className="statName">Earnings</p>
            <p>{totalStats[4]}</p>
          </div>
        </div>
      </div>
      <div className="table">
        <div className="statHeader">Average (per reservation)</div>
        <div className="statContainer">
          <div className="verticalBorder">
            <p className="statName">Guests</p>
            <p>{averageReservation[0]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Adults</p>
            <p>{averageReservation[1]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Children</p>
            <p>{averageReservation[2]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Days</p>
            <p>{averageReservation[3]}</p>
          </div>

          <div className="noBorder">
            <p className="statName">Earnings</p>
            <p>{averageReservation[4]}</p>
          </div>
        </div>
      </div>
      <div className="table">
        <div className="statHeader">Average (per apartment)</div>
        <div className="statContainer">
          <div className="verticalBorder">
            <p className="statName">Guests</p>
            <p>{averageApartment[0]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Adults</p>
            <p>{averageApartment[1]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Children</p>
            <p>{averageApartment[2]}</p>
          </div>
          <div className="verticalBorder">
            <p className="statName">Reservations</p>
            <p>{averageApartment[3]}</p>
          </div>

          <div className="verticalBorder">
            <p className="statName">Days</p>
            <p>{averageApartment[4]}</p>
          </div>
          <div className="noBorder">
            <p className="statName">Earnings</p>
            <p>{averageApartment[5]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralStats;
