import React, { useState, useEffect } from "react";
import "../styles/Stats.css";
import AppHeader from "./AppHeader";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Stats = () => {
  const axiosPrivate = useAxiosPrivate();

  const [apartments, setApartments] = useState([]);

  const [totalStats, setTotalStats] = useState([]);
  const getTotalStats = () => {
    let guests = 0,
      adults = 0,
      children = 0,
      reservations = 0,
      earnings = 0;
    apartments.forEach((ap) =>
      ap.reservations.forEach((r) => {
        adults += r.persons;
        children += r.children;
        reservations += 1;

        const start = new Date(r.start);
        const end = new Date(r.end);
        const numberOfDays = Math.round(
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1
        );
        earnings += numberOfDays * r.price;
      })
    );
    guests = adults + children;
    setTotalStats([guests, adults, children, reservations, earnings]);
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
      } catch (err) {
        console.error(err);
      }
    };

    getApartments();
    getTotalStats();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [apartments]);
  return (
    <div id="statsContainer">
      <AppHeader />
      <div className="total">
        <div id="totalHeader">Total</div>
        <div id="statContainer">
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
          <div>
            <p className="statName">Earnings</p>
            <p>{totalStats[4]}</p>
          </div>
        </div>
      </div>
      Stats
    </div>
  );
};

export default Stats;
