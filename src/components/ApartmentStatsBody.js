import React, { useEffect, useState } from "react";
import "../styles/Stats.css";

const ApartmentStatsBody = (props) => {
  const { apartments, totalStats, setTotalStats, yearCondition, lastRowStats } =
    props;

  let totalsRowStyle =
    totalStats % 2
      ? { backgroundColor: "rgba(200,200,200,0.8)" }
      : { backgroundColor: "rgba(180,180,180,0.8)" };

  const getTotalStats = () => {
    let totalStatsArray = new Array();
    apartments.forEach((ap) => {
      let adults = 0,
        children = 0,
        reservations = 0,
        earnings = 0,
        numberOfDays = 0;

      let start,
        end = new Date();

      ap.reservations.forEach((r, index) => {
        let currentReservationDays = 0;
        start = new Date(r.start);
        if (end.getTime() === start.getTime() && r.start !== r.end)
          currentReservationDays--;
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
            currentReservationDays++;
          else if (yearCondition === "alltime") currentReservationDays++;

          counter.setDate(counter.getDate() + 1);
        }
        ////////////////////

        earnings += r.price * currentReservationDays;
        numberOfDays += currentReservationDays;
        adults += r.persons;
        children += r.children;
        reservations++;
      });
      totalStatsArray = [
        ...totalStatsArray,
        {
          apName: ap.label,
          guests: adults + children,
          adults: adults,
          children: children,
          reservations: reservations,
          days: numberOfDays > 0 ? numberOfDays : 0,
          earnings: earnings,
          guestsA:
            numberOfDays > 0
              ? ((adults + children) / reservations).toFixed(1)
              : 0,
          adultsA: numberOfDays > 0 ? (adults / reservations).toFixed(1) : 0,
          childrenA:
            numberOfDays > 0 ? (children / reservations).toFixed(1) : 0,
          daysA:
            numberOfDays > 0 ? (numberOfDays / reservations).toFixed(1) : 0,
          earningsA:
            numberOfDays > 0 ? (earnings / numberOfDays).toFixed(1) : 0,
        },
      ];
    });
    setTotalStats([...totalStatsArray]);
  };

  useEffect(() => {
    getTotalStats();
  }, [apartments, yearCondition]);

  return (
    <>
      <div id="apartmentStatsBodyContainer">
        {totalStats.map((total, index) => {
          return (
            <div
              style={
                index % 2
                  ? { backgroundColor: "rgba(200,200,200,0.8)" }
                  : { backgroundColor: "rgba(180,180,180,0.8)" }
              }
              key={total.apName}
              className="apartmentRow"
            >
              <div className="apartmentStatsBig">
                <div className="apStatsApartmentNameBody">
                  {totalStats.length !== 0 ? totalStats[index].apName : ""}
                </div>
                <div className="apStatsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].guests : ""}
                </div>
                <div className="apStatsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].adults : ""}
                </div>
                <div className="apStatsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].children : ""}
                </div>
                <div className="apStatsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].earnings : ""}
                </div>
                <div className="apStatsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].days : ""}
                </div>
                <div className="apStatsEarningsItemBody">
                  {totalStats.length !== 0
                    ? totalStats[index].reservations
                    : ""}
                </div>
              </div>
              <div className="apartmentStatsSmall">
                <div className="apStatsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].guestsA : ""}
                </div>
                <div className="apStatsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].adultsA : ""}
                </div>
                <div className="apStatsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].childrenA : ""}
                </div>
                <div className="apStatsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].daysA : ""}
                </div>
                <div className="apStatsEarningsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].earningsA : ""}
                </div>
              </div>
            </div>
          );
        })}
        <div style={totalsRowStyle} id="totalRow">
          <div className="apStatsApartmentNameBody">Total</div>
          <div className="apStatsItemBody">
            {lastRowStats.length != 0 ? lastRowStats[0] : ""}
          </div>
          <div className="apStatsItemBody">
            {lastRowStats.length != 0 ? lastRowStats[1] : ""}
          </div>
          <div className="apStatsItemBody">
            {lastRowStats.length != 0 ? lastRowStats[2] : ""}
          </div>
          <div className="apStatsItemBody">
            {lastRowStats.length != 0 ? lastRowStats[3] : ""}
          </div>
          <div className="apStatsItemBody">
            {lastRowStats.length != 0 ? lastRowStats[4] : ""}
          </div>
          <div className="apStatsEarningsItemBody">
            {lastRowStats.length != 0 ? lastRowStats[5] : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApartmentStatsBody;
